package Koha::Plugin::Com::PerplexedTheta::SENUX;

use Modern::Perl;

use base qw{ Koha::Plugins::Base };

use Koha::Libraries;

use JSON;
use JSON::Validator::Schema::OpenAPIv2;

our $VERSION  = '24.11.02';
our $metadata = {
    name            => 'SENUX',
    author          => 'Jake Deery',
    date_authored   => '2025-04-11',
    date_updated    => '2025-04-12',
    minimum_version => '24.11.00.000',
    maximum_version => undef,
    version         => $VERSION,
    description     => 'SENUX is a custom OPAC theme, built with Bootstrap. See README.md for customisations.',
};

sub new {
    my ($class, $args) = @_;

    $args->{'metadata'} = $metadata;
    $args->{'metadata'}->{'class'} = $class;

    my $self = $class->SUPER::new($args);
    $self->{cgi} = CGI->new();

    return $self;
}

sub install {
    my ($self) = shift;
    return 1;
}

sub uninstall {
    my ($self) = @_;
    return 1;
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

1;
