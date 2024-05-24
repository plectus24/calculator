let firstNumber, secondNumber, operator;
let inputDisplay = document.querySelector(".input");
// allows keyboard edits on div
inputDisplay.contentEditable = true;
let resultDisplay = document.querySelector(".result");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const backButton = document.querySelector(".back");
const floatButton = document.querySelector(".float");
// Regex for operation
const REGEX = /^(\d+)([+\-*/])(\d+)$/;
//Regex for double operands
var REGEX2 = /^[^+\-*/]*(?:[+\-*/][^+\-*/]*)?[+\-*/][^+\-*/]*$/;

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
    //   e.target.className === "item operand" &&
    //   resultDisplay.textContent === "WRONG OPERATION"
    // ) {
    //   console.log("swderfgwe");
    // }

    console.log(e.target.textContent);
    inputDisplay.textContent += e.target.textContent;
  });
});

//Separate user input into 3 value
function parseInput(text) {
  console.log(text);
  //regular expression to identify operator

  const match = text.match(REGEX);
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
floatButton.addEventListener("click", (e) => {
  inputDisplay.textContent += ".";
});
