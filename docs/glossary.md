## `variables.scss` is powerful
Truly, it is. With minimal CSS knowledge, you can change the look and feel of your OPAC drastically. So, here's a glossary of what each variable does!

To set a variable, you'll need to first remove the proceeding `//`. For example:

```scss
//$defaultText: $black;
// BECOMES:
$defaultText: $msPurple;
```

You'll notice some settings in `variables.scss` have multi-word settings with functions inside them. For example:

```scss
$defaultBorderSettings: 2px solid darken($defaultFg, 15%);
// BUILDS INTO:
border: 2px solid rgb(217, 217, 217);
```

You'll need to remember to keep each setting (separated by a space) in-tact for the SASS to build correctly. Note that you can also use functions like `lighten`, `darken`, and `transparentize` on colours, to affect their final value when you save &amp; build. This is useful, as it means you don't have to calculate these changes yourself.

Variables can 'cascade', meaning you can use one variable as the value for another. This is useful if, for example, you wish to specify a few colours in a palette, and then use only those colours across the website. For example:

```scss
$defaultText: $myToneOfBlack;
// THEN:
$defaultBorderSettings: 1px solid $defaultText;
// OR:
$defaultBorderSettings: 1px solid $myToneOfBlack;
// ... WILL ACHIEVE THE SAME RESULTS
```

**Without further ado, here are the variables:**

### Type definitions

These are just some type definitions, to avoid repetition below. When you see `(type:xyz)` below, you must replace the text and brackets with what you see in the composition column. For example, `(type:colour)` should become `rgba(255,255,255,1)` or an equivalent value.

| Type name                                   | Composition | Type description |
| ------------------------------------------- | ----------- | ---------------- |
| `(type:colour:transparency(default=false))` | `rgba()\|hsla()\|#<hexcode>` | A colour value. Generally, you can use whatever colour system you like. SENUX uses `rgb` under the hood. If transparent is true, providing an `rgba()` is **mandatory** |
| `(type:length:accepted-units)`              | `(n)px\|em\|rem\|%` | A `px`, `em`, `rem` or `%` value, or a variable pointing to one of these values, where `(n)` is a numeric value. SENUX uses `em` and `rem` under the hood. If you see `accepted-units` populated, this means a measurement type in the list is **mandatory**. Note that when using a percentage value, the valid range is infinite, and not limited to 100, though exceeding 100 is not advisable. |
| `(type:font)`                               | `'font family', font-kingdom` | A list of fonts. The default is always `'SegoeUI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif`. Put font names in single quotes, separate each font family with a comma, and don't put font kingdoms in quotes. The font found in the list first, will be used. For example, if `SegoeUI` is not found on a user's system, but `Roboto` is, `Roboto` will be used, and subsequent fonts will be ignored. |
| `(type:bullet)`                             | `disc\|square\|none` | An enumeration of bullet styles. Can only contain one value from the composition. Do not repeat types in the same variable. |
| `(type:line-style)`                         | `none\|solid\|dotted\|dashed` | An enumeration of line styles. Can only contain one value from the composition. Do not repeat types in the same variable. |
| `(type:decoration)`                         | `none\|underline` | An enumeration of text decoration styles. Can only contain one value from the composition. Do not repeat types in the same variable. |
| `(type:decimal:range)`                      | `a decimal value within the range specified` | A floating point number, where the `range` specifies the minimum to maximum numerical value. For example, a range of `0-1` would permit `0.33` but not `1.33`. |
| `(type:url)`                                | `url('<hyperlink>')` | A css function containing a link to an external resource, typically an image |
| `(type:display)`                            | `none\|block\|inline\|flex\|grid\|table` | A display type to specify for an element. Typically, you'll most commonly want either none (hidden) or block (visible) |
| `(type:string:length)`                       | `'a string'` | A string... of text! Any freehand text you like, encapsulated single or double quotes. **Note** that if you see `length` specifies, this means you cannot exceed that number of characters in the string. |

Compound types build upon the base types defined above. You'll need to reference the base types, to understand the compound types.

| Compound name                      | Composition | Compound description |
| ---------------------------------- | ----------- | -------------------- |
| `(compound-type:border)`           | `0\|(type:length:px,em,rem) (type:line-style) (type:colour:transparency(true))` | Defines a border. There are three values to set:<ul><li>The first value will control the thickness of the border.</li><li>The second value will control the line type in use.</li><li>The third value will control the colour and opacity of the border itself.</li></ul>Changing the entire setting to `none` will disable the border entirely.
| `(compound-type:outline)`          | `0\|(type:length:px,em,rem) (type:line-style) (type:colour:transparency(true))` | Defines an outline (similar to a border, but does not affect the positioning of the element). There are three values to set:<ul><li>The first value will control the thickness of the outline.</li><li>The second value will control the line type in use.</li><li>The third value will control the colour and opacity of the outline itself.</li></ul>Changing the entire setting to `none` will disable the outline entirely.
| `(compound-type:box-shadow)`       | `0\|(type:length:px,em,rem) 0\|(type:length:px,em,rem) 0\|(type:length:px,em,rem) 0\|(type:length:px,em,rem) (type:colour:transparency(true))` | Defines a box shadow. There are five values to set:<ul><li>The first value controls the horizontal offset, with a positive offset moving right, and a negative offset moving left.</li><li>The second value controls the vertical offset, with a positive offset moving downwards, and a negative offset moving upwards.</li><li>The third value controls the blur amount, with zero producing a sharp shadow.</li><li>The fourth value controls the shadow's spread of the shadow.</li><li>The fifth value controls the colour and opacity of the shadow itself.</li></ul>Changing the entire setting to `none` will disable the box shadow entirely. |
| `(compound-type:background-image)` | `(type:colour) (type:url) left\|right\|center top\|center\|bottom repeat\|repeat-x\|repeat-y\|no-repeat` | Defined a background for a target element. There are five values to set:<ul><li>The first value will control the colour of the background, should the image fail to load</li><li>The second value will control which image to load and display as the background (optional).</li><li>The third value will control where on the x-axis the image will display, with relative to the adjacent edge of the value chosen.</li><li>The fourth value will control where on the y-axis the image will display, with relative to the adjacent edge of the value chosen.</li<li>The fifth value will control whether the image repeats, and if so, how.</li></ul> |

