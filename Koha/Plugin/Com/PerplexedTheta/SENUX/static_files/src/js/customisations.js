//
// Part of the Senux Project
// Copyright 2021-2022 Jake Deery
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//


//----------------------------------------------------------------------------
// DO NOT MODIFY THIS FILE! Instead, create and modify 'customisations.js' 
// in the git repo root, and make your changes there!
//----------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', event => {

    // ---> insert here <---

    // vars
    var baseLang = $('html').attr('lang');
    var baseHost = window.location.origin;
    var baseUri = window.location.pathname + window.location.search + window.location.hash;

    //
    // gdpr
    showGdprBanner();


    //
    // accessibility

    // add link labels
    externalLinkAriaLabeller();


    //
    // site-wide logic (MAIN FUNC)

    // nav menus
    $('#cart-list-nav').html('<!--<li class=\"nav-item\"><a href=\"\/cgi-bin\/koha\/opac-main.pl\" class=\"nav-link\" title=\"Homepage\" id=\"hmpmenu\"><i class=\"fa fa-home fa-icon-white\"><\/i><\/a><\/li>--><li class=\"nav-item\"><a href=\"#openFolder\" class=\"nav-link\" title=\"Folder\" id=\"cartmenu\" role=\"button\"><i id=\"carticon\" class=\"fa fa-folder-open fa-icon-black\"><\/i> <span class=\"cartlabel\">Folder<\/span><\/a><\/li><li class=\"nav-item\"><a href=\"\/cgi-bin\/koha\/opac-shelves.pl?op=list&public=1\" class=\"nav-link\" title=\"Lists\" id=\"listsmenu\" role=\"button\"><i id=\"listsicon\" class=\"fa fa-list fa-icon-black\"><\/i> <span class=\"listslabel\">Lists<\/span><\/a><\/li><li class=\"nav-item\"><a href=\"\/cgi-bin\/koha\/opac-main.pl?news_id=2\" class=\"nav-link\" title=\"Help\" id=\"helpmenu\"><i class=\"fa fa-info-circle fa-icon-white\"><\/i> <span class=\"custlabel1\">Help<\/span><\/a><\/li>');

    // relabel login link
    if ($('#user-menu').hasClass('dropdown-toggle') == false) $('.userlabel').text('Log in');

    // remove cart notice
    $('#cartDetails').remove();

    // login modal - shibboleth
    // comment this out if you don't use saml
    /*
    $('#opac-auth > h2:contains("Shibboleth Login")').text('Academic student or staff?');
    $('#opac-auth > p:contains("Log in using a Shibboleth account.")').html('<a href=\"\/Shibboleth.sso\/Login?target=' + window.location.origin + window.location.pathname + window.location.search + '\" class=\"btn btn-primary\">Go to Institutional login &raquo;<\/a>');
    $('#opac-auth > h2:contains("Local login")').text('Academic partner or public user?');
    $('#opac-auth > p:contains("If you do not have a Shibboleth account")').text('If you do not have an Institution account, then you may login below.');
    $('#loginModal').html('<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h2 class=\"modal-title\" id=\"modalLoginLabel\">Log in to your account<\/h2><button type=\"button\" class=\"closebtn\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">\u00D7<\/span><\/button><\/div><div id=\"modalAuth\" class=\"modal-body\"><h3>Academic student or staff?<\/h3><p><a href=\"\/Shibboleth.sso\/Login?target=' + window.location.origin + window.location.pathname + window.location.search + '\" class=\"btn btn-primary\">Go to Institutional login &raquo;<\/a><\/p><h3>Academic partner or public user?<\/h3><p><a href=\"\/cgi-bin\/koha\/opac-user.pl\" class=\"btn btn-primary\">Go to local Koha login &raquo;<\/a><\/p><\/div><\/div><\/div>');
    */

    // relabel & swap go search button type
    $('#searchsubmit').html('Go \u00BB');
    //$('#searchsubmit').toggleClass('btn-primary btn-default');

    // disable borrower contact method dropdown if it is readonly
    $('select[name="borrower_primary_contact_method"]').removeAttr('readonly');
    $('select[name="borrower_primary_contact_method"]').attr('disabled', 'disabled');

    // hide search facets under menus
    facetAccordeons();

    // add publication date range to facets
    facetPublicationDateRange();

    // add a link to clear all search facets
    facetClearAllHandler();

    // explorit / ebsco / eds masthead pulldown handler
    //mastheadEventHandler('explorit || ebsco || eds');
    //searchCatalogue('explorit || ebsco || eds');

    // enable proper dropdown selection
    //searchDropdownBranchHandler();

    // add basket link handler
    basketLinkHandler();

    // reservation link handler
    reservationLinkHandler();

    // rename 'save records'
    renameSaveRecord();

    // replace all instances of password with pin
    //replacePasswordWithPin();

    // monitor disabled elements, setting tabindex where appropriate
    handleDisableClassChange();

    // add authority record alt text & tooltips
    $('a.authlink').attr('alt', 'View authority record');
    $('a.authlink').attr('title', 'View authority record');

    // remove ics links
    //$('#buttons-ics').remove();

    // remove 'powered by koha' regardless of syspref
    $('#koha_url').remove();


    //
    // page-specific logic


    //
    // mobilc-specific logic

});


