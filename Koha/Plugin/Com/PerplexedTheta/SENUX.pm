package Koha::Plugin::Com::PerplexedTheta::SENUX;

use Modern::Perl;

use base qw{ Koha::Plugins::Base };

use Koha::Libraries;

use Cwd         qw( abs_path );
use File::Which qw{ which };
use JSON;
use JSON::Validator::Schema::OpenAPIv2;

our $VERSION  = '24.11.05';
our $metadata = {
    name            => 'SENUX',
    author          => 'Jake Deery',
    date_authored   => '2025-04-11',
    date_updated    => '2025-05-09',
    minimum_version => '24.11.00.000',
    maximum_version => undef,
    version         => $VERSION,
    description     => 'SENUX is a custom OPAC theme, built with Bootstrap. See README.md for customisations.',
    repo            => 'https://github.com/openfifth/koha-plugin-senux',
};

sub new {
    my ( $class, $args ) = @_;

    $args->{'metadata'} = $metadata;
    $args->{'metadata'}->{'class'} = $class;

    my $self = $class->SUPER::new($args);
    $self->{'cgi'} = CGI->new();

    return $self;
}

sub install {
    my ($self) = @_;

    return undef
        unless ( $self->_is_npm_installed );

    return undef
        unless ( $self->npm_new );

    return 1;
}

sub upgrade {
    my ($self) = @_;

    return undef
        unless ( $self->_is_npm_installed );

    return undef
        unless ( $self->npm_new );

    return 1;
}

sub uninstall {
    my ($self) = @_;

    return undef
        unless ( $self->_is_npm_installed );

    return undef
        unless ( $self->npm_delete );

    return 1;
}

sub npm_new {
    my ( $self, $args ) = @_;

    return undef
        unless ( $self->npm_delete );

    return undef
        unless ( $self->_chdir( { path => abs_path( $self->mbf_dir ) . '/static_files' } ) );

    my $install = `bash -- ./manage_senux.sh --install-all 2>&1`;
    unless ( $? == 0 ) {
        $self->_throw_error(
            {
                message     => '`bash -- ./manage_senux.sh --install-all` failed to run',
                output      => $install,
                return_code => $?,
            }
        );

        return undef;
    }

    return 1;
}

sub npm_reset {
    my ( $self, $args ) = @_;

    return undef
        unless ( $args->{'confirm'} eq 'yes_please' );

    return undef
        unless ( $self->_chdir( { path => abs_path( $self->mbf_dir ) . '/static_files' } ) );

    my $reset_all = `bash -- ./manage_senux.sh --reset-all 2>&1`;
    unless ( $? == 0 ) {
        $self->_throw_error(
            {
                message     => '`bash -- ./manage_senux.sh --reset-all` failed to run',
                output      => $reset_all,
                return_code => $?,
            }
        );

        return undef;
    }

    return 1;
}

sub npm_build {
    my ( $self, $args ) = @_;
    my $build_type = $args->{'build_type'} || 'all';
    my $build;

    return undef
        unless ( $self->_chdir( { path => abs_path( $self->mbf_dir ) . '/static_files' } ) );

    if ( $build_type eq 'sass' ) {
        $build = `bash -- ./manage_senux.sh --build-sass 2>&1`;
    } elsif ( $build_type eq 'js' ) {
        $build = `bash -- ./manage_senux.sh --build-js 2>&1`;
    } else {
        $build = `bash -- ./manage_senux.sh --build-all 2>&1`;
    }

    unless ( $? == 0 ) {
        $self->_throw_error(
            {
                message     => '`bash -- ./manage_senux.sh --build-' . $build_type . '` failed to run',
                output      => $build,
                return_code => $?,
            }
        );

        return undef;
    }

    return 1;
}