Lastly, a choice type is just as it sounds: choose between an option in the list provided following the colon. For example, `(choice:red|green)` means you can either put... red, or green! Note that choices are written as seen, so if there are no quotation marks, don't use them. If there are, do!

### Global variables

These variables control aspects right across the system. Tune these for large impact stylistic changes

* `$black: (type:colour)`             — Default tone of black, typically used on text and foreground elements such as dividers. This can be inverted later.
* `$white: (type:colour)`             — Default tone of white, typically used on background elements and input fields.
* `$msBlack: (type:colour)`           — As above, but when used with the other variables you'll find below. For your use as you please.
* `$msWhite: (type:colour)`           — As above, but for when white is appropriate.
* `$msCharcoal: (type:colour)`        — A dark grey colour, which can later be used in place of black if you'd prefer a less harsh appearance.
* `$msCloudy: (type:colour)`          — A very light grey colour, which, like above, can be used in lieu of white for a softer look.
* `$msRed: (type:colour)`             — A WACG-compliant dark red, if used on a bright background.
* `$msGold: (type:colour)`            — A WACG-compliant gold-yellow, if used on a dark background.
* `$msGreen: (type:colour)`           — A WACG-compliant dark green, if used on a bright background.
* `$msBlue: (type:colour)`            — A WACG-compliant blue, if used on a bright background.
* `$msLagoon: (type:colour)`          — A WACG-compliant teal, if used on a bright background.
* `$msPurple: (type:colour)`          — A WACG-compliant purple, if used on a bright background.
* `$msMagenta: (type:colour)`         — A WACG-compliant dark magenta, if used on a bright background.
* `$userHue(n): (type:colour)`        — Five variables, where (n) is numbers 1–5. These variables are purely for your use, as a place to store the colour tones you wish to use across your OPAC. You'll see `$userHue(n)` referenced in later variables.
* `$userText(n): (type:colour)`       — Five variables, where (n) is numbers 1–5. These variables should ideally be WACG-compliant monochromatic values (e.g. black or white) that are legible when used on the corresponding `$userHue(n)` as a background. For example, if `$userHue2` is dark purple, it would be wise for `$userText2` to be white.
* `$breakpoint-pc: (type:length:px)` — This controls the point at which our CSS considers the width of the screen to transition from a desktop to a mobile device, where (n) is an integer. It is best not to change this.

### Generic variables

This is where the styling process begins, using the globals we set above

* `$defaultBg: (type:colour)`                                     — This will change the colour of any areas behind main blocks (e.g. the area behind the breadcrumbs, navigation zones, and content areas)
* `$defaultFg: (type:colour)`                                     — This will change the colour of any foreground blocks (e.g. the breadcrumbs, the navigation zones, and content areas)
* `$defaultText: (type:colour)`                                   — This will change the colour of any standard text (e.g. text without an overruling setting, or links)
* `$defaultFont: (type:font)`                                    — This will change the font of all text on the page, except for the Koha logo (see navbar section). Custom values are allowed.
* `$defaultBullet: (type:bullet)`                                — This will change the style of bullet-points used on the site.
* `$defaultRadius: 0|(type:length:px,em,rem)`                    — This controls how rounded edges are. Useful if you don't like the sharp corners of SENUX. Setting to 0 will render perfect 90 degree corners.
* `$defaultOffset: 0|(type:length:px,em,rem)`                    — This controls how far away from an element its focus outline will sit. Setting to 0 will cause the outline to butt up against the border of the element.

#### Borders &amp; outlines

This applies to most high-level blocks, such as the OpacMainUserBlock, any modals, etc

* `$defaultBorderSettings: (compound-type:border)`               — This controls the default border in use. It is recommended to use a common thickness across all borders, and leave the colour as transparent here, for the best effect.
* `$defaultOutlineSettings: (compound-type:outline)`             — This controls the default outline in use.
* `$defaultBoxShadowSettings: (compound-type:box-shadow)`        — This controls the default box shadow in use.
* `$defaultDecorationSettings: (type:decoration)`                — This controls the default text decoration style. Almost definitely should be left as `none`.

#### Headers

This applies to all `hX` tags

* `$defaultHeaderUnderlineSettings: (compound-type:border)`      — This controls the line found underneath most headers. You should halve your thickness value to achieve the desired thickness, which can be done with: `calc($thickness / 2)`.
* `$defaultHeaderUnderlineWidthPct: (type:length:%)`             — This controls the width of the line found underneath moth headers. Note that this percentage relates to the parent element of the header, and that, for example, 25% on one header may be a different width for another header.

#### Hyperlinks

This applies to most hyperlinks on the OPAC

