let firstNumber, secondNumber, operator;
let inputDisplay = document.querySelector(".input");
let resultDisplay = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(firstNumber, secondNumber, operator) {
  console.log(firstNumber + "  " + secondNumber + "  " + operator);
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return substract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);

    default:
      return "OPERATOR NOT FOUND";
  }
}

const itemButtons = [...document.querySelectorAll(".item")];
// const operandButtons = [...document.querySelectorAll(".operands>button")];

// Append number or operand to display on button click
itemButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(e.target.textContent);
    inputDisplay.textContent += e.target.textContent;
  });
});

//Separate user input into 3 value
function parseInput(text) {
  console.log(text);
  //regular expression to identify operator
  const regex = /^(\d+)([+\-*/])(\d+)$/;
  const match = text.match(regex);
  // match[1] = number1, match[2] = operator, match[3] = number2
  if (match) {
    return match;
  } else {
    return "Invalid format";
  }
}

// clear button
clearButton.addEventListener("click", (e) => {
  resultDisplay.textContent = "";
  inputDisplay.textContent = "";
  return 1;
});
//equal button
equalButton.addEventListener("click", (e) => {
  const operation = parseInput(inputDisplay.textContent);
  console.log(operation[2]);
  const result = operate(
    parseInt(operation[1]),
    parseInt(operation[3]),
    operation[2]
  );
  return (resultDisplay.textContent = result);
});
