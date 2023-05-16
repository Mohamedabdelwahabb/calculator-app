const decimalButton = document.querySelector(".decimal");
const numberButtons = document.querySelectorAll("[data-btn]");
const deleteButton = document.querySelector("[data-delete]");
const resetBtn = document.querySelector("[data-reset]");
const calcScreen = document.querySelector(".calc--screen");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("[data-equals]");

const maxDigits = 9;
let firstNumber = "";
let operator = "";
let secondNumber = "";
let displayValue = "";

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

decimalButton.addEventListener("click", () => {
  appendNumber(".");
  decimalButton.disabled = true;
});

function appendNumber(number) {
  if (displayValue.toString().length >= maxDigits) {
    return;
  }
  if (number === "." && displayValue.toString().includes(".")) {
    return;
  }
  if (number === "0" && displayValue === "0") {
    return; // Prevent typing more than one zero on the left side
  }
  if (!operator && firstNumber.toString().length >= maxDigits) {
    return;
  }
  if (operator && secondNumber.toString().length >= maxDigits) {
    return;
  }
  decimalButton.disabled = false;
  displayValue += number;
  if (!operator) {
    firstNumber += number;
  } else {
    secondNumber += number;
  }
  updateDisplay();
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
    ).toFixed(4);
    displayValue = +result;
    firstNumber = +result;
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

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.getAttribute("data-btn");
    appendNumber(number);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedOperator = button.getAttribute("data-operator");
    setOperator(selectedOperator);
  });
});

equalsButton.addEventListener("click", calculate);
resetBtn.addEventListener("click", () => {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  displayValue = "";
  decimalButton.disabled = false;
  calcScreen.textContent = "";
  updateDisplay();
});

const deleteDigit = () => {
  if (displayValue !== "") {
    displayValue = displayValue.toString().slice(0, -1);
    if (!operator) {
      firstNumber = firstNumber.toString().slice(0, -1);
    } else {
      secondNumber = secondNumber.toString().slice(0, -1);
    }
    updateDisplay();
  }
};

deleteButton.addEventListener("click", () => {
  deleteDigit();
});

function handleKeyboard(event) {
  const key = event.key;
  if (key === "+" || key === "-" || key === "/" || key === "*") {
    setOperator(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteDigit();
  } else if (key === ".") {
    appendNumber(key);
  } else if (key >= "0" && key <= "9") {
    appendNumber(key);
  }
}
document.addEventListener("keydown", handleKeyboard);

updateDisplay();