* `$defaultLinkBg: (type:colour)`                                 — This controls the background colour of most hyperlinks. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkText: (type:colour)`                               — This controls the text colour of most hyperlinks. Make sure the colour you choose here is WACG-compliant with as many of your chosen hues as possible.
* `$defaultLinkBorderSettings: (compound-type:border)`           — This controls the border used on most links. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkOutlineSettings: (compound-type:outline)`         — This controls the outline used on most links. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkBoxShadowSettings: (compound-type:box-shadow)`    — This controls the box shadow used on most links. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkDecorationSettings: (type:decoration)`            — This controls the text decoration on most links. WACG recommends this is set to `underline`, but if you have specified some other way of visually identifying a link, such as a box shadow or outline, this could be set to `none`.
* `$defaultLinkBgHov: (type:colour)`                              — This controls the background colour of most hyperlinks, when there is a mouse rollover. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkTextHov: (type:colour)`                            — This controls the text colour of most hyperlinks, when there is a mouse rollover. It may be wise to set this to a darkened or lightened version of `$defaultLinkText`.
* `$defaultLinkBorderSettingsHov: (compound-type:border)`        — This controls the border used on most links, when there is a mouse rollover. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkOutlineSettingsHov: (compound-type:outline)`      — This controls the outline used on most links, when there is a mouse rollover. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkBoxShadowSettingsHov: (compound-type:box-shadow)` — This controls the box shadow used on most links, when there is a mouse rollover. It is recommended to leave this as transparent, unless you have a specific reason otherwise.
* `$defaultLinkDecorationSettingsHov: (type:decoration)`         — This controls the text decoration on most links, when there is a mouse rollover. You have a few options here: you could set this to be the inverse of `$defaultLinkDecorationSettings`, you could set this to `underline` regardless of `$defaultLinkDecorationSettings` and use the extra thickness to indicate a rollover, or, you could use the text colour alone to indicate a rollover (this option is inadvisable).
* `$defaultLinkBgFoc: (type:colour)`                              — This controls the background colour of most hyperlinks, when there is a focus event. This defaults to `$msGold`, which is accessible for a majority of user-cases.
* `$defaultLinkTextFoc: (type:colour)`                            — This controls the text colour of most hyperlinks, when there is a focus event. This defaults to `$msBlack`, which contrasts strongly with `$msGold`.
* `$defaultLinkBorderSettingsFoc: (compound-type:border)`        — This controls the border used on most links, when there is a focus event. This defaults to transparent, as we use outline and box shadow in its stead.
* `$defaultLinkOutlineSettingsFoc: (compound-type:outline)`      — This controls the outline used on most links, when there is a focus event. The default colour in use is `$msGold`, and is what is displayed if there is a simultaneous focus and hover event. This is accessible in most use-cases.
* `$defaultLinkBoxShadowSettingsFoc: (compound-type:box-shadow)` — This controls the box shadow used on most links, when there is a focus event. The default behaviour is to add a small lip under the hyperlink, to assist visibility in scenarios where the yellow does not contrast sufficiently with the background beneath it.
* `$defaultLinkDecorationSettingsFoc: (type:decoration)`         — This controls the text decoration on most links, when there is a focus event. The default behaviour here is to remove the underline, and use the box shadow to indicate focus in a much stronger fashion.

### Main variables

These variables impact everything within the main viewport of Koha, and continue the president set under generic variables.

#### Buttons: All

These variables apply in some various fashion to **all** buttons on the site. They are then refined with the specific button definitions below.

* `$btnBg: (type:colour)`                                — This controls the colour of button backgrounds without an additional class. As this is never the case, changing this will have no effect.
* `$btnText: (type:colour)`                              — This controls the colour of button text without an additional class. As this is never the case, changing this will have no effect.
* `$btnBorderSettings: (compound-type:border)`           — This controls the border of buttons without an additional class. As this is never the case, changing this will have no effect.
* `$btnOutlineSettings: (compound-type:outline)`         — This controls the outline of buttons without an additional class. By default, this cascades down to all button types. This behaviour can be overriden later.
* `$btnBoxShadowSettings: (compound-type:box-shadow)`    — This controls the box shadow of buttons without an additional class. By default, this cascades down to all button types. This behaviour can be overriden later.
* `$btnDecorationSettings: (type:decoration)`            — This controls the text decoration of buttons without an additional class. By default, this cascades down to all button types. This behaviour can be overriden later.
* `$btnBgHov: (type:colour)`                             — This controls the colour of button backgrounds without an additional class, on mouse rollover. By default, this cascades from the non-hover setting.
* `$btnTextHov: (type:colour)`                           — This controls the colour of button text without an additional class, on mouse rollover. By default, this cascades from the non-hover setting.
* `$btnBorderSettingsHov: (compound-type:border)`        — This controls the border of buttons without an additional class, on mouse rollover. By default, this cascades from the non-hover setting.
* `$btnOutlineSettingsHov: (compound-type:outline)`      — This controls the outline of buttons without an additional class, on mouse rollover. By default, this cascades from the non-hover setting.
* `$btnBoxShadowSettingsHov: (compound-type:box-shadow)` — This controls the box shadow of buttons without an additional class, on mouse rollover. By default, this cascades from the non-hover setting.
* `$btnDecorationSettingsHov: (type:decoration)`         — This controls the text decoration of buttons without an additional class, on mouse rollover. By default, this cascades from the non-hover setting.overriden later.
* `$btnBgFoc: (type:colour)`                             — This controls the colour of all button backgrounds, even those with an additional class, when there is a focus event. The default is to use `$msGold`, but any bright colour will work.
* `$btnTextFoc: (type:colour)`                           — This controls the colour of all button text, even those with an additional class, when there is a focus event. This needs to be of high contrast with its background, of course. The default is black.
* `$btnBorderSettingsFoc: (compound-type:border)`        — This controls the border of all buttons, even those with an additional class, when there is a focus event. The default is just to have this match the `$btnBgFoc` colour.
* `$btnOutlineSettingsFoc: (compound-type:outline)`      — This controls the outline of all buttons, even those with an additional class, when there is a focus event. The default is just to use `$defaultOutlineSettings`.
* `$btnBoxShadowSettingsFoc: (compound-type:box-shadow)` — This controls the box shadow of all buttons, even those with an additional class, when there is a focus event. The default is to cascade this option from `$btnBoxShadowSettings`.
* `$btnDecorationSettingsFoc: (type:decoration)`         — This controls the text decoration of all buttons, even those with an additional class, when there is a focus event. The default is to cascade this option from `$btnDecorationSettings`.

#### Buttons: Primary buttons

These buttons are the 'primary' buttons for a form, and are the default action if you just press Enter on a form. There are no descriptions for these options, because they match the behaviour of **Buttons: All**, only applied to the primary buttons as overrides.

* `$btnPriBg: (type:colour)`
* `$btnPriText: (type:colour)`
* `$btnPriBorderSettings: (compound-type:border)`
* `$btnPriOutlineSettings: (compound-type:outline)`
* `$btnPriBoxShadowSettings: (compound-type:box-shadow)`
* `$btnPriDecorationSettings: (type:decoration)`
* `$btnPriBgHov: (type:colour)`
* `$btnPriTextHov: (type:colour)`
* `$btnPriBorderSettingsHov: (compound-type:border)`
* `$btnPriOutlineSettingsHov: (compound-type:outline)`
* `$btnPriBoxShadowSettingsHov: (compound-type:box-shadow)`
* `$btnPriDecorationSettingsHov: (type:decoration)`

#### Buttons: Secondary buttons

These buttons are the 'secondary' buttons for a form, and represent some other action not part of a form's default workflow. There are no descriptions for these options, because they match the behaviour of **Buttons: All**, only applied to the secondary buttons as overrides.

* `$btnSecBg: (type:colour)`
* `$btnSecText: (type:colour)`
* `$btnSecBorderSettings: (compound-type:border)`
* `$btnSecOutlineSettings: (compound-type:outline)`
* `$btnSecBoxShadowSettings: (compound-type:box-shadow)`
* `$btnSecDecorationSettings: (type:decoration)`
* `$btnSecBgHov: (type:colour)`
* `$btnSecTextHov: (type:colour)`
* `$btnSecBorderSettingsHov: (compound-type:border)`
* `$btnSecOutlineSettingsHov: (compound-type:outline)`
* `$btnSecBoxShadowSettingsHov: (compound-type:box-shadow)`
* `$btnSecDecorationSettingsHov: (type:decoration)`

#### Buttons: Menu buttons

These buttons are found in the OPAC navigation menus, as well as the account menu. They are, by default, set to match the secondary buttons. There are no descriptions for these options, because they match the behaviour of **Buttons: All**, only applied to the menu buttons as overrides.

* `$btnMenuBg: (type:colour)`
* `$btnMenuText: (type:colour)`
* `$btnMenuBorderSettings: (compound-type:border)`
* `$btnMenuOutlineSettings: (compound-type:outline)`
* `$btnMenuBoxShadowSettings: (compound-type:box-shadow)`
* `$btnMenuDecorationSettings: (type:decoration)`
* `$btnMenuBgHov: (type:colour)`
* `$btnMenuTextHov: (type:colour)`
* `$btnMenuBorderSettingsHov: (compound-type:border)`
* `$btnMenuOutlineSettingsHov: (compound-type:outline)`
* `$btnMenuBoxShadowSettingsHov: (compound-type:box-shadow)`
* `$btnMenuDecorationSettingsHov: (type:decoration)`  

#### Buttons: Link buttons

These buttons are found around the site in places like the results page, and on the details page, for example, and are intended to be styled similarly to a hyperlink. There are no descriptions for these options, because they match the behaviour of **Buttons: All**, only applied to the link buttons as overrides.

* `$btnLinkBg: (type:colour)`
* `$btnLinkText: (type:colour)`
* `$btnLinkBorderSettings: (compound-type:border)`
* `$btnLinkOutlineSettings: (compound-type:outline)`
* `$btnLinkBoxShadowSettings: (compound-type:box-shadow)`
* `$btnLinkDecorationSettings: (type:decoration)`
* `$btnLinkBgHov: (type:colour)`
* `$btnLinkTextHov: (type:colour)`
* `$btnLinkBorderSettingsHov: (compound-type:border)`
* `$btnLinkOutlineSettingsHov: (compound-type:outline)`
* `$btnLinkBoxShadowSettingsHov: (compound-type:box-shadow)`
* `$btnLinkDecorationSettingsHov: (type:decoration)`

#### Buttons: Danger buttons

These buttons are the 'danger' buttons for a form, and communicate a potentially destructive action to the user. There are no descriptions for these options, because they match the behaviour of **Buttons: All**, only applied to the danger buttons as overrides.

* `$btnDangerBg: (type:colour)`
* `$btnDangerText: (type:colour)`
* `$btnDangerBorderSettings: (compound-type:border)`
* `$btnDangerOutlineSettings: (compound-type:outline)`
* `$btnDangerBoxShadowSettings: (compound-type:box-shadow)`
* `$btnDangerDecorationSettings: (type:decoration)`
* `$btnDangerBgHov: (type:colour)`
* `$btnDangerTextHov: (type:colour)`
* `$btnDangerBorderSettingsHov: (compound-type:border)`
* `$btnDangerOutlineSettingsHov: (compound-type:outline)`
* `$btnDangerBoxShadowSettingsHov: (compound-type:box-shadow)`
* `$btnDangerDecorationSettingsHov: (type:decoration)`

#### Buttons: Disabled buttons

SENUX identifies disabled buttons by making them more opaque. This is generally accessible in most instances, as the button becomes fainter, rather than using colour, to express the change in behaviour. Sometimes, though, this opacity isn't strong enough for certain colour combinations. The following option is intended to hand that control to you, the site designer.

* `$btnDisabledOpacity: (type:decimal:0-1)` — Controls the opacity of disabled buttons, `0` would render a completely invisible button, while `1` would render a disabled button that is identical to its active counterpart.

#### Inputs: All

These settings control all input fields, beit text areas, text boxes, checkboxes, listboxes, or radio buttons. The default styling is designed to follow the buttons closely, but these variables are decoupled so that you can make sure they better match, if, for example, you decide to change the box shadows, or focus colours.

* `$inputBg: (type:colour)`                                 - This controls the background colour within the input. By default, this is set to `$white`.
* `$inputText: (type:colour)`                               - This controls the text colour within the input, where applicable. By default, this is set to `$msBlack`.
* `$inputBorderSettings: (compound-type:border)`            - This controls the border of the input field. By default, this is set to `$inputText`.
* `$inputOutlineSettings: (compound-type:outline)`          - This controls the outline of the input field. By default, this is cascaded from `$defaultOutlineSettings`.
* `$inputBoxShadowSettings: (compound-type:box-shadow)`     - This controls the box shadow of the input field. By default, this is cascaded from `$defaultBoxShadowSettings`.
* `$inputDecorationSettings: (type:decoration)`    - This controls the text decoration of the text within the input field, where applicable. This should be left as `none`, unless you have a specific reason to do otherwise.
* `$inputBgHov: (type:colour)`                              - This controls the background colour within the input, on mouse rollover. By default, this cascades from the non-hover setting.
* `$inputTextHov: (type:colour)`                            - This controls the text colour within the input, where applicable, on mouse rollover. By default, this cascades from the non-hover setting.
* `$inputBorderSettingsHov: (compound-type:border)`         - This controls the border of the input field, on mouse rollover. By default, this cascades from the non-hover setting.
* `$inputOutlineSettingsHov: (compound-type:outline)`       - This controls the outline of the input field, on mouse rollover. By default, this cascades from the non-hover setting.
* `$inputBoxShadowSettingsHov: (compound-type:box-shadow)`  - This controls the box shadow of the input field, on mouse rollover. By default, an inset shadow is applied, matching the colour of `$inputText`, to give the border a thicker appearance, without bulging the input outwards.
* `$inputDecorationSettingsHov: (type:decoration)` - This controls the text decoration of the text within the input field, where applicable, on mouse rollover. This should be left as `none`, unless you have a specific reason to do otherwise.
* `$inputBgFoc: (type:colour)`                              - This controls the background colour within the input, when there is a focus event. By default, this cascades from the hover setting.
* `$inputTextFoc: (type:colour)`                            - This controls the text colour within the input, where applicable, when there is a focus event. By default, this cascades from the hover setting.
* `$inputBorderSettingsFoc: (compound-type:border)`         - This controls the border of the input field, when there is a focus event. By default, this cascades from the hover setting.
* `$inputOutlineSettingsFoc: (compound-type:outline)`       - This controls the outline of the input field, when there is a focus event. By default, this changes the hover outline's colour to `$msGold`, making it obvious the cursor is within.
* `$inputBoxShadowSettingsFoc: (compound-type:box-shadow)`  - This controls the box shadow of the input field, when there is a focus event. By default, this cascades from the hover setting.
* `$inputDecorationSettingsFoc: (type:decoration)` - This controls the text decoration of the text within the input field, where applicable, when there is a focus event. This should be left as `none`, unless you have a specific reason to do otherwise.

#### Inputs: Disabled inputs

Much like with the buttons, inputs can be disabled, and we need some way of identifying this. SENUX uses a custom grey tone as the background, and maintains the rest of the settings as-is. There are no descriptions for these options, because they match the behaviour of **Inputs: All**, only applied to the disabled inputs as overrides.

* `$inputDisabledBg: (type:colour)`
* `$inputDisabledText: (type:colour)`
* `$inputDisabledBorderSettings: (compound-type:border)`
* `$inputDisabledOutlineSettings: (compound-type:outline)`
* `$inputDisabledBoxShadowSettings: (compound-type:box-shadow)`
* `$inputDisabledDecorationSettings: (type:decoration)`

#### Inputs: Placeholder text

Koha makes use of placeholder text in some input fields (e.g. the OPAC search field). SENUX specifies this as being the same colour as your regular text, and uses opacity to make it clear that the text is of a placeholder nature. The default value here is 0.66, but you can tweak this if you don't feel it is obvious enough.

* `$inputPlaceholderOpacity: (type:decimal:0-1)` — Controls the opacity of placeholder text used in some input fields, `0` would render invisible text, while `1` would render text that is indistinguishable from standard text.

#### Dropdown menus

Dropdown menus are a feature of Koha. The following options control these menus from a stylistic point of view.

* `$dropdownBg: (type:colour)`                                    — This controls the background of the dropdown menu popout, not the link backgrounds.
* `$dropdownText: (type:colour)`                                  — This controls the colour of any text within the dropdown menu popout, that isn't a link.
* `$dropdownLinkBg: (type:colour)`                                — This controls the background of the dropdown menu popout's links, and should be left to transparent.
* `$dropdownLinkText: (type:colour)`                              — This controls the text colour of the dropdown menu popout's links. Defaults to `$msBlue`.
* `$dropdownLinkBorderSettings: (compound-type:border)`           — This controls the border of the dropdown menu popout's links. Defaults to the setting for generic links.
* `$dropdownLinkOutlineSettings: (compound-type:outline)`         — This controls the outline of the dropdown menu popout's links. Defaults to the setting for generic links.
* `$dropdownLinkBoxShadowSettings: (compound-type:box-shadow)`    — This controls the box shadow of the dropdown menu popout's links. Defaults to the setting for generic links.
* `$dropdownLinkDecorationSettings: (type:decoration)`            — This controls the text decoration of the dropdown menu popout's links. Defaults to the setting for generic links.
* `$dropdownLinkBgHov: (type:colour)`                             — This controls the background of the dropdown menu popout's links, on mouse rollover. Defaults to `$msBlue`.
* `$dropdownLinkTextHov: (type:colour)`                           — This controls the text colour of the dropdown menu popout's links, on mouse rollover. Defaults to `$msWhite`.
* `$dropdownLinkBorderSettingsHov: (compound-type:border)`        — This controls the border of the dropdown menu popout's links, on mouse rollover. Defaults to the setting for non-hover dropdown links.
* `$dropdownLinkOutlineSettingsHov: (compound-type:outline)`      — This controls the outline of the dropdown menu popout's links, on mouse rollover. Defaults to the setting for non-hover dropdown links.
* `$dropdownLinkBoxShadowSettingsHov: (compound-type:box-shadow)` — This controls the box shadow of the dropdown menu popout's links, on mouse rollover. Defaults to the setting for non-hover dropdown links.
* `$dropdownLinkDecorationSettingsHov: (type:decoration)`         — This controls the text decoration of the dropdown menu popout's links, on mouse rollover. Defaults to the setting for non-hover dropdown links.

### Navbar variables

The Navbar represents the thin black strip running across the top of the SENUX OPAC, where you'll find the Koha logo, and account menu or login button.

#### Navbar: Generic

These rules apply to the root of the navbar, as well as a few generic styling rules.

* `$navbarBg: (type:colour)`                            – This controls the background of the navbar as a whole, and defaults to `$msBlack`.
* `$navbarLinkText: (type:colour)`                      – This controls the colour of the navbar links. It is, by default, set to `lighten($msBlack, 85%)`.
* `$navbarLinkDecorationSettings: (type:decoration)`    – This controls the text decoration of the navbar links. This should be left to `none` unless you're certain you want otherwise.
* `$navbarLinkTextHov: (type:colour)`                   – This controls the colour of the navbar links, on mouse rollover. It is, by default, set to `lighten($msBlack, 60%)`, 25% darker than the non-hover setting.
* `$navbarLinkDecorationSettingsHov: (type:decoration)` – This controls the text decoration of the navbar links, on mouse rollover. This should be left to `none` unless you're certain you want otherwise.

#### Navbar: Logo

These settings control the white Koha logo found on the navbar. SENUX's recommended branding method is to add a brand logo to the header (see below), rather than on the navbar. That said, the choice is yours, and if you wish to hide or replace the Koha branding, you can do so here.

* `$navbarLogoBg: (compound-type:background-image)`             – This controls the logo image on the navbar. Carefully consider the CSS you'll want or need to display your logo correctly, if you opt to use this option. Defaults to the Koha logo.
* `$navbarLogoBgSize: (choice:cover|contain)`                   – This controls the size of aforementioned logo image. Cover will ensure the image fills its container, whilst contain ensures it will never overlap its container's edges. Contain is best for most uses.
* `$navbarLogoText: (type:colour)`                              – This controls the colour of any text found in the logo area of the navbar. This could theoretically display if the image went missing, so it is wise to set this to something that contrasts well with `$navbarBg`.
* `$navbarLogoBorderSettings: (compound-type:border)`           – This controls the border surrounding the logo image on the navbar. By default, this matches the generic link's settings.
* `$navbarLogoOutlineSettings: (compound-type:outline)`         – This controls the outline surrounding the logo image on the navbar. By default, this matches the generic link's settings.
* `$navbarLogoBoxShadowSettings: (compound-type:box-shadow)`    – This controls the box shadow applied to the logo image on the navbar. By default, this matches the generic link's settings.
* `$navbarLogoDecorationSettings: (type:decoration)`            – This controls the decoration of any text found in the logo area of the navbar. By default, this matches the generic link's settings.
* `$navbarLogoBgHov: (compound-type:background-image)`          – This controls the logo image on the navbar, on mouse rollover. You have two options, here: you can either set this to match the non-hover background, and use the other options at your disposal to signify hover events, or you can provide a second background-image, and use that to signify hover events. The default is the former.
* `$navbarLogoTextHov: (type:colour)`                           – This controls the colour of any text found in the logo area of the navbar, on mouse rollover. This could theoretically display if the image went missing, so it is wise to set this to something that contrasts well with `$navbarBg`.
* `$navbarLogoBorderSettingsHov: (compound-type:border)`        – This controls the border surrounding the logo image on the navbar, on mouse rollover. By default, this matches the generic link's settings.
* `$navbarLogoOutlineSettingsHov: (compound-type:outline)`      – This controls the outline surrounding the logo image on the navbar, on mouse rollover. By default, this matches the colour of `$navbarLogoTextHov`.
* `$navbarLogoBoxShadowSettingsHov: (compound-type:box-shadow)` his controls the box shadow applied to the logo image on the navbar, on mouse rollover. By default, this matches the colour of `$navbarLogoTextHov`.
* `$navbarLogoDecorationSettingsHov: (type:decoration)`         – This controls the decoration of any text found in the logo area of the navbar, on mouse rollover. By default, this matches the generic link's settings.
* `$navbarLogoBgFoc: (compound-type:background-image)`          – This controls the logo image on the navbar, when there is a focus event.
* `$navbarLogoTextFoc: (type:colour)`                           – This controls the colour of any text found in the logo area of the navbar, when there is a focus event. This could theoretically display if the image went missing, so it is wise to set this to something that contrasts well with `$navbarBg`.
* `$navbarLogoBorderSettingsFoc: (compound-type:border)`        – This controls the border surrounding the logo image on the navbar, when there is a focus event. By default, this matches the generic link's settings.
* `$navbarLogoOutlineSettingsFoc: (compound-type:outline)`      – This controls the outline surrounding the logo image on the navbar, when there is a focus event. By default, this matches the generic link's settings.
* `$navbarLogoBoxShadowSettingsFoc: (compound-type:box-shadow)` his controls the box shadow applied to the logo image on the navbar, when there is a focus event. By default, this matches the generic link's settings.
* `$navbarLogoDecorationSettingsFoc: (type:decoration)`         – This controls the decoration of any text found in the logo area of the navbar, when there is a focus event. By default, this matches the generic link's settings.
* `$navbarLogoWidth: (type:length:px|em|rem)`                   – If you chose to use your own logo image in the navbar, set the width of it here.
* `$navbarLogoHeight: (type:length:px|em|rem)`                  – If you chose to use your own logo image in the navbar, set the height of it here. Note that it is strongly recommended to keep this value below `40px`, or an equivalent measure.
* `$navbarLogoDisplay: (type:display)`                          – This controls whether or not the logo displays, when viewed on a desktop, or tablet computer.
* `$navbarLogoDisplayMobile: (type:display)`                    – This controls whether or not the logo displays, when viewed on a mobile device. If your navbar is particularly cluttered, setting this to `none` may help with reflow issues.

#### Navbar: Usermenu

These settings control the user menu dropdown, which is visible only after logging in. There are some sane defaults, but if you wish to tweak these, you may.

* `$navbarUsermenuBg: (type:colour)`            – This controls the background colour used on the usermenu dropdown. Defaults to the same as other dropdown menus.
* `$navbarUsermenuText: (type:colour)`          – This controls the non-link text colour used on the usermenu dropdown. Defaults to the same as other dropdown menus.
* `$navbarUsermenuLinkText: (type:colour)`      – This controls the link text colour used on the usermenu dropdown. Defaults to the same as other dropdown menus.
* `$navbarUsermenuLinkTextHov: (type:colour)`   – This controls the link text colour used on the usermenu dropdown, on mouse rollover. Defaults to a 15% dakened variant of `$navbarUsermenuLinkText`.
* `$navbarUsermenuLogoutText: (type:colour)`    – This controls the logout link text colour used on the usermenu dropdown. Defaults to `$msRed`.
* `$navbarUsermenuLogoutTextHov: (type:colour)` – This controls the logout link text colour used on the usermenu dropdown, on mouse rollover. Defaults to a 15% dakened variant of `$navbarUsermenuLogoutTextHov`.

### Header variables

These variables impact everything that comes below the navbar, and above the main content block. So, including, but not necessarily limited to: the `opacheader` HTML Customisation, the search fields, and the additional search links (moresearch).

#### Header: Generic

These settings correlate to anything found within the `opacheader` HTML Customisations, whether or not you're using the SENUX template provided.

* `$headerBg: (compound-type:background-image)|(type:colour)` – This controls the background used across the entire `opacheader` region. By default, it is an animated stripey vector graphic. This can either be replaced with another image, or simply with a variable of type `colour` instead.
* `$headerBgSize: (choice:cover|contain)`                    – This controls the behaviour of the background image defined above. `cover` will ensure the background image fills the space, whilst `contain` ensures it does not get cropped or extend outside of its intended area. For backgrounds of this nature, `cover` is advisable.
* `$headerText: (type:colour)`                               – This controls the colour of any non-link text found within the `opacheader` region. 
* `$headerLogoBg: (compound-type:background-image)`          – This controls the logo image, if you're using the SENUX HTML Customisations. If you're not using these, or your are, but you'd like to remove the logo, it is better to remove the HTML Customisation, rather than try and remove it through CSS.
* `$headerLogoBgSize: (choice:cover|contain)`                –  This controls the behaviour of the logo image defined above. `cover` will ensure the background image fills the space, whilst `contain` ensures it does not get cropped or extend outside of its intended area. For logos of this nature, `contain` is advisable.
* `$headerLogoText: (type:colour)`                           – This controls the colour of the logo text, should the logo image fail to load. This should be set to a colour that contrasts well with `$headerBg`.
* `$headerLogoWidth: (type:length:px|rem|em)`                – This controls the width of the logo image, should you choose to use it.
* `$headerLogoHeight: (type:length:px|rem|em)`               – This controls the height of the logo image, should you choose to use it.

#### Header: Main search area

These variables pertain to the main search area, though not the inputs themselves (see inputs above).

* `$mainSearchBg: (compound-type:background-image)|(type:colour)` – This controls the background colour found behind the main search inputs. Defaults to `$userHue2`.
* `$mainSearchText: (type:colour)`                                – This controls the non-link text colour found behind the main search inputs, if applicable. Defaults to `$userText2`.
* `$mainSearchLinkText: (type:colour)`                            – This controls the text colour of any links found within the main search area. Usually, there are none. Defaults to `$userText2`.
* `$mainSearchLinkDecorationSettings: (type:decoration)`          – This controls the text decoration settings of any links found within the main search area. Usually, there are none. Defaults to the same as the generic links.
* `$mainSearchLinkTextHov: (type:colour)`                         – This controls the text colour of any links found within the main search area, on mouse rollover. Usually, there are none. Defaults to a 15% lighter version of `$mainSearchLinkText`.
* `$mainSearchLinkDecorationSettingsHov: (type:decoration)`       – This controls the text decoration settings of any links found within the main search area, on mouse rollover. Usually, there are none. Defaults to the same as the generic links.

#### Header: More searches area

These variable pertain to the more searches area, which is the strip of links found directly below the search inputs.

* `$moreSearchBg: (compound-type:background-image)|(type:colour)` – This controls the background colour found behind the moresearch links. Defaults to `$userHue3`.
* `$moreSearchText: (type:colour)`                                – This controls the non-link text colour found in the morsearch area. Defaults to `$userText3`.
* `$moreSearchLinkText: (type:colour)`                            – This controls the link text colour found in the moresearch area. Defaults to `$userHue3`.
* `$moreSearchLinkDecorationSettings: (type:decoration)`          – This controls the text decoration settings of any links found in the moresearch area. Defaults to that of the generic site links.
* `$moreSearchLinkTextHov: (type:colour)`                         – This controls the link text colour found in the moresearch area, on mouse rollover. Defaults to a 15% lighter version of `$moreSearchLinkText`.
* `$moreSearchLinkDecorationSettingsHov: (type:decoration)`       – This controls the text decoration settings of any links found in the moresearch area. Defaults to that of the generic site links.

### Content area variables

These variables relate to everything found beneath the search area, and above the footer. Essentially, the main content area that differs from page to page.

#### Breadcrumb variables

These variables control the stylistic definitions of the breadcrumb bar, and its constituent components.

* `$breadcrumbBg: (type:colour)`                            – This controls the background colour of the breadcrumbs. Defaults to `$defaultFg`.
* `$breadcrumbText: (type:colour)`                          – This controls non-link text colour of the breadcrumbs. Defaults to `$defaultText`.
* `$breadcrumbDividerText: (type:colour)`                   – This controls the colour of the character used to divide between each breadcrumb item. Defaults to a 50% lighter version of `$breadcrumbText`.
* `$breadcrumbDividerContents: (type:string:1)`             – This controls which character to display when dividing each breadcrumb item. The default is `'/'`.
* `$breadcrumbLinkText: (type:colour)`                      – This controls the link text colour of the breadcrumbs. Defaults to the generic link settings.
* `$breadcrumbLinkDecorationSettings: (type:decoration)`    – This controls the text decoration of a breadcrumb link. Defaults to the generic link settings.
* `$breadcrumbLinkTextHov: (type:colour)`                   – This controls the link text colour of the breadcrumbs, on mouse rollover. Defaults to the generic link settings.
* `$breadcrumbLinkDecorationSettingsHov: (type:decoration)` – This controls the text decoration of a breadcrumb link, on mouse rollover. Defaults to the generic link settings.

#### Toolbar variables

These variables control the base styling of the site's toolbar. At this point in the variables document, there are so many other definitions of note, your toolbar probably looks correct. These settings nonetheless offer some basic overrides.

* `$toolbarBg: (type:colour)`   – This controls the background colour of any toolbars (e.g. the one above the results list, on the search results page). Default is a slightly darkened version of `$defaultBg`.
* `$toolbarText: (type:colour)` – This controls the colour of any non-link text found on the toolbar. This defaults to `$defaultText`.

#### Toolbar variables

These variables control the base styling of the site's toolbar. At this point in the variables document, there are so many other definitions of note, your toolbar probably looks correct. These settings nonetheless offer some basic overrides.

* `$toolbarBg: (type:colour)`   – This controls the background colour of any toolbars (e.g. the one above the results list, on the search results page). Default is a slightly darkened version of `$defaultBg`.
* `$toolbarText: (type:colour)` – This controls the colour of any non-link text found on the toolbar. This defaults to `$defaultText`.

#### Headliner variables

These settings control the background colour & text colour of the 'Refine your search' box, found on the search results page. It is more prominent on mobile, where it fills the full width of the page.

* `$headlinerBg: (type:colour)`   – This controls the background colour found within the headliner. Defaults to a slightly darker variant of `$defaultBg`.
* `$headlinerText: (type:colour)` – This controls the colour of the text found within the headliner. Defaults to `$defaultText`.

#### Access online variables

These settings control the access online links, generated on the search results pages, when a record has an 856$u field defined.

* `$onlineAccessBg: (type:colour)`                         – This controls the background colour of the access online link. By default, this is set to a 35% lighter variant of `$msGold`.
* `$onlineAccessText: (type:colour)`                       – This controls the non-link text colour of the access online link. By default, this is is set to `$msBlack`.
* `$onlineAccessLinkText: (type:colour)`                   – This controls the link text colour of the access online link. By default, this is set to match the site's generic links.
* `$onlineAccessLinkDecorationSettings: (type:decoration)` – This controls the link text decoration settings of the access online link. By default, this is set to match the site's generic links.
* `$onlineAccessLinkTextHov: (type:colour)`                – This controls the link text colour of the access online link, on mouse rollover. By default, this is set to match the site's generic links.
* `$onlineAccessLinkDecorationSettingsHov: (type:colour)`  – This controls the link text decoration settings of the access online link. By default, this is set to match the site's generic links.

#### Table variables

The following settings control the appearance of tables. You're not able to change link colours for tables, so be careful when picking your colours not to upset the contrast balance of the site.

* `$tableHeadBg: (type:colour)`    – This controls the background colour of table heads. This defaults to a slightly darker variant of `$defaultBg`.
* `$tableHeadText: (type:colour)`  – This controls the text colour of table heads. This defaults to a slightly darker variant of `$defaultText`.
* `$tableRowBg: (type:colour)`     – This controls the background colour of table rows. This defaults to `$defaultBg`.
* `$tableRowText: (type:colour)`   – This controls text colour of table rows. This defaults to `$defaultText`.
* `$tableRowOddBg: (type:colour)`  – This controls the background colour of odd table rows, when striped mode is on. This defaults to `$defaultFg`.
* `$tableRowEvenBg: (type:colour)` – This controls the background colour of even table rows, when striped mode is on. This defaults to `$defaultBg`.

### Footer variables

The footer is the section of the site found at the very bottom of the page, below the content area. This is typically a sparsely populated area, and may include contact details and/or useful links for the library. There are only a couple of variables here, as this is typically a heavily customised space outside of the scope of SENUX. Nonetheless, you can still style it fairly flexibly here.

* `$footerBg: (compound-type:background-image)|(type:colour)` – This controls the background image, or colour, of the footer area. This defaults to `$msBlack`.
* `$footerText: (type:colour)`                                – This controls the non-link text colour of the footer area. This defaults to `$msWhite`.
* `$footerLinkText: (type:colour)`                            – This controls the link text colour of the footer area. This defaults to the same as regular footer text.
* `$footerLinkDecorationSettings: (type:decoration)`          – This controls the link text decoration settings. This defaults to the same as other links on the site.
* `$footerLinkText: (type:colour)`                            – This controls the link text colour of the footer area, on mouse rollover. This defaults to a 15% darker variant of `$footerLinkText`.
* `$footerLinkDecorationSettings: (type:decoration)`          – This controls the link text decoration settings, on mouse rollover. This defaults to the same as other links on the site.
