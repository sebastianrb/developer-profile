(function(window){
//BRENT'S VALIDATORS
var validator = {
    isEmailAddress: (function (input) {

        for (var i = 0; i < input.length; i++) {
            if(input[i] === "@") {
                var arr = input.split("@");
                for (var j = 0; j < arr.length; j++) {
                    if (typeof(arr[j]) !== "string" || arr[j] === "") {
                        return false;
                    }
                    return true;
                }
                return false;
            }
        }
    }),
    isPhoneNumber: (function (input) {

        var valid_elements = "1234567890";

        // Check numbers with prefix '0'
        if (input.length === 9 || input.length === 10) {
            if (input[0] !== "0"){
                return false;
            }
            // When mobile number, second character should be a 4
            if (input.length === 10) {
                if(input[1] !== "4") {
                    return false;
                }
            }
            for (var i = 1; i < input.length; i++) {
                    if (valid_elements.indexOf(input[i]) === -1) {
                        return false;
                    }
            }
            return true;
        // Check numbers with prefix '+32'
        } else if (input.length === 11 || input.length === 12) {
            var prefix = input.slice(0,3);
            if (prefix !== "+32"){
                return false;
            }
            // When mobile number, fourth character should be a 4
            if (input.length === 12) {
                if(input[3] !== "4") {
                    return false;
                }
            }
            for (var j = 1; j < input.length; j++) {
                if (valid_elements.indexOf(input[j]) === -1) {
                    return false;
                }
            }
            return true;
        }
        return false;

    }),
    withoutSymbols: (function (input) {
        var input_arr = input.split("");
        var alphanumeric = "abcdefghijklmnopqrstuvwqyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ".split("");
        var result = "";
        for(var i = 0, len = input_arr.length; i < len; i++) {
            if (input_arr[i] === "-") {
                result += " ";
            }
            for (var j = 0, alp_len = alphanumeric.length; j < alp_len; j++){
                if (input_arr[i] === alphanumeric[j]) {
                    result += input_arr[i];
                }
            }
        }
        return result;
    }),
    isDate: (function (input) {
        var d = new Date(input);

        if (isNaN(d)) {
            return false;
        }
        return true;

    }),
    isBeforeDate: (function (input, reference) {
        var date1 = new Date(reference);
        var date2 = new Date(input);

        if (date1.getTime() > date2.getTime()) {
            return true;
        }
        return false;
    }),
    isAfterDate: (function (input, reference) {
        var date1 = new Date(reference);
        var date2 = new Date(input);

        if (date1.getTime() < date2.getTime()) {
            return true;
        }
        return false;
    }),
    isBeforeToday: (function (input) {
        var today = Date.now();
        var date2 = new Date(input);

        if (today > date2.getTime()) {
            return false;
        }
        return true;
    }),
    isAfterToday: (function (input) {
        var today = Date.now();
        var date2 = new Date(input);

        if (today < date2.getTime()) {
            return true;
        }
        return false;
    }),
    isEmpty: (function (input) {
        if (typeof(input) === "string") {
            if (input.length === 0) {
                return true;
            }
            else {
                var str = input.split("");
                for (var i = 0; i < str.length; i++){
                    if (str[i] !== " ") {
                        return false;
                    }
                    return true;
                }
            }
        }
        return false;
    }),
    contains: (function (input, words) {
        var string_no_punc = this.withoutSymbols(input);
        var str = string_no_punc.split(" ");
        for (var i = 0; i < words.length; i++) {
            for (var j = 0; j < str.length; j++) {
                if ((words[i].toLowerCase()) === (str[j]).toLowerCase()) {
                    return true;
                }
            }
        }
        return false;
    }),
    lacks: (function (input, words) {
        var string_no_punc = this.withoutSymbols(input);
        var str = string_no_punc.split(" ");
        for (var i = 0; i < words.length; i++) {
            for (var j = 0; j < str.length; j++) {
                if ((words[i].toLowerCase()) === (str[j]).toLowerCase()) {
                    return false;
                }
            }
        }
        return true;
    }),
    isComposedOf: (function (input, strings) {
        var string_no_punc = this.withoutSymbols(input);
        for (var i = 0; i < strings.length; i++) {
            if (string_no_punc.indexOf(strings[i]) !== -1) {
                while (string_no_punc.indexOf(strings[i]) !== -1) {
                string_no_punc = string_no_punc.replace(strings[i], "");
                }
            }
        }
        if (string_no_punc.trim().length > 0) {
            return false;
        }
        return true;
    }),
    isLength: (function (input, n) {
        if (input.length <= n){
            return true;
        }
        return false;
    }),
    isOfLength: (function (input, n) {
        if (input.length > n) {
            return false;
        }
        return true;
    }),
    countWords: (function (input) {
        if (input === "") {
            return 0;
        }

        var string_no_punc = this.withoutSymbols(input);
        console.log(string_no_punc);
        var wordsArray = string_no_punc.split(" ");
        return wordsArray.length;
    }),
    lessWordsThan: (function (input, n) {
        return this.countWords(input) <= n;
    }),
    moreWordsThan: (function (input, n) {
        return this.countWords(input) >= n;
    }),
    isBetween: (function (input, floor, ceil) {
        if (input >= floor && input <= ceil) {
            return true;
        }
        return false;
    }),
    isAlphanumeric: (function (input) {
        var alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < input.length; i++) {
            for (var j = 0; j < alphanumeric.length; j++) {
                if (alphanumeric.indexOf(input[i]) === -1) {
                    return false;
                }
            }
        }
        return true;
    }),
    isCreditCard: (function (input) {
        if (input.length === 16) {
            for (var i = 0; i < input.length; i++) {
                if (!this.isAlphanumeric(input[i])) {
                    return false;
                }
            }
            return true;
        } else if (input.length === 19) {
            if (input[4] === "-" &&  input[9] === "-" && input[14] === "-") {
                for (var j = 0; j < input.length; j++) {
                    if (this.isAlphanumeric(input[j]) || input[j] === "-") {
                        return true;
                    }
                }
            }
            return false;
        }
        return false;
    }),
    isHex: (function (input) {
        var hexChars = "0123456789ABCDEFabcdef";
        var input_arr = input.split("");
        if (input_arr[0] === "#") {
            if (input.length === 4 || input.length === 7) {
                for (var i = 1; i < input_arr.length; i++){
                    if (hexChars.indexOf(input_arr[i]) === -1) {
                        return false;
                    }
                }
                return true;
            }

        }
        return false;
    }),
    isRGB: (function (input) {
        var rgb = input.substr(0,4);
        var numbers_arr = input.slice(4,input.length-1).split(",").map(Number);
        var closingTag = input[input.length-1];

        if (rgb === "rgb(") {
            if (closingTag === ")") {
                for (var i = 0; i < numbers_arr.length; i++) {
                    if (numbers_arr[i] < 0 || numbers_arr[i] > 255) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }),
    isHSL: (function (input) {
        var hsl = input.substr(0,4);
        var numbers_arr = input.slice(4,input.length-1).split(",").map(Number);
        var closingTag = input[input.length-1];

        if (hsl === "hsl(") {
            if (closingTag === ")") {
                if (0 >= numbers_arr[0] && numbers_arr[0] >= 360) {
                    return false;
                }
                for (var i = 1; i < numbers_arr.length; i++) {
                    if (numbers_arr[i] < 0 || numbers_arr[i] > 1) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }),
    isColor: (function (input) {
        return isHex(input) || isRGB(input) || isHSL(input);
    }),
    isTrimmed: (function (input) {
        if (input !== input.trim() || input.match("  ")) {
            return false;
        }
        return true;
    })
};
//End of Brent's validators

// form object
var data = {
    appName: "Signup Form",
    addDescription: "This is a form for signing up for something",
    cards: [
        {
            cardID: "card1",
            cardTitle: "Questionnaire Mockup",
            cardDescription: "Collect personal information",
            cardQuestions: [
                {
                    questionID: "card1-name",
                    fullNameText: "What are your first and last names?",
                    questionAnswer: [],
                    required: true
                },
                {
                    questionID: "card1-email",
                    emailText: "What is your email address?",
                    questionAnswer: [],
                    required: true
                },
                {
                    questionID: "card1-color",
                    favoriteColorText: "What is your favorite color?",
                    questionAnswer: [],
                    required: false
                }
            ]
        },
        {
            cardID: "card2",
            cardTitle: "Section Title",
            cardDescription: "Pending",
            cardQuestions: [
                {
                    questionID: "card2-question1",
                    questionText: "Question",
                    questionAnswer: [],
                    required: false
                },
                {
                    questionID: "card2-question2",
                    questionText: "Question",
                    questionAnswer: [],
                    required: false
                },
                {
                    questionID: "card2-question3",
                    questionText: "Question",
                    questionAnswer: [],
                    required: false
                }
            ]
        },
        {
            cardID: "card3",
            cardTitle: "This section is disabled",
            cardDescription: "Pending",
            cardQuestions: [
                {
                    questionID: "card3-question1",
                    questionText: "Question",
                    questionAnswer: [],
                    required: false
                }
            ]
        },
        {
            cardID: "card4",
            cardTitle: "Strong Section Title",
            cardDescription: "Pending",
            cardQuestions: [
                {
                    questionID: "card4-question1",
                    questionText: "Question",
                    questionAnswer: [],
                    required: false
                },
                {
                    questionID: "card4-question2",
                    questionText: "Question",
                    questionAnswer: [],
                    required: false
                }
            ]
        },
        {
            cardID: "card5",
            cardTitle: "Section Title w/ Form Elements",
            cardDescription: "Pending",
            cardQuestions: [
                {
                    questionID: ["card5-radios"],
                    questionText: "Multiple Choice w/ Radio Inputs",
                    questionAnswer: [],
                    required: false
                },
                {
                    questionID: ["card5-checkboxes"],
                    questionText: "Multiple Choice w/ Checkbox Inputs",
                    questionAnswer: [],
                    required: false
                },
                {
                    questionID: "card5-select1",
                    questionText: "Dropdown Select from the list below:",
                    questionAnswer: [],
                    required: true
                }
            ]
        }
    ]
};

//store user data in the object upon page submission

//store references to relevant DOM elements in variables; these are global
var submitButton = document.getElementsByClassName("submit")[0];
var inputs = document.querySelectorAll("#questionnaire-wrapper input[type='text']:not([disabled]), #questionnaire-wrapper input[type='radio'], input[type='checkbox'], textarea, select");
var labels = document.querySelectorAll("label.question, label.select-label, legend.multiple-choice-header");
var legends = document.querySelectorAll("legend.multiple-choice-header");
var i, j, k;

//event listener
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    //BRENT'S CODE
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
    console.log("Valid form inputs: ", valid);
    // console.log("Brent's code: It was submitted");

    if(valid) {
        //SEBASTIAN'S CODE; time to update the data object with the user input
        //reset checkbox and radio answers
        data.cards[4].cardQuestions[1].questionAnswer = [];
        data.cards[4].cardQuestions[0].questionAnswer = [];
        //remove validation bubbles
        for(i = 0; i < labels.length; i++) {
            labels[i].classList.remove("invalid");
        }
        //start looping through each input, and save answers (values) in respective properties
        for(i = 0; i < inputs.length; i++) {
            //currentElement
            var element = inputs[i];
            //assign input ID
            var inputID = element.getAttribute("id");
            //assign parent card ID
            var parentCardID = element.parentNode.parentNode.getAttribute("id");
            //assign current value variable
            var currentValue;
            //declare isChecked
            var isChecked = element.checked;
            //set element variables based on element type
            if(element.tagName == "SELECT") { //for select elements
                currentValue = element.value;
            } else if(element.getAttribute("type") == "radio") { //for radios
                inputID = "card5-radios";
                currentValue = inputs[i].value;
                // isChecked = element.checked;
            } else if(element.getAttribute("type") == "checkbox") { // for checkboxes
                inputID = "card5-checkboxes";
                currentValue = inputs[i].value;
                // isChecked = element.checked;
            } else { //text input or textarea
                parentCardID = element.parentNode.getAttribute("id");
                currentValue = inputs[i].value;
            }
            //update object; start by looping through object properties
            for(j = 0; j < data.cards.length; j++) {
                // console.log("runnning card loop");
                if(data.cards[j].cardID == parentCardID) {
                    var currentCard = data.cards[j];
                    //card found, now loop through card questions
                    for(k = 0; k < currentCard.cardQuestions.length; k++) {
                        // console.log("running questions loop");
                        var cardQuestions = currentCard.cardQuestions;
                        //loop through card's questions;f if question ID matches, set answer array
                        if(cardQuestions[k].questionID == inputID) {
                            //clear out answer array
                            if(element.getAttribute("type") != "checkbox" && element.getAttribute("type") != "radio") {
                                cardQuestions[k].questionAnswer = [];
                            }
                            //account for radios, checkboxes, and selects, and update properties
                            if(element.tagName == "SELECT") {
                                if(currentValue != "") {
                                    cardQuestions[k].questionAnswer.push(currentValue);
                                    console.log("The value of question " + inputID + " has been saved as " + cardQuestions[k].questionAnswer + " in the data object");
                                }
                            } else if(element.getAttribute("type") == "radio" || element.getAttribute("type") == "checkbox") {
                                if(isChecked) {
                                    cardQuestions[k].questionAnswer.push(currentValue);
                                    console.log("The value of question " + inputID + " has been saved as " + cardQuestions[k].questionAnswer + " in the data object");
                                }
                            //account for text inputs and textareas and update properties
                            } else if(currentValue != "") {
                                cardQuestions[k].questionAnswer.push(currentValue);
                                console.log("The value of question " + inputID + " has been saved as " + cardQuestions[k].questionAnswer + " in the data object");
                            }
                        }
                    }
                }
            }
        }
        //print resultant object to the console
        console.log("Resultant object: ", data.cards);
    } else { //alert users to omissions
        var radioSatisfied = false;
        var checkboxSatisfied = false;
        alert("Invalid input");
        for(i = 0; i < labels.length; i++) {
            if(labels[i].nextSibling.nextSibling.getAttribute("id") == "card1-email") {
                if(!labels[i].nextSibling.nextSibling.value || !validator.isEmailAddress(labels[i].nextSibling.nextSibling.value)) {
                    labels[i].classList.add("invalid");
                    console.log("Email is not good");
                } else {
                    labels[i].classList.remove("invalid");
                }
            } else {
                if(!labels[i].nextSibling.nextSibling.value) {
                    labels[i].classList.add("invalid");
                } else {
                    labels[i].classList.remove("invalid");
                }
            }
            if(i === 7) {
                if(!labels[i].nextSibling.nextSibling.nextSibling.nextSibling.value) {
                    labels[i].classList.add("invalid");
                } else {
                    labels[i].classList.remove("invalid");
                }
            }
        }
        for (i = 0; i < all_radio_buttons.length; i++) {
                if (all_radio_buttons[i].checked) {
                    // formElement.classList.remove("invalid");
                    // formElement.classList.add("valid");
                    radioSatisfied = true;
                }
        }

        for (j = 0; j < all_checkboxes.length; j++) {
            if (all_checkboxes[j].checked) {
                // formElement.classList.remove("invalid");
                // formElement.classList.add("valid");
                checkboxSatisfied = true;
            }
        }
        if(!radioSatisfied) {
            legends[0].classList.add("invalid");
        } else {
            legends[0].classList.remove("invalid");
        }
        if(!checkboxSatisfied) {
            legends[1].classList.add("invalid");
        } else {
            legends[1].classList.remove("invalid");
        }
        if(labels[labels.length - 1].nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.value) {
            labels[labels.length - 1].classList.remove("invalid");
        }
    }
});

})(window);










