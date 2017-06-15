(function(window){

//cart object

var list = {
    items: [
        {
            id: "0",
            name: "Laphroaig 10 Year",
            price: 60,
            count: 0
        },
        {
            id: "1",
            name: "Laphroaig 18 Year",
            price: 70,
            count: 0
        },
        {
            id: "2",
            name: "Laphroaig 32 Year",
            price: 80,
            count: 0
        },
        {
            id: "3",
            name: "Oban 14 Year",
            price: 90,
            count: 0
        },
        {
            id: "4",
            name: "Oban 18 Year",
            price: 100,
            count: 0
        },
        {
            id: "5",
            name: "Lagavulin 12 Year",
            price: 90,
            count: 0
        },
        {
            id: "6",
            name: "Lagavulin 16 Year",
            price: 120,
            count: 0
        },
        {
            id: "7",
            name: "Monkey Shoulder",
            price: 50,
            count: 0
        },
        {
            id: "8",
            name: "Bowmore 12 Year",
            price: 100,
            count: 0
        },
        {
            id: "9",
            name: "Bowmore 15 Year",
            price: 90,
            count: 0
        }
    ]
};

var cart = {
    promoCode: "BIGSALE",
    cartItems: [],
    numberOfItems: function() {
        return this.cartItems.length;
    },
    cartTotal: 0,
    cartList: []
};


//establish globals
var addButtons = document.getElementsByClassName("add");
var deleteButtons = document.getElementsByClassName("delete-button");
var itemButtons = document.getElementsByClassName("itemButton");
var basket = document.getElementById("basket");
var numberItemsInBasket = cart.numberOfItems();
var quantityFields = document.getElementsByClassName("quantity");
var itemPrices = document.getElementsByClassName("itemPrice");
var enterCode = document.getElementById("enterCode");
var cartList = document.getElementById("cartList");
var cartTotal = document.getElementById("cartTotal");
var toggleButton = document.getElementById("toggle");
var codeField = document.getElementById("codeField");
var basketTotal = document.getElementsByClassName("basketTotal")[0];
var scotchBasketList = document.getElementById("scotchBasketList");
var promoCode = "smokey";
var basketList = "";
var i;

//functions to toggle cart visibility
function showCart() {
    basket.removeAttribute("class");
    basket.setAttribute("class", "cartShow");
    basket.focus();
}
function hideCart() {
    basket.removeAttribute("class");
    basket.setAttribute("class", "cartHide");
}

//fill in quantities and prices on page load
for(i = 0; i < quantityFields.length; i++) {
    quantityFields[i].value = list.items[i].count;
}
//prices
for(i = 0; i < itemPrices.length; i++) {
    itemPrices[i].innerText = "Price: $" + list.items[i].price;
}

//event listeners

//add item buttons on click
for(i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function(event) {
        //get value of the item quanity input
        var parentID = this.parentNode.parentNode.getAttribute("id");
        var quantityValue = quantityFields[parentID].value;
        // console.log(quantityValue);
        //get name of selected product
        var selectedItemName = list.items[parentID].name;
        var selectedItemPrice = list.items[parentID].price;
        //if quantity added is > 0
        if(quantityValue > 0) {
            for(i = 1; i <= quantityValue; i++) {
                cart.cartItems.push(selectedItemName);
                cart.numberOfItems();
            }
            // console.log("After that addition, cartItems is" + cart.cartItems);
            // console.log(cart.numberOfItems());
        } else if(quantityValue == 0) {
            //loop through cart items, if it contains the selected item, remove them and remove cost from price
            for(i = cart.numberOfItems() - 1; i >= 0; i--) {
                if(cart.cartItems[i] == selectedItemName) {
                    cart.cartItems.splice(i, 1);
                    cart.cartTotal -= selectedItemPrice;
                }
            }
            if(cart.numberOfItems() === 0) {
                cartList.innerText = 0;
                cartTotal.innerText = "$" + 0;
            }
            // console.log("After that entry of 0, cartItems is" + cart.cartItems);
        }
        if(cart.numberOfItems() >= 0) {
            // console.log(cart.numberOfItems());
            showCart();
            //update basket price and items
            cartList.innerText = cart.numberOfItems();
            //update total cost
            var batchPrice = quantityValue * selectedItemPrice;
            // console.log(batchPrice);
            cart.cartTotal += batchPrice;
            //update view
            cartTotal.innerText = "$" + cart.cartTotal;
        }

        if(cart.numberOfItems() === 0) {
            hideCart();
        }
        //unique value array to show bottle sselected
        if(cart.cartList.indexOf(selectedItemName) < 0) {
            cart.cartList.push(selectedItemName);
        }
        // console.log(cart.cartList);
        //number of item in bart.cartList

        //generate HTML item list
        basketList = "<ul>";
        for(i = 0; i < cart.cartList.length; i++) {
            basketList += "<li>" + cart.cartList[i] + "</li>";

        }
         basketList += "</ul>";
        // console.log(basketList);

        //insert list
        var newParagraph = document.createElement("div");
        newParagraph.innerHTML = basketList;
        // console.log(newParagraph);
        scotchBasketList.innerHTML = "";
        scotchBasketList.appendChild(newParagraph);
        //create new Node and insert basketList text
    });
}

//remove button click
for(i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function(event) {
        var parentID = this.parentNode.parentNode.getAttribute("id");
        var selectedItemName = list.items[parentID].name;
        var selectedItemPrice = list.items[parentID].price;
        var quantityValue = quantityFields[parentID].value;

        //loop through cart items, if it contains the selected item, remove them and remove cost from price
        for(i = cart.numberOfItems() - 1; i >= 0; i--) {
            // console.log("Loop is running");
                if(cart.cartItems[i] == selectedItemName) {
                    cart.cartItems.splice(i, 1);
                    cart.cartTotal -= selectedItemPrice;
                }
        }

        if(cart.numberOfItems() >= 0) {
            // console.log(cart.numberOfItems());
            showCart();
            //update basket price and items
            cartList.innerText = cart.numberOfItems();
            //update total cost
            // var batchPrice = quantityValue * selectedItemPrice;
            // console.log(batchPrice);
            // cart.cartTotal -= batchPrice;
            //update view
            cartTotal.innerText = "$" + cart.cartTotal;
        }

        if(cart.numberOfItems() === 0) {
            cartList.innerText = 0;
            cartTotal.innerText = "$" + 0;
            hideCart();
        }

        //unique value array
        if(cart.cartList.indexOf(selectedItemName) >= 0) {
            for(i = cart.cartList.length - 1; i >= 0; i--) {
                if(cart.cartList[i] == selectedItemName) {
                    cart.cartList.splice(i, 1);
                }
            }
        }
        console.log(cart.cartItems);
        // console.log(cart.cartList);


        //generate item list HTML
        basketList = "<ul>";
        for(i = 0; i < cart.cartList.length; i++) {
            basketList += "<li>" + cart.cartList[i] + "</li>";

        }
         basketList += "</ul>";
        // console.log(basketList);


        var newParagraph = document.createElement("div");
        newParagraph.innerHTML = basketList;
        // console.log(newParagraph);
        scotchBasketList.innerHTML = "";
        scotchBasketList.appendChild(newParagraph);

        quantityFields[parentID].value = 0;
    });
}

//toggle
toggleButton.addEventListener("click", function(event) {
    if(getComputedStyle(basket).display == "block" || basket.style.display == "block") {
        hideCart();
    } else {
        showCart();
    }
});

var codeAlreadyUsed = false;
enterCode.addEventListener("click", function(event) {
    var codeValue = document.getElementById("codeField").value;
    console.log(codeValue);
    if(codeValue == "smokey" && !codeAlreadyUsed) {
        console.log("Right code");
        cart.cartTotal = cart.cartTotal * 0.90;
        cartTotal.innerText = "$" + cart.cartTotal;
        var discountAppliedP = document.createElement("p");
        var discountAppliedText = document.createTextNode("Discount code applied: 10% deducted");
        discountAppliedP.appendChild(discountAppliedText);
        basketTotal.appendChild(discountAppliedP);
        codeAlreadyUsed = true;
        console.log(cart.cartTotal);
    } else {
        console.log("Wrong code");
    }
});

})(window);

