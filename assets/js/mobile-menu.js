;(function($) {

  $(document).ready(function() {

   //mobile-wrap
    const mobile_nav_open = $('.mobile-nav-icon');
    const mobile_sidebar = $('.mobile-sidebar');
    const mobile_nav_close = $('.menu-close');
    let body_overlay = $('.body-overlay');
    if(body_overlay.length === 0){
      body_overlay = $('<div class="body-overlay"></div>').appendTo('body');
    }

    const openMobileMenu = function(){
      mobile_sidebar.addClass('mobile-menu-active');
      $('body').addClass('overflow-hidden');
      body_overlay.addClass('active');
    };
    const closeMobileMenu = function(){
      mobile_sidebar.removeClass('mobile-menu-active');
      $('body').removeClass('overflow-hidden');
      body_overlay.removeClass('active');
    };

    mobile_nav_open.on('click', function(){
      openMobileMenu();
    });

    mobile_nav_close.on('click', function(){
      closeMobileMenu();
    });
    body_overlay.on('click', function(){
      closeMobileMenu();
    });



  //mobile-menus
  $('.mobile-nav a').each(function(){
    var href = $(this).attr('href');
    if(href = '#'){
      $(this).addClass('hash-nav')
    }else {
      $(this).removeClass('hash-nav')
    }
  });


  //mobile-menus-markup
  $.fn.menumarker = function(options){
    mobile_menu = $(this),
    settings = $.extend({
      format: "dropdown",
      sticky: false
    }, options);


    return this.each(function(){
      mobile_menu.find('li ul').parent().addClass('has-sub');
      var multiTg = function(){
        mobile_menu.find('.hash-nav').parent().addClass('hash-has-sub');
        mobile_menu.find(".has-sub").prepend('<span class="submenu-button"><em></em></span>');
        mobile_menu.find('.submenu-button').on('click', function(){
          $(this).toggleClass('submenu-opened');
            if ($(this).siblings('ul').hasClass('open-sub')) {
                $(this).siblings('ul').removeClass('open-sub').hide('fadeIn');
                $(this).siblings('ul').hide('fadeIn');
            } else {
                $(this).siblings('ul').addClass('open-sub').hide('fadeIn');
                $(this).siblings('ul').slideToggle().show('fadeIn');
            }
        });
      };

      if (settings.format === 'multitoggle') multiTg();
      else mobile_menu.addClass('dropdown');
      if (settings.sticky === true) mobile_menu.css('position', 'fixed');
      var resizeFix = function () {
          if ($(window).width() > 991) {
              mobile_menu.find('ul').show('fadeIn');
              mobile_menu.find('ul.sub-menu').hide('fadeIn');
          }
      };
      resizeFix();
      return $(window).on('resize', resizeFix);

    })

  }


    $('.mobile-nav').menumarker({
      format: "multitoggle"
    });
   

  });





})(jQuery);

