window.onload = () => {
    main();
};

function main() {
    const screenDigits = document.querySelector(".screen-digits");
    const screenOperations = document.querySelector(".screen-operations");
    const digits = document.querySelectorAll(".digits > button");
    const operations = document.querySelectorAll("button.operation");
    const equalButton = document.querySelector(".equal");
    const clearButton = document.querySelector(".clear");
    const allButtons = document.querySelectorAll("button");

    let firstNumber = "";
    let secondNumber = "";
    let symbol = "";
    let lastClickedButton = "";

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
            const clicked = document.getElementsByClassName("clicked");
            if (clicked.length != 0) {
                screenDigits.innerText = "";
                removeClickedAll();
            }

            screenDigits.innerText += event.target.innerText;
        });
    });

    // Event for operation buttons
    operations.forEach((operation) => {
        operation.addEventListener("mouseup", (event) => {
            console.log(lastClickedButton);
            if (screenDigits.innerText == "") {
                // Do nothing if no digit input
            }
            else {
                event.target.classList.add("clicked");
                screenOperations.innerText = event.target.innerText;
                const clicked = document.getElementsByClassName("clicked");
                
                // Behaviors when there's no pending operation
                if (symbol === "") {
                    firstNumber = screenDigits.innerText;
                    symbol = event.target.innerText;
                }
                
                // Usercase 1: user want to change operation
                else if (clicked.length != 1) {
                    removeClickedAll();
                    event.target.classList.add("clicked");
                    symbol = event.target.innerText;
                }
                // Usercase 2: user click the same button again
                else if (lastClickedButton == event.target.innerText) {
                    // Do nothing
                }
                
                // Behaviors when there's pending operation
                else {
                    // Save screen as second number
                    secondNumber = screenDigits.innerText;
                    // Then run operation and save result as first number, also display to screen
                    firstNumber = operate(symbol, firstNumber, secondNumber);
                    screenDigits.innerText = firstNumber;
                    // Then save new operation
                    symbol = event.target.innerText;
                }
            }
            console.log(firstNumber);
            console.log(secondNumber);
            console.log(symbol);
        });
    });

    equalButton.addEventListener("mouseup", (event) => {

    });

    // Event for clear button (temporarily)
    clearButton.addEventListener("mouseup", (event) => location.reload());
}

// Remove clicked class for all elements
function removeClickedAll() {
    const operations = document.querySelectorAll("button.operation");
    operations.forEach((operation) => {
        operation.classList.remove("clicked");
    })
}

// Math functions
function operate(symbol, a, b) {
    if (symbol == "+") {
        return add(a, b);
    }
    if (symbol == "-") {
        return subtract(a, b);
    }
    if (symbol == "*") {
        return multiply(a, b);
    }
    if (symbol == "/") {
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
    return Number(a) / Number(b);
}