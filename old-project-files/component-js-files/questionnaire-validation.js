// Global access to form node

var formElement = document.forms[0];
var valid = false;

formElement.addEventListener("submit", function(event) {
    event.preventDefault();

    // Making input values accessible

    var nameInput = document.getElementById("card1-name").value;
    var emailInput = document.getElementById("card1-email").value;
    var colorInput = document.getElementById("card1-color").value;

    var card2Question1 = document.getElementById("card2-question1").value;
    var card2Question2 = document.getElementById("card2-question2").value;
    var card2Question3 = document.getElementById("card2-question3").value;

    var card4Question1 = document.getElementById("card4-question1").value;
    var card4Question2 = document.getElementById("card4-question2").value;

    var all_radio_buttons = document.querySelectorAll("#questionnaire-wrapper input[type='radio']");
    var all_checkboxes = document.querySelectorAll("#questionnaire-wrapper input[type='checkbox']");
    var selectElement = document.getElementById("card5-select1");
    var selectValue = document.getElementById("card5-select1").value;

    var radioSelected = false;
    var checkboxSelected = false;
    /*
    Check if the name input is not empty and consists of at least 2 words
    Next line checks if email input is a valid email address
    Lines after examines if inputs are not empty
    */

    for (var i = 0; i < all_radio_buttons.length; i++) {
        if (all_radio_buttons[i].checked) {
            // formElement.classList.remove("invalid");
            // formElement.classList.add("valid");
            radioSelected = true;
        }
    }

    for (var j = 0; j < all_checkboxes.length; j++) {
        if (all_checkboxes[j].checked) {
            // formElement.classList.remove("invalid");
            // formElement.classList.add("valid");
            checkboxSelected = true;
        }
    }

    if (!validator.isEmpty(nameInput) && validator.moreWordsThan(nameInput, 1)
        && validator.isEmailAddress(emailInput)
        && !validator.isEmpty(colorInput)
        && !validator.isEmpty(card2Question1)
        && !validator.isEmpty(card2Question2)
        && !validator.isEmpty(card2Question3)
        && !validator.isEmpty(card4Question1)
        && !validator.isEmpty(card4Question2)
        && radioSelected && checkboxSelected
        && selectValue) {
            formElement.classList.remove("invalid");
            formElement.classList.add("valid");
            console.log(formElement.classList);
            valid = true;
    } else {
            valid = false;
            formElement.classList.remove("valid");
            formElement.classList.add("invalid");
            console.log(formElement.classList);
    }
    console.log("Valid value: ", valid);
    console.log("Brent's code: It was submitted");
});