window.addEventListener("load", event => {
    // accessibility
    //unwrapCoverImg();

    // add tooltips
    //addBootstrapTooltips();
});


//
// begin function definitions

//
// function to show gdpr banner
function showGdprBanner() {
    if (localStorage.getItem('-senux-gdrp-dismissed') == null) $('body').prepend('<div id=\"-gdpr-banner\"><p>This website uses cookies to ensure you get the best experience on our website <a id=\"-gdpr-moreinfo\" href=\"https:\/\/gdpr-info.eu\/\" target=\"_blank\">More info \u00BB<\/a><button id=\"-gdpr-dismiss\" class=\"btn btn-primary\">Dismiss<\/button><\/p><\/div>');
    $('#-gdpr-dismiss, #-gdpr-moreinfo').click(function () {
        localStorage.setItem('-senux-gdrp-dismissed', 'true');
        $('#-gdpr-banner').remove();
    });
    return;
}


//
// function to label external links
function externalLinkAriaLabeller() {
    $('a[target="_blank"]').each(function () {
        $(this).attr('aria-label', $(this).text() + ' (new window)');
    });
}


// function to unwrap cover images
function unwrapCoverImg() {
    $('.bookcover').each(function () {
        var img = $(this).find('img');

        img.unwrap();
        img.attr('alt', '');
    });
}

//
// function to change where we scroll to
function scrollToThis(element) {
    window.addEventListener('load', event => {
        $('#scrolltocontent').off(); 

        $('#scrolltocontent').on('click', event => {
            event.preventDefault();

            var content = $(element); // based on passed param
            if (content.length > 0) { // jump to element
                $('html,body').animate({
                    scrollTop: content.first().offset().top
                }, 'slow');

                content.first().find(':focusable').eq(0).focus(); // focus it
            }
        });
    });

    return;
}


//
// handle the basked a bit differently
function basketWindowHandler() {
    var strCookie = '';
    var nameCookie = 'bib_list';
    var valCookie = readCookie(nameCookie);
    if (valCookie) strCookie = nameCookie + '=' + valCookie;
    else strCookie = nameCookie + '=';

    var iW = 800;
    var iH = 500;
    var optWin = "status=yes,scrollbars=yes,resizable=yes,toolbar=no,location=yes,height=" + iH + ",width=" + iW;
    var loc = "/cgi-bin/koha/opac-basket.pl?" + strCookie;
    var basket = open(loc, "basket", optWin);
    if (window.focus) basket.focus();
}
function basketLinkHandler() {
    // bookbag link handler
    $('a[href="#openFolder"]').on('click', function (event) {
        event.preventDefault();
        basketWindowHandler();
    });
    return;
}


