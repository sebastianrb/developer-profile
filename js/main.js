$(document).ready(function($) {
    //animate header on page load
    var $headerTitles = $(".header__titles");
    var $navBar = $('.header__nav-list ');
    var $headerPhotoInfo = $('.header .header__photo-info-button');
    var $header = $('.header');

    $header.removeClass("fade-in");

    $headerTitles.removeClass("load-hidden");
    $navBar.removeClass("load-hidden");
    $headerPhotoInfo.removeClass("load-hidden");

    //divider image info button
    var $infoButtons = $('.parallax-overlay__info-button');

    $infoButtons.on('mouseenter', function(event) {
        event.preventDefault();
        var $hoveredButton = $(this);
        $hoveredButton.parent().addClass("overlay-hidden");
    });

    $infoButtons.on('mouseleave', function(event) {
        event.preventDefault();
        var $hoveredButton = $(this);
        $hoveredButton.parent().removeClass("overlay-hidden");
    });

    $infoButtons.on('touchstart', function(event) {
        event.preventDefault();
        var $hoveredButton = $(this);
        $hoveredButton.parent().addClass("overlay-hidden");
    });

    $infoButtons.on('touchend', function(event) {
        event.preventDefault();
        var $hoveredButton = $(this);
        $hoveredButton.parent().removeClass("overlay-hidden");
    });
});
