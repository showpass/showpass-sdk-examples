jQuery(document).ready(function( $ ) {
	// show hide More Tags list	
	
	  var more_tags_hidden = true;
	  $(".tag_num_more").on('mouseover',function(e){
		  e.preventDefault();
		  
		  $(this).find(".more_holder").fadeIn("fast");
		  $(this).find(".more_holder").position({
			  my:        "right+24 bottom",
			  at:        "left top",
			  of:        this, // or $("#otherdiv)
			  collision: "flip"
		  })
		  more_tags_hidden = false;
	  });

	  $(".tags_list").on('mouseleave', function(){
		  if(more_tags_hidden==false){
				  $(this).find(".more_holder").fadeOut("fast");
				  more_tags_hidden = true;
		  }
	  });
	  
	var more_tags_hidden = true;
    $(".gallerylist .tag_num_more").mouseover(function(e){
		e.preventDefault();
		
		$(this).find(".gallerylist .more_holder").fadeIn("fast");
		$(this).find(".more_holder").position({
			of: 		$(this).parent("#parent"),
			my:        "right+2 top",
			at:        "right bottom",
			collision: "flip"
		})
		more_tags_hidden = false;
	});
	
	// Search Results
	  $(".search_result .tag_num_more").on('mouseover',function(e){
		  e.preventDefault();
		  
		  $(this).find(".search_result .more_holder").fadeIn("fast");
		  $(this).find(".more_holder").position({
			  my:        "right+2 top",
			  at:        "right bottom",
			  of:        this, // or $("#otherdiv)
			  collision: "fit"
		  })
		  more_tags_hidden = false;
	  });
});