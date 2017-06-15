(function() {
    //caceh DOM elements
    var carouselView = document.querySelector(".carousel--fade");
    var carouselSlides = Array.from(document.querySelectorAll(".carousel--fade__image-container"));
    var prevButton = document.querySelector(".carousel--fade__arrow-prev");
    var nextButton = document.querySelector(".carousel--fade__arrow-next");
    var navButtons = Array.from(document.querySelectorAll(".carousel--fade__nav-button"));
    var bullets = Array.from(document.querySelectorAll(".carousel--fade__bullet"));
    var selectedSlide;
    var selectedIndex;

    //find selected index based on which slide has the "selected" class
    for(var i = 0; i < carouselSlides.length; i++) {
        if(carouselSlides[i].classList.contains("carousel--fade__image-container-selected")) {
            selectedIndex = i;
        }
    }

    setBullet(selectedIndex);

    //set event handlers
    for(var i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener("click", _slideNavigation);
    }

    for(var i = 0; i < bullets.length; i++) {
        bullets[i].addEventListener("click", _bulletNavigation);
    }

    function _slideNavigation(event) {
        // if(event.target.classList.contains("carousel--fade__nav-button")) {
        //     var clickedElement = event.target;
        // }
        var clickedElement = event.currentTarget;
        // console.log(clickedElement);

        //handle nav button clicks
        if(clickedElement === nextButton) {
            //remove selected class from current slide
            carouselSlides[selectedIndex].classList.remove("carousel--fade__image-container-selected");

            //change selectedIndex
            //if there is another slide next
            if(carouselSlides[selectedIndex + 1]) {
                selectedIndex++;
            } else {
                selectedIndex = 0;
            }

            //add selected class to new slide
            carouselSlides[selectedIndex].classList.add("carousel--fade__image-container-selected");

            //set bullets
            setBullet(selectedIndex);

        } else if(clickedElement === prevButton) {
            //remove selected class from current slide
            carouselSlides[selectedIndex].classList.remove("carousel--fade__image-container-selected");

            //change selectedIndex
            //if there is another slide prev
            if(carouselSlides[selectedIndex - 1]) {
                selectedIndex--;
            } else {
                selectedIndex = carouselSlides.length - 1;
            }

            //add selected class to new slide
            carouselSlides[selectedIndex].classList.add("carousel--fade__image-container-selected");

            //set bullets
            setBullet(selectedIndex);
        }
    }

    function _bulletNavigation(event) {
        var clickedBullet = event.target;

        //remove selected class from current slide
        carouselSlides[selectedIndex].classList.remove("carousel--fade__image-container-selected");

        //set selected index
        for(var i = 0; i < bullets.length; i++) {
            if(bullets[i] === clickedBullet) {
                selectedIndex = i;
            }
        }

        //add selected class to new slide
        carouselSlides[selectedIndex].classList.add("carousel--fade__image-container-selected");

        setBullet(selectedIndex);
    }

    function setBullet(index) {
        bullets.forEach(function(item, index) {
            item.classList.remove("carousel--fade__bullet--bullet-selected");
            if(index === selectedIndex) {
                item.classList.add("carousel--fade__bullet--bullet-selected");
            }
        });
    }
})();
