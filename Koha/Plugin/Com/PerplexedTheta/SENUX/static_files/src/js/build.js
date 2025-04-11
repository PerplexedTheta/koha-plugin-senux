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


//
// function to change where we scroll to
function scrollToThis(element) {
	// make scroll to content go to search box
	$('#scrolltocontent').off(); // disable other event listners
	$("#scrolltocontent").click(function (event) {
		event.preventDefault();

		var content = $(element); // based on passed param
		if (content.length > 0) { // jump to element
			$('html,body').animate({
				scrollTop: content.first().offset().top
			}, 'slow');

			content.first().find(':focusable').eq(0).focus(); // focus it
		}
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
		if ($(this).val() == 'catalogue') searchCatalogue(altSearchName);
		else if ($(this).val() == 'ebsco') searchEbsco(); // if the user picks ebsco
	});
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

	// dropdown config
	if (altSearchName == 'explorit') {
		$('#masthead_search').append($('<option>', { // explorit option
			value: 'explorit',
			text: 'explorit'
		}));
	}
	if (altSearchName == 'ebsco') {
		$('#masthead_search').append($('<option>', { // explorit option
			value: 'ebsco',
			text: 'Search Plus'
		}));
	}
	$('#masthead_search').append($('<option>', { // catalogue option
		value: '',
		text: 'Search Catalogue',
		selected: 'selected'
	}));
}


//
// masthead seach pulldown changes -- search catalogue
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
	$('#masthead_search').before('<input name=\"custid\" value=\"s4501996\" type=\"hidden\" \/>');
	$('#masthead_search').before('<input name=\"groupid\" value=\"main\" type=\"hidden\" \/>');
	$('#masthead_search').before('<input name=\"profid\" value=\"eds\" type=\"hidden\" \/>');
	$('#masthead_search').before('<input name=\"scope\" value=\"site\" type=\"hidden\" \/>');
	$('#masthead_search').before('<input name=\"site\" value=\"eds-live\" type=\"hidden\" \/>');
	$('#masthead_search').before('<input name=\"direct\" value=\"true\" type=\"hidden\" \/>');
	$('#select_library').attr('name', '');
	$('#select_library').parent().css('display', 'none'); // hide library pulldown
	$('input[name="weight_search"]').remove(); // nuke weight_search

	// dropdown config
	$('#masthead_search').append($('<option>', { // catalogue option
		value: 'catalogue',
		text: 'Search Catalogue'
	}));
	$('#masthead_search').append($('<option>', { // ebsco option
		value: 'ebsco',
		text: 'Search Plus',
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
// function to enable autocompletion from wikipedia
function wikiAutocomplete() {
	$('#translControl1').autocomplete({
		source: function (request, response) {
			$.ajax({
				url: 'https://en.wikipedia.org/w/api.php',
				dataType: 'jsonp',
				data: {
					'action': 'opensearch',
					'format': 'json',
					'search': request.term
				},
				success: function (data) {
					response(data[1]);
				}
			});
		}
	});
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
	$('a[href="#facetAllClear"]').on('click', function (event) {
		event.preventDefault();

		window.location.href = 'https://' + window.location.hostname + '/cgi-bin/koha/opac-search.pl?q=' + q;
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
	$('#search-facets ul:first').append('<li id=\"yr_id\"><h3 id=\"facet-yr\"><a href=\"#expandFacet\">Publication date range<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"><\/i><\/a><\/h3> <div style=\"display:none\"><input name=\"limit-yr\" type=\"text\" class=\"mt-4\"><p class=\"hint pt-2\">For example: 1999-2001<\/p><p id=\"limit-yr-err\" class=\"hint pt-2\" style=\"display:none;color:red\">Please check you entered two valid years<\/p><a href=\"#facetYrRefine\" class=\"btn btn-primary mt-2\">Refine by date<\/a><\/div><\/li>');

	// then handle clicks
	$('#facet-yr a').on('click', function (event) {
		event.preventDefault(); // disable usual behaviour
		event.stopImmediatePropagation();

		if ($(this).parents('h3').siblings('div').css('display') == 'none') $(this).parents('h3').siblings('div').show(); // see facetAccordeon for how this code works
		else $(this).parents('h3').siblings('div').hide();

		$(this).find('i.fa').toggleClass('fa-chevron-down');
		$(this).find('i.fa').toggleClass('fa-chevron-left');
	});

	if (urlFacetSet) {
		$('input[name="limit-yr"]').val(urlFacet);
		$('a[href="#facetYrRefine"]').after('<a href=\"#facetYrClear\" class=\"btn btn-danger mt-2\">Clear date refinement [x]<\/a>'); // add clear button
		$('#facet-yr a').click(); // we want to show the user the facet, you see
	}

	$('a[href="#facetYrRefine"]').on('click', function (event) {
		event.preventDefault();

		facetPublicationDateRangeSubmitHandler();
	});
	$('a[href="#facetYrClear"]').on('click', function (event) {
		event.preventDefault();

		facetPublicationDateRangeResetHandler();
	});
	$('input[name="limit-yr"]').on('keyup', function (event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			event.preventDefault();

			facetPublicationDateRangeSubmitHandler();
		}
	});

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
	window.location.href = 'https://' + window.location.hostname + window.location.pathname + '?' + urlParams.toString(); // lets go

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
	window.location.href = 'https://' + window.location.hostname + window.location.pathname + '?' + urlParams.toString(); // lets go
	return;
}


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


	// Pedro - move copyright disclaimer button
	const url = window.location.href;
	if (url.includes('cgi-bin/koha/opac-illrequests.pl?method=create&backend=FreeForm')) {
		const buttons = document.querySelectorAll('.btn-sm');
		const yesAgreePara = document.querySelector('#show_after');

		if (buttons.length < 2) {
			return;
		}

		if (!yesAgreePara) {
			return;
		}

		yesAgreePara.parentNode.insertBefore(buttons[0], yesAgreePara);
		yesAgreePara.parentNode.insertBefore(buttons[1], yesAgreePara);
		yesAgreePara.style.marginTop = '10px';
	}

}  
