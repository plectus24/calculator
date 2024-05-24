let firstNumber, secondNumber, operator;
let inputDisplay = document.querySelector(".input");
// allows keyboard edits on div
inputDisplay.contentEditable = true;
let resultDisplay = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const backButton = document.querySelector(".back");
const floatButton = document.querySelector(".float");

const operators = /[+\-*\/]/;
// Regex for operation
// const REGEX = /^(\d+)([+\-*/])(\d+)$/;

//New regex for floating points
const REGEX = /(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)/;
//Regex for double operands
var REGEX2 = /^[^+\-*/]*(?:[+\-*/][^+\-*/]*)?[+\-*/][^+\-*/]*$/;

//regex float
const REGEX3 = /^[-+]?\d*\.?\d+([-+*/][-+]?\d*\.?\d+)?$/;

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
  if (num2 === 0) {
    return "REALLY?";
  }
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
      return "WRONG OPERATION";
  }
}

const itemButtons = [...document.querySelectorAll(".item")];
// const operandButtons = [...document.querySelectorAll(".operands>button")];

// Append number or operand to display on button click
itemButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    //check if result display is not empty --START IF
    //if it is not, check if button pressed is numbers or operand --START IF
    // if its operand, add the curent result as the first argument in display, then the operand clicked --END IF
    // else if its a number, simply add the number to the input field --ELSE IF
    //                                                                --END ELSE IF

    //if result display is empty --ELSE
    //just append clicked button to input field
    if (
      resultDisplay.textContent !== "" &&
      resultDisplay !== "WRONG OPERATION" &&
      resultDisplay !== "REALLY?"
    ) {
      if (e.target.className === "item number") {
        console.log("number pressed");
        resultDisplay.textContent = "";
      } else {
        //if an opperand is pressed when result text is wrong
        // delete result text and prevent user from adding operand
        if (
          (resultDisplay.textContent === "WRONG OPERATION" ||
            resultDisplay.textContent === "REALLY?") &&
          e.target.className === "item operand"
        ) {
          resultDisplay.textContent = "";
          e.preventDefault();
          return false;
        }
        console.log("operand pressed");
        inputDisplay.textContent =
          resultDisplay.textContent + inputDisplay.textContent;
        resultDisplay.textContent = "";
      }
    }

    // if an operand is pressed when there is already an operand
    // Ignore the additional button press
    if (
      e.target.className === "item operand" &&
      inputDisplay.textContent.match(REGEX2)
    ) {
      e.preventDefault();
      return false;
    }

    // if (
    //   e.target.className === ".float" &&
    //   inputDisplay.textContent.match(REGEX3)
    // ) {
    //   e.preventDefault();
    //   return false;
    // }
    // if (
    //   e.target.className === "item operand" &&
    //   resultDisplay.textContent === "WRONG OPERATION"
    // ) {
    //   console.log("swderfgwe");
    // }
    else {
      console.log(e.target.textContent);
      inputDisplay.textContent += e.target.textContent;
    }
  });
});

//Separate user input into 3 value
function parseInput(text) {
  console.log(text);
  //regular expression to identify operator

  // const match = text.match(REGEX);
  // // match[1] = number1, match[2] = operator, match[3] = number2
  let result = text.split(operators).filter(Boolean);

  const operator = text.match(operators)[0];
  result.push(operator);
  // console.log(result);

  if (operator) {
    return result;
  } else {
    return "Invalid format";
  }
}
// Handler for keyboard enter button pressed
inputDisplay.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    equalButton.click();
  }
});
// clear button
clearButton.addEventListener("click", (e) => {
  resultDisplay.textContent = "";
  inputDisplay.textContent = "";
  return 1;
});
//equal button
equalButton.addEventListener("click", (e) => {
  const operation = parseInput(inputDisplay.textContent);
  console.log(operation);
  const result = operate(
    parseFloat(operation[0]),
    parseFloat(operation[1]),
    operation[2]
  );
  // if result is good
  if (result !== "WRONG OPERATION") {
    inputDisplay.textContent = "";
    return (resultDisplay.textContent = result);
  }

  // else if(result === "WRONG OPERATION" || result === "REALLY?"){

  // }
  else {
    return (resultDisplay.textContent = result);
  }
  //else if result is bad
});

//back button
backButton.addEventListener("click", (e) => {
  inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
});

//float button
// floatButton.addEventListener("click", (e) => {
//   inputDisplay.textContent += ".";
// });
