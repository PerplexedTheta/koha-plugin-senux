# koha-plugin-senux
SENUX is a custom OPAC theme, built with Bootstrap. A prebuilt version is included. You may override rules in OPACUserCSS, or...

## Making your customisations
Once the plugin is installed, the out-the-box defaults should apply immediately. Rules can often be altered with OPACUserCSS, however, sometimes these can be ignored due to the cascading nature of CSS.

If you want to take advantage of SASS to perform more advanced changes, or to circumnavigate the cascading nature of CSS, you can built the plugin's static_files yourself. To do this, you'll need to install npm and nodejs, which can be done with [the nvm tools](https://nodejs.org/en/download).

Once you have npm and nodejs installed, you can initialise and build SENUX like so:
```sh
cd /var/lib/koha/kohadev/plugins/Koha/Plugin/Com/PerplexedTheta/SENUX/static_files
npm run init
npm run build
```
**Please note** that you may need to replace `kohadev` with the sitename of your Koha instance.

With the first build done, you should now have customisations.scss and customisations.js.

*  `customisations.scss` should be empty, and will subsequently update SENUX when `npm run build` is rerun. You must run a build to see your changes on the OPAC. Don't put this in to OPACUserCSS.
*  `customisations.js` will contain some sane default JavaScript. This must be copied in to OPACUserJS to work.

## Sample JS & HTML
In `src/html` there are some sample HTML Customisations. I'd recommend you populate your `OPACHeader` and `OPACCredits` HTML Customisations with the HTML in the respective files, for the best-looking SENUX OPAC. Please do tune to suit.

The `customisations.js` is also a good place to start with some useful JavaScript snippets, including the collapsable facets and the Shibboleth link handler.
