$(document).ready(function($) {

    var $navBar = $('.header__nav-bar-container');
    var $navMenu = $('.header__main-nav');
    var $sections = $('.section');
    var $topArrow = $('.top-arrow');
    var headerHeight = $('.header').height();
    var $mobileMenuButton = $('.mobile-menu-button');
    // var $skillsSection = $('.normal-section--skills');
    // var $skillsBars = $('.skill-collapsed');

    var stickyHeaderBreakpoint = 750;

    $navBar.on('click', '.header__nav-item', function(event) {
        event.preventDefault();

        var $clickedLink = $(event.currentTarget);
        var destinationID = $clickedLink.data('destination');
        var $correspondingSection = $(".section").filter("[data-destination='" + destinationID + "']");

        $('body, html').animate({
            scrollTop: $correspondingSection.offset().top - 80
        }, 1000);
    });

    //top arrow
    $topArrow.on("click", function(event) {
      $('body, html').animate({
          scrollTop: 0
      }, 1000);
    });


    window.addEventListener("scroll", throttle(menuStyleCallback, 1));
    window.addEventListener("resize", menuStyleCallback);

    function menuStyleCallback(event) {
        if(document.body.scrollTop > headerHeight || $(document).scrollTop() > headerHeight) {
            //show top arrow
            $topArrow.addClass('top-arrow--shown');
        } else {
            //hide top arrow
            $topArrow.removeClass('top-arrow--shown');
        }

        if(window.innerWidth > stickyHeaderBreakpoint) {
            if(document.body.scrollTop > headerHeight || $(document).scrollTop() > headerHeight) {
                //make menu sticky
                $navBar.css({
                    position: 'fixed',
                }).addClass('slide-in');
                $navBar[0].style.position = "fixed";
                $navBar[0].classList.add("slide-in");
            } else {
                //unstick menu
                $navBar.removeClass('slide-in');

                setTimeout(function() {
                    $navBar.css({
                        position: 'static'
                    });
                }, 100);
            }
        } else {
            //screen is small, reset everything
            $navBar.css({
                position: 'fixed'
            });
            $navBar.removeClass('slide-in');
        }

        //expand skills
        // if(document.body.scrollTop > $skillsSection.offset().top - 150 || $(document).scrollTop() > $skillsSection.offset().top - 150) {
        //    $skillsBars.removeClass('skill-collapsed');
        // }
    }

    //sticky menu
    //throttling function
    function throttle(fn, wait) {
      "use strict";
      var time = Date.now();
      return function() {
        if ((time + wait - Date.now()) < 0) {
          fn();
          time = Date.now();
        }
      };
    }

    //handle mobile menu button
    $mobileMenuButton.on('click', function(event) {
        event.preventDefault();

        //toggle classes
        $(this).toggleClass("mobile-menu-button--slide-away");
        $navBar.toggleClass("mobile-slide-in");
    });
});