sub npm_delete {
    my ( $self, $args ) = @_;

    return undef
        unless ( $self->_chdir( { path => abs_path( $self->mbf_dir ) . '/static_files' } ) );

    my $delete = `bash -- ./manage_senux.sh --delete 2>&1`;
    unless ( $? == 0 ) {
        $self->_throw_error(
            {
                message     => '`bash -- ./manage_senux.sh --delete` failed to run',
                output      => $delete,
                return_code => $?,
            }
        );

        return undef;
    }

    return 1;
}

sub configure {
    my ($self) = @_;
    my $cgi = $self->{'cgi'};

    my $template = $self->get_template( { file => 'configure.tt' } );

    $template->param(
        REPO => $self->{'metadata'}->{'repo'},
    );

    $self->output_html( $template->output() );
}

sub load_text_file {
    my ( $self, $filename ) = @_;

    return undef
        unless defined $filename;

    return $self->_load_text_file(
        {
            filename => $filename,
        }
    );
}

sub save_text_file {
    my ( $self, $filename, $content ) = @_;

    return undef
        unless defined $filename;

    return undef
        unless defined $content;

    return $self->_save_text_file(
        {
            filename => $filename,
            content  => $content,
        }
    );
}

sub api_routes {
    my ($self) = @_;

    my $spec_file = $self->mbf_path('openapi.yaml');
    my $schema    = JSON::Validator::Schema::OpenAPIv2->new->resolve($spec_file);
    my $spec      = $schema->bundle->data;

    return $spec;
}

sub api_namespace {
    my ($self) = @_;

    return 'senux';
}

sub static_routes {
    my ($self) = @_;

    my $spec_file = $self->mbf_path('staticapi.yaml');
    my $schema    = JSON::Validator::Schema::OpenAPIv2->new->resolve($spec_file);
    my $spec      = $schema->bundle->data;

    return $spec;
}

sub opac_head {
    my ($self) = @_;

    return '<link rel="stylesheet" href="/api/v1/contrib/senux/static/static_files/dist/senux.min.css" />';
}

sub opac_js {
    my ($self) = @_;

    return '<script src="/api/v1/contrib/senux/static/static_files/dist/senux.min.js"></script>';
}

sub _is_npm_installed {
    my ($self) = @_;

    unless ( which('npm') ) {
        $self->_throw_error(
            {
                message     => '`npm` not found in PATH',
                return_code => 0,
            }
        );

        return undef;
    }

    return 1;
}

sub _chdir {
    my ( $self, $args ) = @_;

    my $chdir = chdir $args->{'path'};
    unless ($chdir) {
        $self->_throw_error(
            {
                message     => 'could not cd to ' . $args->{'path'},
                return_code => $chdir,
            }
        );

        return undef;
    }

    return 1;
}

sub _load_text_file {
    my ( $self, $args ) = @_;
    my $filename = $args->{'filename'};

    unless ( -f $filename ) {
        $self->_throw_error(
            {
                message     => $args->{'filename'} . ' does not exist',
                return_code => 0,
            }
        );

        return undef;
    }

    open my $fh, '<', $filename;

    unless ( defined $fh ) {
        $self->_throw_error(
            {
                message     => 'could not create filehandle',
                return_code => $?,
            }
        );

        return undef;
    }

    chomp( my @lines = <$fh> );

    close $fh;

    return join "\n", @lines;
}

sub _save_text_file {
    my ( $self, $args ) = @_;
    my $filename = $args->{'filename'};
    my $content  = $args->{'content'};

    open my $fh, '>', $filename;

    unless ( defined $fh ) {
        $self->_throw_error(
            {
                message     => 'could not create filehandle',
                return_code => $?,
            }
        );

        return undef;
    }

    print $fh $content;

    close $fh;

    return 1;
}

sub _throw_error {
    my ( $self, $args ) = @_;
    my $json = JSON->new->allow_nonref;

    return undef
        unless defined $args;

    warn $json->encode($args);

    die
        if defined $self->{'_die'};

    return 1;
}

1;
