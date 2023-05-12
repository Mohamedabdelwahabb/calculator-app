function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'Invalid operator';
    }
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '';

function appendNumber(number) {
    if (!operator) {
        firstNumber += number.toString();
    } else {
        secondNumber += number.toString();
    }
    updateDisplay();
}

function setOperator(selectedOperator) {
    operator = selectedOperator;
    updateDisplay();
}

function calculate() {
    if (firstNumber && operator && secondNumber) {
        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        displayValue = result.toString();
        firstNumber = '';
        operator = '';
        secondNumber = '';
        updateDisplay()
    }
}

function updateDisplay() {
    const display = document.querySelector('.calc--screen');
    if (operator) {
        display.textContent = `${firstNumber} ${operator} ${secondNumber}`;
    } else {
        display.textContent = displayValue;
    }
}

const numberButtons = document.querySelectorAll('[data-btn]');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-btn');
        appendNumber(number)
    });
    
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedOperator = button.getAttribute('data-btn');
        setOperator(selectedOperator);
    });
});

const equalsButton = document.querySelector('[data-equals]');
equalsButton.addEventListener('click', calculate);

updateDisplay()