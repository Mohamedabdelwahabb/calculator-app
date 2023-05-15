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
  if (b === 0) {
    return "Error: Division by zero";
  }
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
  decimalButton.disabled = false;
  calcScreen.textContent += number;
  if (!operator) {
    firstNumber += number;
  } else {
    secondNumber += number;
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
    console.log(firstNumber, "eee", secondNumber, operator);
    const result = operate(
      operator,
      parseFloat(firstNumber),
      parseFloat(secondNumber)
    ).toFixed(4);
    displayValue = +result;
    firstNumber = +result;
    console.log(displayValue);
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
  decimalButton.disabled = false;
  calcScreen.textContent = "";
});

const deleteButton = document.querySelector("[data-delete]");
const deleteDigit = () => {
  firstNumber = firstNumber.toString().slice(0, -1);
  calcScreen.textContent = firstNumber;
};
deleteButton.addEventListener("click", () => {
  deleteDigit();
});

updateDisplay();
const handleKeyboard = ({ repeat, key }) => {
  if (repeat) return;
  if (key === "+") {
    setOperator(key);
  } else if (key === "-") {
    setOperator(key);
  } else if (key === "/") {
    setOperator(key);
  } else if (key === "*") {
    setOperator(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteDigit();
  } else {
    appendNumber(key);
  }
};

// KEYBOARD SUPPORT INFO BUTTON OPENER/CLOSER

document.addEventListener("keydown", handleKeyboard);