//
// function to monitor masthead pulldown for changes and act on events
function mastheadEventHandler(altSearchName) {
    $("#masthead_search").on('change', function (event) { // this handles dropdown change events
        if ($(this).val() == 'catalogue') {
            searchCatalogue(altSearchName);
        } else if ($(this).val() == 'explorit') { // if the user picks explorit . . .
            searchExplorit();
        } else if ($(this).val() == 'ebsco') { // if the user picks ebsco . . .
            searchEbsco();
        } else if ($(this).val() == 'eds') { // if the user picks eds . . .
            searchEDS();
        }
    });
    $('#masthead_search').after('<div id=\"mastheadHint\" style=\"display:none\"><label for=\"limit\"><i class=\"arrow-up\"><\/i> Click to refine further <i class=\"arrow-up\"><\/i><\/label><\/div>');
}


//
// masthead seach pulldown changes -- search catalogue
function searchCatalogue(altSearchName) {
    // form config
    $('#masthead_search').find('option').remove().end(); // remove all masthead options
    $('#searchform').find('input[type="hidden"]').remove().end(); // remove all masthead hidden inputs
    $('#searchform').attr('action', '/cgi-bin/koha/opac-search.pl'); // set form name
    $('#searchform').attr('name', 'searchform'); // set form name
    $('#searchform').attr('method', 'get'); // set form method
    $('#searchform').attr('target', '_self'); // set target
    $('#translControl1').attr('name', 'q'); // set search box name
    $('#translControl1').attr('placeholder', 'Find books, e-books, journal titles and films'); // set text field placeholder
    $('#masthead_search').attr('name', 'limit');
    $('#fullText').remove(); //
    $('#formName').remove(); // remove explorit hidden fields
    $('#select_library').attr('name', 'limit');
    $('#select_library').parent().css('display', 'initial'); // show library pulldown
    if ($('input[name="weight_search"]').length < 1) $('#searchform').append('<input type=\"hidden\" name=\"weight_search\" value=\"1\">'); // (re)add weight_search
    $('#mastheadHint').css('display', 'none');

    // dropdown config
    if (altSearchName == 'explorit') {
        $('#masthead_search').append($('<option>', { // explorit option
            value: 'explorit',
            text: 'Search Articles Plus'
        }));
    } else if (altSearchName == 'ebsco') {
        $('#masthead_search').append($('<option>', { // ebsco option
            value: 'ebsco',
            text: 'Search EBSCO'
        }));
    } else if (altSearchName == 'eds') {
        $('#masthead_search').append($('<option>', { // eds option
            value: 'eds',
            text: 'Search EDS'
        }));
    }
    $('#masthead_search').append($('<option>', { // catalogue option
        value: '',
        text: 'Search Catalogue',
        selected: 'selected'
    }));
    $('#masthead_search').append($('<option>', { // search books
        value: 'mc-ccode:PBK',
        text: '-- Books'
    }));
    $('#masthead_search').append($('<option>', { // search ebooks
        value: 'mc-ccode:EBK',
        text: '-- e-Books'
    }));
    $('#masthead_search').append($('<option>', { // search journals
        value: 'mc-ccode:JOUR',
        text: '-- Journals'
    }));
    $('#masthead_search').append($('<option>', { // search ejournals
        value: 'mc-ccode:EJOURN',
        text: '-- e-Journals'
    }));
    $('#masthead_search').append($('<option>', { // search dvds
        value: 'mc-ccode:DVD',
        text: '-- DVDs'
    }));
    $('#masthead_search').append($('<option>', { // search streaming media
        value: 'mc-ccode:ESTREAM',
        text: '-- Streaming media'
    }));
}


