(function(window){

//establish globals
var screenContent = "";
var calculatorScreen = document.getElementById("screen");
var toScreenButtons = document.getElementsByClassName("to-screen");
var clearButton = document.getElementsByClassName("clear")[0];
var equalsButton = document.getElementsByClassName("equals")[0];

//number button listener
var i;
for(i = 0; i < toScreenButtons.length; i++) {
    toScreenButtons[i].addEventListener("click", function(event) {
        event.preventDefault();
        screenContent += this.value;
        console.log(screenContent);
        calculatorScreen.value = screenContent;
    });
}

//clear button listener
clearButton.addEventListener("click", function(event) {
        event.preventDefault();
        screenContent = "";
        console.log(screenContent);
        calculatorScreen.value = screenContent;
});

//equals button listener
equalsButton.addEventListener("click", function(event) {
        event.preventDefault();
        var result = eval(screenContent);
        calculatorScreen.value = result;

});

})(window);
