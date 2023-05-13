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
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}

let firstNumber = "";
let operator = "";
let secondNumber = "";
let displayValue = "";

const decimalButton = document.querySelector(".decimal");
decimalButton.addEventListener("click", () => {
  appendNumber(".");
  decimalButton.disabled = true;
});

function appendNumber(number) {
  if (number === "." && calcScreen.textContent.includes(".")) {
    return;
  }
  calcScreen.textContent += number;
  if (!operator) {
    firstNumber += number.toString();
  } else {
    secondNumber += number.toString();
  }
}

function setOperator(selectedOperator) {
  if (operator) {
    calculate();
  }
  operator = selectedOperator;
  displayValue = "";
  updateDisplay();
}

function calculate() {
  if (firstNumber && operator && secondNumber) {
    const result = operate(
      operator,
      parseFloat(firstNumber),
      parseFloat(secondNumber)
    );
    displayValue = result.toString();
    firstNumber = result.toString();
    operator = "";
    secondNumber = "";
    updateDisplay();
  }
}

function updateDisplay() {
  if (operator && secondNumber) {
    calcScreen.textContent = `${firstNumber} ${operator} ${secondNumber}`;
  } else if (operator) {
    calcScreen.textContent = `${firstNumber} ${operator}`;
  } else {
    calcScreen.textContent = displayValue;
  }
}

const numberButtons = document.querySelectorAll("[data-btn]");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.getAttribute("data-btn");
    appendNumber(number);
  });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedOperator = button.getAttribute("data-operator");
    console.log(selectedOperator);
    setOperator(selectedOperator);
  });
});

const equalsButton = document.querySelector("[data-equals]");
equalsButton.addEventListener("click", calculate);

const resetBtn = document.querySelector("[data-reset]");
const calcScreen = document.querySelector(".calc--screen");

resetBtn.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  displayValue = "";
  calcScreen.textContent = "";
});

const deleteButton = document.querySelector("[data-delete]");

deleteButton.addEventListener("click", () => {
  calcScreen.textContent = calcScreen.textContent.slice(0, -1);
});

updateDisplay();
