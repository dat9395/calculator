let currentNumber = "";
let lastNumber = "";
let symbol = "";
let lastClickedButton = "";

const screenDigits = document.querySelector(".screen-digits");
const screenOperations = document.querySelector(".screen-operations");
const digits = document.querySelectorAll("button.digit");
const operations = document.querySelectorAll("button.operation");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const clearEntryButton = document.querySelector(".clear-entry");
const allButtons = document.querySelectorAll("button");

// Event for all buttons to identify last clicked button
// Use click rather than mouseup as other events, so that it will fire last
allButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        lastClickedButton = event.target.innerText;
    });
});

// Event for digit buttons
digits.forEach((digit) => {
    digit.addEventListener("mouseup", (event) => {
        // If an operation button was clicked before, clear digit screen
        if (isSymbol(lastClickedButton)) {
            screenDigits.innerText = "";
        }

        // Case: float
        if (event.target.innerText == "." && 
            screenDigits.innerText.match(/\./) != null) {
            // Do nothing
        }
        else {
            screenDigits.innerText += event.target.innerText;
            currentNumber = screenDigits.innerText;
        }
    });
});

// Event for operation buttons
operations.forEach((operation) => {
    operation.addEventListener("mouseup", (event) => {
        if (screenDigits.innerText != "") {
            screenOperations.innerText = event.target.innerText;
            
            // Behaviors when there's no pending operation
            if (symbol === "") {
                lastNumber = currentNumber;
                currentNumber = "";
                symbol = event.target.innerText;
            }
            
            // Usercase 1: user want to change operation
            else if (isSymbol(lastClickedButton)) {
                symbol = event.target.innerText;
            }
            
            // Usercase 2: user click the same button again
            else if (lastClickedButton == event.target.innerText) {
                // Do nothing
            }
            
            // Behaviors when there's pending operation
            else {
                lastNumber = operate(symbol, lastNumber, currentNumber);
                currentNumber = "";
                screenDigits.innerText = lastNumber;
                // Save new operation
                symbol = event.target.innerText;
            }
        }
    });
});

// Event for equal button
equalButton.addEventListener("mouseup", (event) => {
    if (currentNumber != "" && lastNumber != "" && symbol != "") {
        lastNumber = operate(symbol, lastNumber, currentNumber);
        currentNumber = "";
        screenDigits.innerText = lastNumber;
        screenOperations.innerText = "";
    }
});

// Event for clear button
clearButton.addEventListener("mouseup", (event) => {
    screenDigits.innerText = "";
    screenOperations.innerText = "";
    currentNumber = "";
    lastNumber = "";
    symbol = "";
    lastClickedButton = "";
});

// Event for clear entry button
clearEntryButton.addEventListener("mouseup", (event) => {
    const length = screenDigits.innerText.length
    screenDigits.innerText = screenDigits.innerText.slice(0, length-1);
    //Also update current number
    currentNumber = screenDigits.innerText;
});


/* HELPER FUNCTIONS */
function isSymbol(lastClickedButton) {
    const symbols = ["+", "-", "*", "/", "="];
    if (symbols.some((symbol) => symbol == lastClickedButton)) {
        return true;
    }
    else {
        return false;
    }
}

function operate(s, a, b) {
    if (s == "+") {
        return add(a, b);
    }
    if (s == "-") {
        return subtract(a, b);
    }
    if (s == "*") {
        return multiply(a, b);
    }
    if (s == "/") {
        return divide(a, b);
    }
}

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if (b != 0) {
        return Number(a) / Number(b);
    }
    else {
        alert("Cannot divide by 0!");
        // Clear global variable symbol to prevent issues
        symbol = "";
        return "";
    }
}