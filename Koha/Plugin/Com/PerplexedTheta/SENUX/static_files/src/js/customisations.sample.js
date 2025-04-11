/*!
  WELCOME TO SENUX! VER. 2311-05 -- PLEASE READ CAREFULLY!

  THIS FILE EXISTS AS A TEMPLATE FOR YOU TO COPY INTO THE OPACUSERJS AND
  CUSTOMISE AS YOU SEE FIT. PLEASE DISREGARD THE LICENCE ABOVE - THIS EXISTS
  ONLY TO PROTECT THE FILE IN THE GIT REPOSITORY. COPY EVERYTHING FROM LINE 37
  ONWARDS INTO OPACUSERJS AND HAVE AT IT!

  HAVE A GOOD DAY - BUENOS DIAS - GUTEN TAG - BONNE JOURNEE - BUONA GIORNATA
*/

/*!
  -----------------------------------------
  PLACE YOUR OPACUSERJS CUSTOMISATIONS HERE
  -----------------------------------------
*/

// you may proceed

document.addEventListener('DOMContentLoaded', function(event) {
	// Insert your user customisations for JavaScript below this line
	// Some useful custom values and functions have been included for you

	// vars
	var baseLang = $('html').attr('lang');
	var baseHost = window.location.hostname;
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
	if($('#user-menu').hasClass('dropdown-toggle') == false) $('.userlabel').text('Log in');

	// remove cart notice
	$('#cartDetails').remove();

	// set searchbar text label
	$('#opac-main-search label').text('Catalogue Search');

	// login modal - shibboleth
	// comment this out if you don't use saml
	/*
	$('#opac-auth > h2:contains("Shibboleth Login")').text('Academic student or staff?');
	$('#opac-auth > p:contains("Log in using a Shibboleth account.")').html('<a href=\"\/Shibboleth.sso\/Login?target=https:\/\/' + window.location.hostname + window.location.pathname + window.location.search + '\" class=\"btn btn-primary\">Go to Institutional login &raquo;<\/a>');
	$('#opac-auth > h2:contains("Local login")').text('Academic partner or public user?');
	$('#opac-auth > p:contains("If you do not have a Shibboleth account")').text('If you do not have an Institution account, then you may login below.');
	$('#loginModal').html('<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h2 class=\"modal-title\" id=\"modalLoginLabel\">Log in to your account<\/h2><button type=\"button\" class=\"closebtn\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">\u00D7<\/span><\/button><\/div><div id=\"modalAuth\" class=\"modal-body\"><h3>Academic student or staff?<\/h3><p><a href=\"\/Shibboleth.sso\/Login?target=https:\/\/' + window.location.hostname + window.location.pathname + window.location.search + '\" class=\"btn btn-primary\">Go to Institutional login &raquo;<\/a><\/p><h3>Academic partner or public user?<\/h3><p><a href=\"\/cgi-bin\/koha\/opac-user.pl\" class=\"btn btn-primary\">Go to local Koha login &raquo;<\/a><\/p><\/div><\/div><\/div>');
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

	// explorit / ebsco masthead pulldown handler
	//mastheadEventHandler('explorit');
	//searchCatalogue('explorit');

	// enable tooltipping on the search pulldown
	searchDropdownTooltipHandler();

	// enable proper dropdown selection
	//searchDropdownBranchHandler();

	// add basket link handler
	basketLinkHandler();

	// reservation link handler
	reservationLinkHandler();

	// rename 'save records'
	renameSaveRecord();

	// add authority record alt text & tooltips
	$('a.authlink').attr('alt','View authority record');
	$('a.authlink').attr('title','View authority record');

	// remove ics links
	//$('#buttons-ics').remove();

	// remove 'powered by koha' regardless of syspref
	$('#koha_url').remove();


	//
	// page-specific logic


	//
	// mobilc-specific logic

});


window.addEventListener("load", (event) => {
	// add tooltips
	addBootstrapTooltips();
});
