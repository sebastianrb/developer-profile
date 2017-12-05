// (function() {

//     //cache DOM elements
//     var carouselContainer = document.querySelector(".project-descriptions-container");
//     var buttonsContainer = document.querySelector(".project-descriptions-container__project-buttons");
//     var descriptionsContainer = document.querySelector(".project-descriptions-container__project-descriptions");

//     var projectButtons = Array.from(document.querySelectorAll(".project-descriptions-container__project-button"));
//     var projectDescriptions = Array.from(document.querySelectorAll(".project-descriptions-container__project-description"));


//     //assign event listeners to buttons
//     projectButtons.forEach( function(element, index) {
//         element.addEventListener("click", makeSelected);
//         element.addEventListener("click", changeDescription);
//     });

//     // window.addEventListener("resize", resizeContainer);


//     function makeSelected(event) {
//         var clickedButton = this;

//         //remove selected class from all other buttons
//         projectButtons.forEach( function(element, index) {
//             element.classList.remove("selected-disabled");
//             element.classList.remove("selected");
//         });

//         clickedButton.classList.add("selected-disabled");
//         clickedButton.classList.add("selected");
//     }

//     function changeDescription(event) {
//         var clickedButton = this;

//         //get project ID
//         var selectedProjectID = clickedButton.dataset.projectId;

//         //find matching description panel
//         var matchingDescription;
//         projectDescriptions.forEach( function(element, index) {
//             element.classList.remove("description-selected");
//             if(element.dataset.projectDescriptionId === selectedProjectID) {
//                 matchingDescription = element;
//             }
//         });

//         matchingDescription.classList.add("description-selected");

//         // resizeContainer();
//     }

//     //when on small screens, adjust height of container when project is clicked or screen resizes

//     // function resizeContainer() {
//     //     if(window.innerWidth < 851) {
//     //         //calculate height of container contents using offsetHeight
//     //         var buttonContainerHeight = buttonsContainer.offsetHeight;
//     //         console.log(buttonContainerHeight);
//     //         var descriptionsContainerHeight = descriptionsContainer.offsetHeight;
//     //         console.log(buttonContainerHeight);
//     //         // var containerPaddingOffset = 40;
//     //         // var buttonsPaddingOffset = 50;
//     //         // var descriptionsPaddingOffset = 40;

//     //         // var totalOffset = buttonContainerHeight + descriptionsContainerHeight;

//     //         // console.log(totalOffset);
//     //         // // carouselContainer.style.height = totalOffset;
//     //     }
//     // }

// })();