//
// masthead seach pulldown changes -- search explorit
function searchExplorit() {
    // form config
    $('#masthead_search').find('option').remove().end(); // remove all masthead options
    $('#searchform').find('input[type="hidden"]').remove().end(); // remove all masthead hidden inputs
    $('#searchform').attr('action', 'https://xxx.catalogueplus.deepwebaccess.com/xxx/desktop/en/search.html'); // set form name
    $('#searchform').attr('name', 'dwtform'); // set form name
    $('#searchform').attr('method', 'post'); // set form method
    $('#searchform').attr('target', '_blank'); // set target
    $('#translControl1').attr('name', 'fullRecord'); // set search box name
    $('#translControl1').attr('placeholder', 'Find full-text articles, reports, images, books and e-books'); // set text field placeholder
    $('#masthead_search').attr('name', 'fullTextOnly');
    $('#masthead_search').before('<input name=\"formName\" value=\"everything\" type=\"hidden\" \/>');
    $('#select_library').attr('name', '');
    $('#select_library').parent().css('display', 'none'); // hide library pulldown
    $('#mastheadHint').css('display', 'block'); // show hint

    // dropdown config
    $('#masthead_search').append($('<option>', { // catalogue option
        value: 'catalogue',
        text: 'Search Catalogue'
    }));
    $('#masthead_search').append($('<option>', { // explorit option
        value: '',
        text: 'Search Articles Plus',
        selected: 'selected'
    }));
    $('#masthead_search').append($('<option>', { // search fulltext-only
        value: 'true',
        text: '-- Search full-text only'
    }));

    // explorit formName handler
    $('#masthead_search').on('change click keyup', function (event) {
        if ($('#masthead_search').val() == 'true') { // are we doing an full-text search?
            $('input[name="formName"]').first().val('ftonly');
        } else {
            $('input[name="formName"]').first().val('everything');
        }
    });

    // explorit link handler
    $('a[href="#switchSearch"]').on('click', function (event) {
        event.preventDefault(); // prevent the url from changing
        if ($('#searchform').attr('name') == 'searchform') searchExplorit();
        else if ($('#searchform').attr('name') == 'dwtform') searchCatalogue('explorit');
    });

}


//
// masthead seach pulldown changes -- search ebsco
function searchEbsco() {
    // form config
    $('#masthead_search').find('option').remove().end(); // remove all masthead options
    $('#searchform').find('input[type="hidden"]').remove().end(); // remove all masthead hidden inputs
    $('#searchform').attr('action', 'https://searchbox.ebsco.com/search/'); // set form name
    $('#searchform').attr('name', ''); // set form name
    $('#searchform').attr('method', 'get'); // set form method
    $('#searchform').attr('target', '_blank'); // set target
    $('#translControl1').attr('name', 'bquery'); // set search box name
    $('#translControl1').attr('placeholder', 'Find full-text articles, reports, images, books and e-books'); // set text field placeholder
    $('#masthead_search').attr('name', '');
    $('#masthead_search').before('<input name=\"schemaId\" value=\"search\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"custid\" value=\"nsxxxxxx\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"groupid\" value=\"main\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"profid\" value=\"eds\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"scope\" value=\"site\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"site\" value=\"eds-live\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"direct\" value=\"true\" type=\"hidden\" \/>');
    $('#select_library').attr('name', '');
    $('#select_library').parent().css('display', 'none'); // hide library pulldown
    $('#mastheadHint').css('display', 'block'); // show hint

    // dropdown config
    $('#masthead_search').append($('<option>', { // catalogue option
        value: 'catalogue',
        text: 'Search Catalogue'
    }));
    $('#masthead_search').append($('<option>', { // ebsco option
        value: 'ebsco',
        text: 'Search EBSCO',
        selected: 'selected'
    }));

    // ebsco link handler
    $('a[href="#switchSearch"]').on('click', function (event) {
        event.preventDefault(); // prevent the url from changing
        if ($('#searchform').attr('name') == 'searchform') searchEbsco();
        else if ($('#searchform').attr('name') == '') searchCatalogue('ebsco');
    });

}


