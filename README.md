# koha-plugin-senux
![The SENUX logo](/Koha/Plugin/Com/PerplexedTheta/SENUX/static_files/src/vectors/senux.svg)
### Welcome to SENUX
A reimagining of the Koha OPAC, with flexible styling options & a greater colour pallette. This project aims to make creating a beautiful & custom OPAC as painless as possible.

### Getting set up
This plugin only requires the system have the `npm` package manager installed. This comes with `nodejs`, and is available on all good UNIX and UNIX-like operating systems. If you have command-line access to your (presumed) Ubuntu or Debian server, you can follow the [Nodesource installation instructions for DEB systems](https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions). Note that these tools are already installed in `k.t.d`, if you're accessing Koha through that particular container.

If you don't have command-line access to your system, ask your system administrator to do this for you, [by sending them the link to this README file](/README.md).

If you have `npm` installed already, you're ready to begin. [You can follow these instructions to install a plugin in Koha](https://koha-community.org/manual/latest/en/html/administration.html#plugins). Installing the plugin will trigger `npm install --include=dev` to run automatically, but if you're having problems, you should also be able to perform this process using the included `manage_senux.sh` script, by running `manage_senux.sh --install-all` on the command-line (if possible).

### Getting creative

Once you've installed the plguin, you should be able to [access the plugin's configuration page](https://koha-community.org/manual/latest/en/html/administration.html#using-a-plugin) and begin editing the three configuration files:

*   The `variables.scss` file controls the look-and-feel portion of SENUX. Here, you'll see some named variables (e.g. `$defaultLinkText`, which in this example controls the default link colour). [Click here to see our glossary of variables](https://github.com/PerplexedTheta/koha-plugin-senux/wiki/Glossary-of-variables)
    *   Note that you'll want to uncomment any lines you wish to change, by removing the `//` that preceeds the dollar symbol. You may need to uncomment **all** lines in the variables file that contain a prefixed dollar in order to get the appearance you want.
    *   If you want a file that contains everything already uncommented, [try this source file](Koha/Plugin/Com/PerplexedTheta/SENUX/static_files/src/css/senux/variables.scss)
*   The `customisations.scss` file is where you'd go to further advance the site's look and feel beyond what is accessible in the `variables.scss`. See this as a supercharged version of `OpacUserCSS`, because unlike `OpacUserCSS`, you can write [SASS code](https://sass-lang.com) in here.
    *   It really is worth learning a bit of SASS if you plan to use `customisations.scss`. SASS allows for nested rules, which apply much more cleanly to webpages, and also allow for the use of certain functions & variables to help you write CSS quicker.
    *   That said, you can write regular CSS in here, too. It doesn't have to be SASS!
*   The `customisations.js` file is where some handy predefined JavaScript methods have been included for you. This includes everything from the collapsible accordion menus, to the rearranged navigation bar. Please feel free to use or discard whatever you like in here, it is all optional.
    *   There is nothing special about `customisations.js`, so if you'd rather copy all of this code into `OpacUserJS`, you can.

Each time you save a change, a rebuild of the SASS and/or JavaScript is triggered. This means that once you save, your changes should be visible within a few seconds. If you're having trouble, there is a button to rebuild all. There is also a reset all button, to be used only if you've completely broken everything and are happy to start from scratch!

### Playing safe

The custom files in this plugin are not backed up automatically. It is your (or your system administrator's) responsibility to do this backing up, so take regular copies of these files, or run a full backup solution against your system. This should be done with your entire Koha system, anyway, so just make sure you're including your plugin directory in this!

### Troubleshooting

Please use [GitHub Issues](https://github.com/openfifth/koha-plugin-senux/issues) to report bugs with the plugin, or to ask for assistance. It will be given gladly by someone who maintains this repository!
