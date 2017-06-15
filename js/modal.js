jQuery(document).ready(function($) {

    var $modal = $('.image-modal');
    var $imageGrid = $('.section--about-me__image-grid');
    var $imageGridContainers = $(".section--about-me__image-grid-container");
    var $modalImageContainer = $('.image-modal__modal-image');
    var $modalText = $('.image-modal__modal-text-content');
    var $modalCloseButton = $(".image-modal__close-modal");
    var gridImages = Array.from(document.querySelectorAll(".section--about-me__image-grid-container"));
    var mainElement = document.getElementsByTagName("main")[0];
    var rightNavArrow = document.querySelector(".image-modal__image-navigation-arrow.right-arrow");
    var leftNavArrow = document.querySelector(".image-modal__image-navigation-arrow.left-arrow");
    var selectedImageID;
    var body = document.body;
    var $imageClone;
    var $matchedGridImage;


    // console.log(rightNavArrow);

    var modalOpenTimeline = new TimelineMax();
    var modalCloseTimeline = new TimelineMax();

    $imageGrid.on('click', ".section--about-me__image-grid-container", function(event) {
        event.preventDefault();
        var $clickedImage = $(event.currentTarget);
        // console.log($clickedImage);

        //get currentImageID;
        selectedImageID = gridImages.indexOf($clickedImage[0]);
        // console.log("Selected Image ID: ", selectedImageID);
        // console.log(gridImages[selectedImageID].querySelector(".section--about-me__image-grid-image"));

        //get clone of inner image
        $imageClone = $clickedImage.find("img").clone();
        $imageClone.addClass('image-clone');
        // console.log($imageClone);

        //populate description
        $modalText.text(imageDescriptions[selectedImageID + 1]);

        //get clicked image measurements
        var clickedImageMeasurements = $clickedImage.find("img")[0].getBoundingClientRect();
        // console.log(clickedImageMeasurements);

        $imageClone.css({
            position: "fixed",
            // objectFit: "contain",
            objectFit: "cover",
            top: clickedImageMeasurements.top,
            left: clickedImageMeasurements.left,
            width: clickedImageMeasurements.width,
            height: clickedImageMeasurements.height,
            zIndex: 120
        });

        $('main').append($imageClone);

        $imageClone[0].style.display = 'none';
        setTimeout(function() {
            $imageClone[0].style.display = 'block';
        }, 10);

        showModal();

    });


    $modalCloseButton.on('click', function(event) {
        event.preventDefault();

        //get imageClone href
        var modalImageHREF = $imageClone.attr('src');

        //find image in grid with same href
        $imageGridContainers.each(function(index, element) {
            if($(element).find("img").attr("src") === modalImageHREF) {
                $matchedGridImage = $(element);
            }
        });

        // console.log($matchedGridImage);

        hideModal();
    });

    //show modal
    function showModal() {

        var modalImageMeasurements = $modalImageContainer[0].getBoundingClientRect();
        // console.log(modalImageMeasurements);

        modalOpenTimeline.to($modal, .6, {
            className: "+=image-modal--shown"
        });

        modalOpenTimeline.add(function() {
            $(".header__nav-bar-container").addClass('faded-for-modal');
        }, "-=.5");


        //move image clone over modal image container
        modalOpenTimeline.to($imageClone, .9, {
            // ease: Power1.easeOut,
            ease: Power1.easeInOut,
            top: modalImageMeasurements.top + 20,
            left: modalImageMeasurements.left,
            width: modalImageMeasurements.width,
            height: modalImageMeasurements.height
            // padding: "5px",
            // background: "#f94c0c"
            // background: "rgb(167, 68, 31)"
        }, "-=.2");

        //animate in description text
        modalOpenTimeline.to($modalText, .7, {
            className: "+=image-modal__modal-text-content--shown"
        });

        //animate in description text
        modalOpenTimeline.to($modalCloseButton, .5, {
            pointerEvents: "none",
            className: "+=image-modal__close-modal--shown"
        }, "-=.3");

        modalOpenTimeline.to($modalCloseButton, .1, {
            pointerEvents: "auto"
        }, "+=.5");

        modalOpenTimeline.add(function() {
            body.style.overflowY = "hidden";
        });
    }

    function hideModal() {

        //matched grid image measurements
        var matchedGridImageMeasurements = $matchedGridImage[0].getBoundingClientRect();
        // console.log(matchedGridImageMeasurements);

       // // scroll to position of current image on grid
       window.scrollTo(0, (matchedGridImageMeasurements.top + window.pageYOffset - 250));

       matchedGridImageMeasurements = $matchedGridImage[0].getBoundingClientRect();

       modalCloseTimeline.add(function() {
            body.style.pointerEvents = "none";
       });

        //animate out description text
        modalCloseTimeline.to($modalText, .7, {
            className: "-=image-modal__modal-text-content--shown"
        });

        //animate in description text
        modalCloseTimeline.to($modalCloseButton, .7, {
            className: "-=image-modal__close-modal--shown"
        }, "-=.7");



        //move image clone over grid image
        modalCloseTimeline.to($imageClone, .5, {
            ease: Power1.easeInOut,
            top: matchedGridImageMeasurements.top,
            left: matchedGridImageMeasurements.left,
            width: matchedGridImageMeasurements.width,
            height: matchedGridImageMeasurements.height,
            boxShadow: "0 0 0 0 transparent"
            // padding: "0"
        }, "-=.2");


        modalCloseTimeline.add(function() {
            $(".header__nav-bar-container").removeClass('faded-for-modal');
        }, "-=.1");

        //hide modal
        modalCloseTimeline.to($modal, .7, {
            className: "-=image-modal--shown"
        }, "+=0");

        modalCloseTimeline.add(function() {
            $imageClone.remove();
            body.style.pointerEvents = "auto";
        });

        modalCloseTimeline.add(function() {
            body.style.overflowY = "scroll";
        }, "+=.3");
    }


    rightNavArrow.addEventListener("click", nextImage);
    leftNavArrow.addEventListener("click", previousImage);

    //modal image navigation

    //next image
    function nextImage(event) {
        //disable prev button until animation completes
        leftNavArrow.style.pointerEvents = "none";

        //create image clone with old image
        var oldImage = mainElement.querySelector(".image-clone");
        // console.log(oldImage);
        var lastImageClone = mainElement.querySelector(".image-clone").cloneNode(true);
        lastImageClone.classList.add("image-clone--last");
        //get dimensions of lastImage
        // var lastIMageMeasurements = oldImage.getBoundingClientRect();


        //style last image clone with high z-index
        lastImageClone.style.zIndex = "150";

        //append old image clone
        mainElement.appendChild(lastImageClone);

        oldImage.style.display = 'none';
        setTimeout(function() {
            oldImage.style.display = 'block';
        }, 0.5);

        //increment selected image ID by one; if at end, go back to beginning
        if(selectedImageID === gridImages.length - 1) {
            selectedImageID = 0;
        } else {
            selectedImageID++;
        }

        //get src of image with that ID
        var nextImageSrc = gridImages[selectedImageID].querySelector(".section--about-me__image-grid-image").getAttribute("src");

        //create image clone with old
        oldImage.setAttribute("src", nextImageSrc);

        // transition out old image clone
        setTimeout(function(){
            lastImageClone.classList.add("slide-out");
            $modalText.text(imageDescriptions[selectedImageID + 1]);
        }, 200);

        setTimeout(function() {
            lastImageClone.remove();
            leftNavArrow.style.pointerEvents = "auto";
        }, 1500);
    }

    //next image
    function previousImage(event) {
        //disable next button until animation completes
        rightNavArrow.style.pointerEvents = "none";

        //create image clone with old image
        var oldImage = mainElement.querySelector(".image-clone");
        // console.log(oldImage);
        var lastImageClone = mainElement.querySelector(".image-clone").cloneNode(true);
        // lastImageClone.classList.add("image-clone--last");
        lastImageClone.classList.add("image-clone--next");

        lastImageClone.classList.add("to-slide-in");

        //get dimensions of lastImage
        // var lastIMageMeasurements = oldImage.getBoundingClientRect();

        //style last image clone with high z-index
        lastImageClone.style.zIndex = "150";

        //append old image clone
        // mainElement.appendChild(lastImageClone);

        //increment selected image ID by one; if at end, go back to beginning
        if(selectedImageID === 0) {
            selectedImageID = gridImages.length - 1;
        } else {
            selectedImageID--;
        }

        //get src of image with that ID
        var nextImageSrc = gridImages[selectedImageID].querySelector(".section--about-me__image-grid-image").getAttribute("src");


        lastImageClone.setAttribute("src", nextImageSrc);

        mainElement.appendChild(lastImageClone);

        // lastImageClone.classList.remove("to-slide-in");
        //create image clone with old
        // oldImage.setAttribute("src", nextImageSrc);

        //transition out old image clone
        setTimeout(function(){
            // lastImageClone.classList.add("slide-out");
            lastImageClone.classList.remove("to-slide-in");
            $modalText.text(imageDescriptions[selectedImageID + 1]);
        }, 200);


        setTimeout(function(){
            oldImage.style.display = 'none';
            setTimeout(function() {
                oldImage.style.display = 'block';
            }, 0.5);
            lastImageClone.style.boxShadow = "0 0 0 0 transparent";
        }, 1100);

        setTimeout(function() {
            //create image clone with old
            oldImage.setAttribute("src", nextImageSrc);
            lastImageClone.remove();
            rightNavArrow.style.pointerEvents = "auto";
        }, 1500);
    }


    var imageDescriptions = {
        1: "My fiancée and me on a hike in Spain",
        2: "My brother and me on a hike in New Hampshire",
        3: "My friends and me after my first half marathon in Alexandria, VA",
        4: "My brother, friend, and me at a baseball game",
        5: "My friends and me doing a whiskey tasting in San Francisco",
        6: "Skiing with my fiancée in Vermont",
        7: "My mom, Kate, in Massachusetts",
        8: "Sailing in Connecticut",
        9: "My brother, uncle, and me in Spain",
        10: "My fiancée and me in San Francisco",
        11: "My brother and me on vacation in Spain",
        12: "Me and my brother at a wedding",
       13: "Me in Spain",
        14: "My friends, fiancée, and me on a hike in Upstate New York",
        15: "My friends and me on a ski trip in Lake Tahoe, California"
    };
});
