package Koha::Plugin::Com::PerplexedTheta::SENUX::APIController;

# This file is part of Koha.
#
# Koha is free software; you can redistribute it and/or modify it under the
# terms of the GNU General Public License as published by the Free Software
# Foundation; either version 3 of the License, or (at your option) any later
# version.
#
# Koha is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along
# with Koha; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

use Modern::Perl;

use Mojo::Base 'Mojolicious::Controller';

use Mojo::JSON qw{ encode_json };

=head1 NAME

Koha::Plugin::Com::PerplexedTheta::SENUX::APIController

=cut

=head1 API

=head2 Methods

=head3 list

Controller function that handles listing settings

=cut

sub list {
    my ( $self, $args ) = @_;
    my $c = shift->openapi->valid_input or return;

    my @settings = $self->_list_settings;

    return try {
        return $c->render(
            status  => 200,
            openapi => \@settings,
        ) unless not @settings;

        return $c->render(
            status  => 404,
            openapi => {
                error => 'unable to list settings',
            },
        );
    } catch {
        $c->unhandled_exception($_);
    }
}

=head3 get

Controller function that handles getting a setting

=cut

sub get {
    my ( $self, $args ) = @_;
    my $c      = shift->openapi->valid_input or return;
    my $plugin = Koha::Plugin::Com::PerplexedTheta::SENUX->new;

    my $setting_id = $c->param('setting_id');

    return try {
        return $c->render(
            status  => 404,
            openapi => {
                error => 'setting_id ' . $setting_id . ' not found',
            },
        ) unless $self->_check_setting( { setting_id => $setting_id } );

        my $content;
        $content = $plugin->load_text_file( $plugin->bundle_path . '/static_files/variables.scss' )
            if $setting_id eq 'variables_scss';
        $content = $plugin->load_text_file( $plugin->bundle_path . '/static_files/customisations.scss' )
            if $setting_id eq 'customisations_scss';
        $content = $plugin->load_text_file( $plugin->bundle_path . '/static_files/customisations.js' )
            if $setting_id eq 'customisations_js';

        return $c->render(
            status  => 200,
            openapi => $content,
        ) unless not defined $content;

        return $c->render(
            status  => 404,
            openapi => {
                error => 'file for setting_id ' . $setting_id . ' missing',
            },
        );
    } catch {
        $c->unhandled_exception($_);
    }
}

=head3 update

Controller function that handles updating a setting

=cut

sub update {
    my ( $self, $args ) = @_;
    my $c      = shift->openapi->valid_input or return;
    my $plugin = Koha::Plugin::Com::PerplexedTheta::SENUX->new;

    my $setting_id = $c->param('setting_id');
    my $body       = $c->req->text;

    return try {
        return $c->render(
            status  => 404,
            openapi => {
                error => 'setting_id ' . $setting_id . ' not found',
            },
        ) unless $self->_check_setting( { setting_id => $setting_id } );

        my $content;
        $content = $plugin->save_text_file( $plugin->bundle_path . '/static_files/variables.scss', $body )
            if $setting_id eq 'variables_scss';
        $content = $plugin->save_text_file( $plugin->bundle_path . '/static_files/customisations.scss', $body )
            if $setting_id eq 'customisations_scss';
        $content = $plugin->save_text_file( $plugin->bundle_path . '/static_files/customisations.js', $body )
            if $setting_id eq 'customisations_js';

        return $c->render(
            status  => 200,
            openapi => $body,
        ) unless not defined $content;

        return $c->render(
            status  => 400,
            openapi => {
                error => 'file for setting_id ' . $setting_id . ' missing',
            },
        );
    } catch {
        $c->unhandled_exception($_);
    }
}

=head3 build_types

Controller function that handles listing build types

=cut

sub build_types {
    my ( $self, $args ) = @_;
    my $c = shift->openapi->valid_input or return;

    my @build_types = $self->_list_build_types;

    return try {
        return $c->render(
            status  => 200,
            openapi => \@build_types,
        ) unless not @build_types;

        return $c->render(
            status  => 404,
            openapi => {
                error => 'unable to list build types',
            },
        );
    } catch {
        $c->unhandled_exception($_);
    }
}

=head3 rebuild

Controller function that handles rebuilding the SASS, JS, or, both

=cut

sub rebuild {
    my ( $self, $args ) = @_;
    my $c      = shift->openapi->valid_input or return;
    my $plugin = Koha::Plugin::Com::PerplexedTheta::SENUX->new;

    my $build_type = $c->param('build_type');

    return try {
        return $c->render(
            status  => 404,
            openapi => {
                error => 'build_type ' . $build_type . ' not found',
            },
        ) unless $self->_check_build_type( { build_type => $build_type } );

        my $build;
        $build = $plugin->npm_build( { build_type => $build_type } );

        return $c->render(
            status  => 200,
            openapi => {
                status => 'success',
            },
        ) unless not defined $build;

        return $c->render(
            status  => 400,
            openapi => {
                error => 'unable to build for build_type ' . $build_type,
            },
        );
    } catch {
        $c->unhandled_exception($_);
    }
}

=head3 reset

Controller function that handles resetting all of SENUX

=cut

sub reset {
    my ( $self, $args ) = @_;
    my $c      = shift->openapi->valid_input or return;
    my $plugin = Koha::Plugin::Com::PerplexedTheta::SENUX->new;

    return try {
        my $reset_all;
        $reset_all = $plugin->npm_reset( { confirm => 'yes_please' } );

        return $c->render(
            status  => 204,
            openapi => '',
        ) unless not defined $reset_all;

        return $c->render(
            status  => 400,
            openapi => {
                error => 'could not reset plugin',
            },
        );
    } catch {
        $c->unhandled_exception($_);
    }
}

=head1 Ancillary

=head2 Methods

=head3 _list_settings

Helper function that lists out all settings

=cut

sub _list_settings {
    my ( $self, $args ) = @_;

    return (
        {
            setting_id   => 'variables_scss',
            setting_desc =>
                'This controls things like colours, backgrounds, borders, outlines, box shadows, and text decorations.',
        },
        {
            setting_id   => 'customisations_scss',
            setting_desc =>
                'This SASS will override everything else in SENUX, and you can write your own SASS. It is like a supercharged OPACUserCSS!',
        },
        {
            setting_id   => 'customisations_js',
            setting_desc =>
                'This is where the custom JavaScript functions are defined, and called. You can change them to suit your needs. If you don\'t want to use these, delete everything from the box.',
        },
    );
}

=head3 _check_setting

Helper function that checks setting exists

=cut

sub _check_setting {
    my ( $self, $args ) = @_;

    my $setting_id = $args->{'setting_id'} or return;
    my @settings   = $self->_list_settings;

    for my $element (@settings) {
        return 1
            if $setting_id eq $element->{'setting_id'};
    }

    return undef;
}

=head3 _list_build_types

Helper function that lists out all build types

=cut

sub _list_build_types {
    my ( $self, $args ) = @_;

    return (
        {
            build_type => 'all',
            build_desc => 'This will build both the SASS and JavaScript.',
        },
        {
            build_type => 'sass',
            build_desc => 'This will just build the SASS.',
        },
        {
            build_type => 'js',
            build_desc => 'This will just build the JavaScript.',
        },
    );
}

=head3 _check_build_type

Helper function that checks build type exists

=cut

sub _check_build_type {
    my ( $self, $args ) = @_;

    my $build_type  = $args->{'build_type'} or return;
    my @build_types = $self->_list_build_types;

    for my $element (@build_types) {
        return 1
            if $build_type eq $element->{'build_type'};
    }

    return undef;
}

1;