//
// masthead seach pulldown changes -- search eds
function searchEDS() {
    // form config
    $('#masthead_search').find('option').remove().end(); // remove all masthead options
    $('#searchform').find('input[type="hidden"]').remove().end(); // remove all masthead hidden inputs
    $('#searchform').attr('action', 'https://research.ebsco.com/c/xxxxxx/search/results'); // set form name
    $('#searchform').attr('name', ''); // set form name
    $('#searchform').attr('method', 'get'); // set form method
    $('#searchform').attr('target', '_blank'); // set target
    $('#translControl1').attr('name', 'q'); // set search box name
    $('#translControl1').attr('placeholder', 'Find full-text articles, reports, images, books and e-books'); // set text field placeholder
    $('#masthead_search').attr('name', 'limiters');
    $('#select_library').attr('name', '');
    $('#masthead_search').before('<input name=\"acr_values\" value=\"guest\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"autocorrect\" value=\"y\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"db\" value=\"\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"limiters\" value=\"None\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"searchMode\" value=\"all\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"searchSegment\" value=\"all-results\" type=\"hidden\" \/>');
    $('#masthead_search').before('<input name=\"skipResultsFetch\" value=\"true\" type=\"hidden\" \/>');
    $('#select_library').parent().css('display', 'none'); // hide library pulldown
    $('#mastheadHint').css('display', 'block'); // show hint

    // dropdown config
    $('#masthead_search').append($('<option>', { // catalogue option
        value: 'catalogue',
        text: 'Search Catalogue'
    }));
    $('#masthead_search').append($('<option>', { // explorit option
        value: 'None',
        text: 'Search EDS',
        selected: 'selected'
    }));
    $('#masthead_search').append($('<option>', { // search fulltext-only
        value: 'FT:Y',
        text: '-- Search full-text only'
    }));
    $('#masthead_search').append($('<option>', { // search fulltext-only
        value: 'RV:Y',
        text: '-- Search peer-reviewed only'
    }));

    // eds link handler
    $('a[href="#switchSearch"]').on('click', function (event) {
        event.preventDefault(); // prevent the url from changing
        if ($('#searchform').attr('name') == 'searchform') searchEDS();
        else if ($('#searchform').attr('name') == '') searchCatalogue('eds');
    });

}


//
// function to always select correct branch
function searchDropdownBranchHandler() {
    // vars
    var urlParams = new URLSearchParams(window.location.search.substring(1));
    var urlParamsFiltered = Array.from(urlParams.entries()).filter(value => { // remove previous limit params
        if (!value[1].includes('branch:')) return false;
        else return true; // only return true if above conditions are met
    });

    // select the right value
    if (urlParamsFiltered[0][1]) $('option[value="' + urlParamsFiltered[0][1] + '"]').attr('selected', 'selected');
}


//
// function to add accordeons to search facets
function facetAccordeons() {
    // change the labels to be links
    $('#search-facets .menu-collapse h3').each(function () {
        // vars
        var currentText = $(this).text();

        $(this).html('<a href="\#expandFacet"\>' + currentText + ' <i class=\"fa fa-chevron-down\" aria-hidden=\"true\"><\/i><\/a>');
    });

    // remove the display:none and collapsible facet
    $('#search-facets .collapsible-facet').each(function () {
        $(this).removeAttr('style');
        $(this).removeAttr('class');
    });

    // remove the toggle links
    $('#search-facets .moretoggle').each(function () {
        $(this).remove();
    });

    // hide the lists
    $('#search-facets .menu-collapse ul').each(function () {
        $(this).hide();
    });

    // facet link handler
    $('a[href="#expandFacet"]').on('click', function (event) {
        event.preventDefault();

        if ($(this).parents('h3').siblings('ul').css('display') == 'none') $(this).parents('h3').siblings('ul').show(); // unhide
        else $(this).parents('h3').siblings('ul').hide(); // else hide

        $(this).find('i.fa').toggleClass('fa-chevron-down'); // swap the chevrons
        $(this).find('i.fa').toggleClass('fa-chevron-left');
    });

    // unhide anything that has been selected
    $('#search-facets .menu-collapse li').find('li:contains("[x]")').each(function () {
        $(this).parents('li').find('h3 a').click();
    });
    $('#search-facets .menu-collapse li').find('li:contains("Showing only available items")').each(function () {
        $(this).parents('li').find('h3 a').click();
    });

    return;
}


//
// function to add a button which, on click, clears all search facets
function facetClearAllHandler() {
    // vars
    var urlParams = new URLSearchParams(window.location.search.substring(1));
    var q = urlParams.get('q');

    // detect if [x] exists
    if ($('#search-facets .menu-collapse li:contains("[x]")').length > 0) $('#search-facets ul:first').prepend('<li id=\"cls_id\"><h3 id=\"facet-cls\"><a href=\"#facetAllClear\" class=\"logout\">Clear all facets <i class=\"fa fa-times\" aria-hidden=\"true\"><\/i><\/a><\/h3><\/li>');

    // handle any clicks
    $('a[href="#facetAllClear"]').first()
    .on('click', function (event) {
        event.preventDefault();

        window.location.href = window.location.origin + '/cgi-bin/koha/opac-search.pl?q=' + q;
    });

    return;
}


