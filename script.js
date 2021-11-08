// main variables
let currentValue = 0; // value
let inputSymbol = "";  // symbol
let previousOperations = ""; // calculation

// flags
let isDotEntered = false;  //for dot
let isSignEntered = false;  //for sign
let isNewInput = false;

// consts
const canNotDevideToZeroMessage = "Деление на ноль невозможно";

function inputNumber(symb) {

    if (isNewInput) {
        currentValue = 0;
        previousOperations = "";
    } 
    else if (isSignEntered) {
        currentValue = 0;
    }
    if (currentValue == 0 && currentValue != "0." ) {
         currentValue = symb;
    } 
    else if (isDotEntered){
       currentValue = currentValue.toString() + symb;
    }
    else if (!isDotEntered){
       currentValue = parseFloat(currentValue.toString() + symb);
    }
    (checkLineLength)();

    document.getElementById("result").value = currentValue;
    document.getElementById("calculation").value = previousOperations;

    isSignEntered = false;
    isNewInput = false;
}

function inputSign(sign) {

    if (isSignEntered) {
        previousOperations = previousOperations.substring(0, previousOperations.length-1);
    } 
    else {
        if (isNewInput) {
            previousOperations = currentValue; 
        } else {
            previousOperations += parseFloat(currentValue);
        }
        let calculateResult  = (calculateAndCheck)();

        if (!calculateResult) return false;
    }
    previousOperations += sign;
    (checkLineLength)();

    document.getElementById("result").value = currentValue;
    document.getElementById("calculation").value = previousOperations;

    isSignEntered = true;
    isDotEntered = false;
    isNewInput = false;
}

function countSimpleMathOperations(operations) {

    if (currentValue == NaN.toString() ||
    currentValue == canNotDevideToZeroMessage) return false;
    
    switch(operations) {
        case 1:
            currentValue *= 0.01;
            break;

        case 2:
            if (currentValue == 0) {
                currentValue = canNotDevideToZeroMessage;

                document.getElementById("result").classList.remove("normalCurrentInput");       
                document.getElementById("result").classList.add("zoomCurrentInput");

                isNewInput = true;
                return false;
            }
            else {
               currentValue = 1 / currentValue;
            }
            break;

        case 3:
            currentValue **= 2;
            break;
            
        case 4:
            currentValue = Math.sqrt(currentValue);
            break;
            
        case 5:
            currentValue *= -1;
            break;
               
    }
    (checkLineLength)();       
    
    document.getElementById("result").value = currentValue;
    
    isDotEntered = false;
    isSignEntered = false;
    isNewInput = false;
}

function clearAll () {

    currentValue = 0;
    previousOperations = "";

    document.getElementById("result").value = currentValue;
    document.getElementById("calculation").value = previousOperations;

    document.getElementById("result").classList.remove("zoomCurrentInput");
    document.getElementById("calculation").classList.remove("zoomPreviousOperation");

    document.getElementById("result").classList.add("normalCurrentInput");
    document.getElementById("calculation").classList.add("normalPreviousOperation");

    isDotEntered = false;
}
       
function clearNumber () {

    currentValue = 0;

    document.getElementById("result").value = currentValue;

    document.getElementById("result").classList.remove("normalCurrentInput");
    document.getElementById("result").classList.add("zoomPreviousOperation");
    isDotEntered = false;
}

function clearLast () {
    
    currentValue = currentValue.toString();

    if (currentValue == NaN.toString() ||
        currentValue == canNotDevideToZeroMessage) return false;

    if (currentValue.length == 1
        ) {
        currentValue = 0;
    }
    else if (currentValue != 0 || currentValue == "0."
        ) {
        currentValue = currentValue.substring(0, currentValue.length-1);
        isDotEntered = false;
    } 

    document.getElementById("result").value = currentValue;
}

function inputDot() {
    if (isDotEntered) return false;

    let isIntNumber = isInt(currentValue);
    if (isIntNumber
        ){
        currentValue.toString();
        currentValue += '.';
        document.getElementById("result").value = currentValue;
        isDotEntered = true;
    }
    if (isNewInput
        ) {
            previousOperations = "";
            document.getElementById("calculation").value = previousOperations;
        }
    isNewInput = false;
    isSignEntered = false;
}

function resultCalculation() {

    if (isNewInput
        ) {
        if (currentValue == canNotDevideToZeroMessage
            ) {
            currentValue = 0;
            previousOperations = "";

            document.getElementById("result").value = currentValue;            
            document.getElementById("calculation").value = previousOperations;

            document.getElementById("result").classList.remove("zoomCurrentInput");
            document.getElementById("calculation").classList.remove("zoomPreviousOperation");

            document.getElementById("result").classList.add("normalCurrentInput");
            document.getElementById("calculation").classList.add("normalPreviousOperation");
        }
        return false;
    }
    
    previousOperations += currentValue;
    (calculateAndCheck)();
    (checkLineLength)();
    
    document.getElementById("result").value = currentValue;            
    document.getElementById("calculation").value = previousOperations;

    document.getElementById("calculation").value += "=";

    isNewInput = true;
    isSignEntered = false;
}

document.addEventListener('keydown', keyInput());

function keyInput(key, code) {

    let keyNumber = parseInt(key);

    if (keyNumber >= 0 && keyNumber < 10
        ) {
        inputNumber(key);
    }
    else if ( key == "+" || key == "-" || 
            key == "*"  || key == "/"
            ) {
            inputSign(key);
    }
    else if ( key == "Enter" || key == "=") {    
        resultCalculation();
    }

    switch (key
        ) {
        case "Backspace":
            clearLast();
            break;

        case "Delete":
            clearNumber();
            break;
                
        case ",":
            inputDot();
            break;
    
        case "MathOperations.Sqrt":
            countSimpleMathOperations('MathOperations.Sqrt');
            break;      
    }

    switch (code
        ) {
        case "MathOperations.Pow2":
            countSimpleMathOperations('MathOperations.Pow2');
            break;

        case "MathOperations.OneDivide":
            countSimpleMathOperations('MathOperations.OneDivide');
            break;
    }
}
        

var MathOperations = {
    Percentage: 1,
    OneDivide: 2,
    Sum: 3,
    Subtraction: 4,
    Divide: 5,
    Multiplication: 6,
    Sqrt: 7,
    Pow2: 8,
    Negative: 9
};

function isInt(n) {
    return n % 1 === 0;
 }

 
function checkLineLength() {
    currentValue =  currentValue.toString();
    
    if (currentValue.length > 13
        ) {
            document.getElementById("result").classList.remove("normalCurrentInput");
            document.getElementById("result").classList.add("zoomCurrentInput");
    }
    if (previousOperations.length > 20
        ) {
            document.getElementById("calculation").classList.remove("normalPreviousOperation");
            document.getElementById("calculation").classList.add("zoomPreviousOperation"); 
    }
    if (currentValue.includes('.') && 
        currentValue.split('.')[1].length > 15
        ) {
        currentValue = currentValue.slice(0, 15);
        currentValue = parseFloat(currentValue);
    }
    
}

function calculateAndCheck() {
    
    if (previousOperations.toString().indexOf("/0") != -1
    ) {
        currentValue = canNotDevideToZeroMessage;

        document.getElementById("result").classList.remove("normalCurrentInput");
        document.getElementById("result").classList.add("zoomCurrentInput");

        document.getElementById("calculation").classList.remove("zoomPreviousOperation");
        document.getElementById("calculation").classList.add("normalPreviousOperation");

        isNewInput = true;
        return false;
    }

    currentValue = eval(previousOperations);
    return true;
}