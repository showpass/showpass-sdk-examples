// JavaScript Document

jQuery(document).ready(function( $ ) {
	
	// COLUMNIZER
	var jqwidth = $(window).width();
	if(jqwidth < 767){
		$('.content_box#footer .columns').columnize({width:140, accuracy : 1, lastNeverTallest:false});
	} else {
		$('.content_box#footer .columns').columnize({width:180, accuracy : 1, lastNeverTallest:true});
	}
	
	// Fotorama Nav & scrollbars Include
	//var jsbase = 'http://localhost:8888/tibp/wp-content/themes/tibp/js/'; // LOCAL
	var jsbase = 'http://' + document.domain + '/wp-content/themes/tibp/js/'; // TIBP SERVER
	$.getScript(jsbase + 'fotorama_nav.js'); // edit this file to adjust Fotorama Nav
	$.getScript(jsbase + 'scrollbars.js'); // edit this file to adjust list scrollbars
	
// AJAX TABS

var $contentHolder;
	el = '';
	tablink = $(".tab_nav li#tablink a");
	$ajaxSpinner = $(".loader");
	//templateURL = 'http://localhost:8888/tibp/wp-content/themes/tibp/'; // LOCAL
	templateURL = 'http://' + document.domain + '/wp-content/themes/tibp/'; // TIBP SERVER
	base = templateURL + 'includes/';
	if(is_mobile == 'yes'){
		moreTagScript = '<script src="' + templateURL + '/js/moretag_mobile.js"></script>';
	} else {
		moreTagScript = '<script src="' + templateURL + '/js/moretags.js"></script>';
	}
	
	fotoramaNav = '<script src="' + templateURL + 'js/fotorama_nav.js"></script>';
	scrollScript = '<script src="' + templateURL + 'js/scrollbars.js"></script>';
	listLinks = '<script src="' + templateURL + 'js/listlinks.js"></script>';
	prevNext = '<script src="' + templateURL + 'js/prevnext.js"></script>';
	corporateJS = '<script src="' + templateURL + 'js/corporate_site.js"></script>';
	
	/*hoverscroll = '<script src="' + templateURL + 'js/jquery.hoverscroll.js"></script>';*/
	
	siteURL = 'http://localhost:8888/tibp'; //LOCAL
	//siteURL = document.domain; // TIBP SERVER
	
	// Tab clicks
	$(tablink).on('click', function(e){
		e.preventDefault();
		
		$el = $(this); // Caching
		
		$el.parents('.tab_nav').find(".active").removeClass("active");
		$el.parent().addClass("active");

		var section = $el.attr('href');
		var category = $el.attr('name');
		var sitepage = $el.attr('rel');
			if (sitepage === 'undefined') { sitepage = '' }
			sitepage_var = ''; // define this below where we need it otherwise leave it blank
		var theFile = '';
		
		if (category == "news"){
			$contentHolder = $('.content_box .news_holder');
			theFile = 'news';
			$ajaxSpinner = $(".loader");
		} 
		if (section == "galleries"){ // for Galleries, section = galleries, category = cat name
			if(sitepage != 'main') {
				if (category == 'soundcloud') { category = 'music'; }
			}
			$contentHolder = $('.content_box#galleries #box_content');
				theFile = section + '-' + category + '-' + sitepage;
				if(category == 'photos'){ 
					theFile = 'galleries-photos_default-home'
					sitepage_var = '&sitepage=home'
				}
				if(sitepage == 'main') {
					$contentHolder = $('.content_box#galleries_list .gallerylist_wrapper#main');
					theFile = 'galleries-list-main';
					$galleryHolder = $('.content_box#galleries .gallery_holder');
					musicBG = 'url(' + templateURL + 'images/bg_music.jpg)';				
					if(category == 'photos'){
						//galleryFile = 'galleries-the_photos-main';
						galleryFile = 'galleries-the_photos-default';
						sitepage_var = '&sitepage=main'
					} else if(category == 'videos'){
						galleryFile = 'galleries-the_video-main';
					} else if(category == 'soundcloud'){
						galleryFile = 'galleries-the_music-main';
					}
				}
		}
		if (category == "events"){
			$contentHolder = $('.content_box#events .events_holder');
			theFile = 'events';
		}
		if (category == "properties"){
			$contentHolder = $('.content_box .properties_holder');
			theFile = 'properties';
			$ajaxSpinner = $(".loader");
		}
		if (category == "corporate"){
			$contentHolder = $('.content_box .info_holder#corporate');
			theFile = category + '-' + section;
			$ajaxSpinner = $(".loader#black");
			headerHolder = $('.corporate_header');
			headerSpinner = $(".loader#header");
		}
		if (category == "packages"){
			$contentHolder = $('.content_box .packages_holder');
			theFile = 'packages';
			$ajaxSpinner = $(".loader");
		}
		
		$contentHolder.animate({opacity : '0.0'});
		$ajaxSpinner.fadeIn('fast');
		setTimeout(function() {
			if (sitepage != 'main' && category != 'corporate'){ 
				$contentHolder.load(base + theFile + '.php?tab=y&section=' + section + '&category=' + category + sitepage_var, function(){
					$contentHolder.scrollTo( '0px', 250 );						
					if(category == 'photos'){
						//$('.fotorama--wp').fotoramaWPAdapter().fotorama(window.fotoramaDefaults);
						//$contentHolder.append(fotoramaNav);
					}
					if(category == 'properties'){
						$('.fotorama--wp').fotoramaWPAdapter().fotorama(window.fotoramaDefaults);
					}
					if(category != 'properties'){
						$contentHolder.append(moreTagScript);
						$contentHolder.append(scrollScript);
						$contentHolder.append(listLinks);
					}
					$ajaxSpinner.fadeOut('fast');
					$contentHolder.animate({opacity : '1'});
				});
			
			} else if (category == 'corporate'){ // CORPORATE tabs
				headerHolder.animate({opacity : '0.0'});
				headerSpinner.fadeIn('fast');
				$contentHolder.load(base + theFile + '.php?tab=y', function(){
					if (section == 'media' || section == 'careers') { $contentHolder.append(corporateJS); }
					if(section == 'media' && jqwidth < 767){ $contentHolder.append(scrollScript); }
					$ajaxSpinner.fadeOut('fast');
					$contentHolder.animate({opacity : '1'});
				});
				headerHolder.load(base + 'corporate-header.php?tab=y&section=' + section, function(){
					headerSpinner.fadeOut('fast');
					headerHolder.animate({opacity : '1'});
				});
			
			} else {
				if((category == 'photos') || (category == 'videos') || (category == 'soundcloud')){
					$galleryHolder.animate({opacity : '0.0'});
						$galleryHolder.load(base + galleryFile + '.php?tab=y' + sitepage_var, function(){
							if(category == 'photos'){
								//$('.fotorama--wp').fotoramaWPAdapter().fotorama(window.fotoramaDefaults);
								//$galleryHolder.append(fotoramaNav);
								$galleryHolder.append(listLinks);
							}
							if(category == 'soundcloud'){
								$('.content_box#galleries').css({'background-image': musicBG });
							} else if ((category == 'photos') || (category == 'videos')){
								$('.content_box#galleries').css({'background-image': 'none'});
							}
							$galleryHolder.animate({opacity : '1'});
							$galleryHolder.append(prevNext);
						});
				}				
				$contentHolder.load(base + theFile + '.php?category=' + category, function(){
					if(jqwidth < 767){ $contentHolder.append(scrollScript); }
					$contentHolder.append(moreTagScript);
					$contentHolder.append(listLinks);
					$ajaxSpinner.fadeOut('fast');
					$contentHolder.animate({opacity : '1'});
				});
			}
		},250);
	});
	
	// AJAX Gallery List Links
	$.getScript(jsbase + 'listlinks.js'); // edit this file to adjust List Links
	
	// AJAX Prev_Next Links
	$.getScript(jsbase + 'prevnext.js'); // edit this file to adjust Prev Next Links
	
	// AJAX SEARCH
	//$.getScript(jsbase + 'search.js'); // edit this file to adjust Ajax Search results
});