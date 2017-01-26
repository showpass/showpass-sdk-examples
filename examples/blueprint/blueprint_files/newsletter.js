jQuery(document).ready(function( $ ) {	
	// start NEWSLETTER Show/Hide
	nl_hidden = true;
	duration = 300;		
	$('#show_subscribe').on('click',function(){
		if(nl_hidden==true){
			$('.subscribe_box').animate({top:"30px"}, duration);
			$('#show_subscribe').animate({"padding-bottom" : "5px"}, duration);
			setTimeout(function() {
			nl_hidden = false;
			250;
		});
		}
	});
	var subscribe_hide = function(){
		$('.subscribe_box').animate({top:"-86px"}, duration);
		$('#show_subscribe').animate({"padding-bottom" : "0px"}, duration);
		setTimeout(function() {
			nl_hidden = true;
			250;
		});
	}
	$('#show_subscribe').on('click',function(){
		if(nl_hidden==false){
			setTimeout(subscribe_hide, 500)
		}
	});
	
	$(document).mouseup(function (e){
		var subscribe_box = $(".subscribe_box"); // the container
		if(nl_hidden==false){
			if (!subscribe_box.is(e.target) // if the target of the click isn't the container...
				&& subscribe_box.has(e.target).length === 0) // ... or a descendant of the container
			{
				$('.subscribe_box').animate({top:"-86px"}, duration);
				$('#show_subscribe').animate({"padding-bottom" : "0px"}, duration);
			}
			setTimeout(function() {
				nl_hidden = true;
				500;
			});
		}
	});// END Newsletter show/hide
});