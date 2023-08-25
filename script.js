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

/* EVENT TO IDENTIFY LAST CLICKED BUTTON */
allButtons.forEach((button) => {
    // Use click rather than mouseup as other events, so that it will fire last
    button.addEventListener("click", (event) => {
        lastClickedButton = event.target.innerText;
    });
});

/* EVENT FOR DIGIT BUTTONS */
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
            // Limit length of number to 23 digits
            if (screenDigits.innerText.length < 21) {
                screenDigits.innerText += event.target.innerText;
                currentNumber = screenDigits.innerText;
            }
        }
    });
});

/* EVENT FOR SYMBOL (OPERATION) BUTTONS */
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

/* EVENT FOR EQUAL BUTTON */
equalButton.addEventListener("mouseup", (event) => {
    if (currentNumber != "" && lastNumber != "" && symbol != "") {
        currentNumber = operate(symbol, lastNumber, currentNumber);
        lastNumber = "";
        symbol = "";
        screenDigits.innerText = currentNumber;
        screenOperations.innerText = "";
    }
});

/* EVENT FOR CLEAR BUTTON */
clearButton.addEventListener("mouseup", (event) => {
    screenDigits.innerText = "";
    screenOperations.innerText = "";
    currentNumber = "";
    lastNumber = "";
    symbol = "";
    lastClickedButton = "";
});

/* EVENT FOR CLEAR ENTRY BUTTON */
clearEntryButton.addEventListener("mouseup", (event) => {
    const length = screenDigits.innerText.length
    screenDigits.innerText = screenDigits.innerText.slice(0, length-1);
    //Also update current number
    currentNumber = screenDigits.innerText;
});

/* EVENT FOR KEYBOARD SUPPORT */
document.addEventListener("keydown", (event) => {
    const mouseup = new MouseEvent("mouseup");
    const click = new MouseEvent("click");
    
    // For digits
    digits.forEach((digit) => {
        if (digit.innerText == event.key) {
            digit.dispatchEvent(mouseup);
            digit.dispatchEvent(click);
        }
    });

    // For clear entry
    if (event.key == "Backspace") {
        clearEntryButton.dispatchEvent(mouseup);
        clearEntryButton.dispatchEvent(click);
    }

    // For symbols
    operations.forEach((operation) => {
        if (operation.innerText == event.key) {
            operation.dispatchEvent(mouseup);
            operation.dispatchEvent(click);
        }
    });

    // For equal
    if (event.key == "=" || event.key == "Enter") {
        equalButton.dispatchEvent(mouseup);
        equalButton.dispatchEvent(click);
    }

    // For clear
    if (event.key == "Escape") {
        clearButton.dispatchEvent(mouseup);
        clearButton.dispatchEvent(click);
    }
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