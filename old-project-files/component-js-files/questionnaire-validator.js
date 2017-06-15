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
                    return false
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
                        return false
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
                        return false
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
