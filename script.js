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

// console.log(add(1, 3))
// console.log(subtract(3, 1))
// console.log(multiply(5, 2))
// console.log(divide(5, 2))

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

let displayValue = ''

function appendNumber(number) {
    displayValue += number.toString();
    updateDisplay();
}

function updateDisplay() {
    const display = document.querySelector('.calc--screen');
    display.textContent = displayValue;
}

const numberButtons = document.querySelectorAll('[data-btn]');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-btn');
        appendNumber(number)
    });
    
});

updateDisplay()