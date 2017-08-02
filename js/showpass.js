// JavaScript Document

//SHOWPASS SDK
(function (window, document, src) {
      var config = window.__shwps;
      if (typeof config === "undefined") {
        config = function () {
          config.c(arguments);
        };
        config.q = [];
        config.c = function (args) {
          config.q.push(args);
        };
        window.__shwps = config;

        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = src;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }
    })(window, document, 'https://beta.myshowpass.com/static/dist/sdk.js');

jQuery.noConflict();

(function($) {

	$(window).on('load', function() {
		showpass.tickets.addCartCountListener(function (count) {
			if (count > 0) {
				var html = 'Cart ('+count+')';
				Cookies.set('cart', html);
				$('.menu-item-449 a span').html('Cart ('+count+')');
			}
			else {
				var html = 'Cart';
				Cookies.set('cart', html);
				$('.menu-item-449 a span').html('Cart');
			}
		});
	});

  $(document).on('ready', function() {
  if (Cookies.get('cart')) {
	  $('.menu-item-449 a span').html(Cookies.get('cart'));
	}

    $('li.menu-item-449').on('click', function(e){
      e.stopPropagation();
      e.preventDefault();
      console.log('click');
      showpass.tickets.checkoutWidget({
        'theme-primary': '#9e2a2b',
        'keep-shopping': true
      });
    });

    $('code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });

})(jQuery);