//
// function to add date ranges to search facets
function facetPublicationDateRange() {
    // vars
    var urlParams = new URLSearchParams(window.location.search.substring(1)); // this doesnt like question marks
    var urlParamsFiltered = Array.from(urlParams.entries()).filter(value => { // remove previous limit params
        if (!value[1].includes('yr,st-numeric')) return false;
        else return true; // only return true if above conditions are met
    });
    if (urlParamsFiltered[0]) {
        var urlFacetSet = true;
        var urlFacet = urlParamsFiltered[0][1].substr(14);
    } else {
        var urlFacetSet = false;
        var urlFacet = '';
    }
    var currentYear = new Date().getFullYear();

    // first, inject the markup
    $('#search-facets ul:first').append('<li id=\"yr_id\"><h3 id=\"facet-yr\"><a href=\"#expandFacet\">Publication date range<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"><\/i><\/a><\/h3> <div style=\"display:none\"><label class=\"mt-4\" for=\"limit-yr\">Enter publication date range:<\/label><input name=\"limit-yr\" type=\"text\"><p class=\"hint pt-2\">For example: 1999-2001<\/p><p id=\"limit-yr-err\" class=\"hint pt-2\" style=\"display:none;color:red\">Please check you entered two valid years<\/p><a href=\"#facetYrRefine\" class=\"btn btn-primary mt-2\">Refine by date<\/a><\/div><\/li>');

    // then, inject the facet clear button, if applicable
    if (urlFacetSet) {
        $('input[name="limit-yr"]').val(urlFacet);
        $('a[href="#facetYrRefine"]').after('<a href=\"#facetYrClear\" class=\"btn btn-danger mt-2\">Clear date refinement [x]<\/a>'); // add clear button
    }

    // then handle clicks
    $('#facet-yr a').on('click', function (event) {
        event.preventDefault(); // disable usual behaviour
        event.stopImmediatePropagation();

        if ($(this).parents('h3').siblings('div').css('display') == 'none') $(this).parents('h3').siblings('div').show(); // see facetAccordeon for how this code works
        else $(this).parents('h3').siblings('div').hide();

        $(this).find('i.fa').toggleClass('fa-chevron-down');
        $(this).find('i.fa').toggleClass('fa-chevron-left');
    });

    $('a[href="#facetYrRefine"]').first()
    .on('click', function (event) {
        event.preventDefault();

        facetPublicationDateRangeSubmitHandler();
    });
    $('a[href="#facetYrClear"]').on('click', function (event) {
        event.preventDefault();

        facetPublicationDateRangeResetHandler();
    });
    $('input[name="limit-yr"]').first()
    .on('keyup', function (event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();

            facetPublicationDateRangeSubmitHandler();
        }
    });

    if (urlFacetSet) {
        $('#facet-yr a').first().click(); // we want to show the user the facet, you see
    }

    return;
}


//
// function to process publication date range submissions
function facetPublicationDateRangeSubmitHandler() {
    // vars
    var urlParams = new URLSearchParams(window.location.search.substring(1)); // this doesnt like question marks
    var urlParamsFiltered = Array.from(urlParams.entries()).filter(value => { // remove previous limit params
        if (value[0] == 'limit-yr') return false;
        else if (value[1].includes('yr,st-numeric')) return false;
        else return true; // only return true if above conditions are met
    });
    var urlParamString = urlParamsFiltered.map(function (value, key) { // generate new string for urlParams
        return value[0] + '=' + value[1];
    }).join('&');
    var inputFacet = $('input[name="limit-yr"]').val();

    // rebuild urlParams
    urlParams = new URLSearchParams(urlParamString);

    // do it
    urlParams.append('limit', 'yr,st-numeric=' + inputFacet); // add our years
    window.location.href = window.location.origin + window.location.pathname + '?' + urlParams.toString(); // lets go

    return;
}


//
// function to process publication date range submissions
function facetPublicationDateRangeResetHandler() {
    // vars
    var urlParams = Array.from(new URLSearchParams(window.location.search.substring(1)).entries()); // this doesnt like question marks
    var urlParamsFiltered = urlParams.filter(value => { // remove previous limit params
        if (value[0] == 'limit-yr') return false;
        else if (value[1].includes('yr,st-numeric')) return false;
        else return true; // only return true if above conditions are met
    });
    var urlParamString = urlParamsFiltered.map(function (value, key) { // generate new string for urlParams
        return value[0] + '=' + value[1];
    }).join('&');

    // rebuild urlParams
    urlParams = new URLSearchParams(urlParamString);

    // do it
    window.location.href = window.location.origin + window.location.pathname + '?' + urlParams.toString(); // lets go
    return;
}


//
// function to handle reservation link actions
function reservationLinkHandler() {
  $('a[href*="/cgi-bin/koha/opac-reserve.pl"]').on('click', function (event) {
    let thisUrl = $(this).attr('href');
    event.preventDefault();

    $('body').append('<div id=\"reserveModal\" class=\"modal show\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modalReserveLabel\" aria-modal=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h1 class=\"modal-title\" id=\"modalReserveLabel\">Place a request on this item?<\/h1><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"><\/button><\/div><div class=\"modal-body\"><p id=\"modalReserveDesc\">Please click Ok to progress with this request. Be sure to await an email from your local Library branch, before coming in.<\/p><\/div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-bs-dismiss=\"modal\">Cancel<\/button><a href=\"\" class=\"btn btn-primary\" aria-describedby=\"modalReserveDesc\">Ok<\/a><\/div><\/div><\/div><\/div>');

    $('#reserveModal').on('shown.bs.modal', function (event) {
      $('#reserveModal a').attr('href', thisUrl);
    });

    $('#reserveModal').on('hidden.bs.modal', function (event) {
      $('#reserveModal').remove();
    });

    $('#reserveModal').modal('show');
  });
}


// function to add proper tooltips to things
function addBootstrapTooltips() {
    $('body').find('*').each(function () {
        if ($(this).attr('title') != undefined) $(this).tooltip();
    });
}


//
// function to relabel save record links
function renameSaveRecord() {
    $('#export .dropdown-item').each(function () {
        // vars
        var thisText = $(this).text();

        $(this).text('Save to ' + thisText);
    });
}


//
// function to replace all instances of password with PIN
function replacePasswordWithPin() {
    // do most entries
    $('body :not(script)').contents().filter(function () {
        return this.nodeType === 3;
    }).replaceWith(function () {
        return this.nodeValue.replace('password', 'PIN');
    });

    // do the rest
    $('body :not(script)').contents().filter(function () {
        return this.nodeType === 3;
    }).replaceWith(function () {
        return this.nodeValue.replace('Password', 'PIN');
    });

    // tidy-up
    $('input[value="Change password"]').val('Change PIN');

}


//
// function to map handlers to observeDisableClassChange
function handleDisableClassChange() {
    const controls = $(
        '.selections-toolbar .links a, .selections-toolbar .links input, .selections-toolbar .links select, .selections-toolbar .links label, .selections-toolbar .links button'
    );

    // apply observer, if possible
    controls.each((idx, control) => {
        if ($(control).hasClass('disabled'))
          $(control).attr('tabindex', '-1');

        observeDisableClassChange($(control)[0]);
    });

    return;
}


//
// function to observe and act upon disable class changes
function observeDisableClassChange(element) {
    // the observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(function(mutation) {
            let attributeValue = $(mutation.target).prop(mutation.attributeName);
            if (attributeValue.indexOf('disabled') > -1)
              $(mutation.target).attr('tabindex', '-1');
            else
              $(mutation.target).removeAttr('tabindex');
        });
    });

    // trigger observation
    observer.observe(element, {
        attributes: true,
        attributeFilter: ['class']
    });

    return;
}
