var numbArray = [];
var flag = 0;

function addThing(x) {
  if (flag == 0) {
    console.log(x.innerHTML, "Added numb to array");
    numbArray.push(Number(x.innerHTML));
    console.log(numbArray);
    flag = 1;
  } else {
    console.log(numbArray.length - 1, "Merging numbers", x.innerHTML);
    if (x.innerHTML === "-" && isNaN(numbArray[numbArray.length - 1])) {
      numbArray.push(x.innerHTML);
    } else {
      numbArray[numbArray.length - 1] =
        Number(numbArray[numbArray.length - 1]) * 10 + Number(x.innerHTML);
    }
    console.log(numbArray);
  }
  updateDisplay(numbArray.join(" "));
}

function addSymbol(x) {
  flag = 0;
  if (x.innerHTML === "=") {
    let result = calculateResult();
    console.log(result);
    numbArray = [result];
  } else {
    numbArray.push(x.innerHTML);
  }

  updateDisplay(numbArray.join(" "));
}
function calculateResult() {
  let numStack = [];
  let opStack = [];

  for (let i = 0; i < numbArray.length; i++) {
    let currentElement = numbArray[i];

    if (!isNaN(currentElement)) {
      numStack.push(Number(currentElement));
    } else {
      while (
        opStack.length > 0 &&
        precedence(opStack[opStack.length - 1]) >= precedence(currentElement)
      ) {
        compute(numStack, opStack);
      }
      opStack.push(currentElement);
    }
  }

  while (opStack.length > 0) {
    compute(numStack, opStack);
  }

  return numStack.pop();
}

function precedence(op) {
  if (op === "+" || op === "-") {
    return 1;
  } else if (op === "*" || op === "/") {
    return 2;
  } else if (op === "^") {
    return 3;
  } else {
    return 0;
  }
}

function compute(numStack, opStack) {
  let num2 = numStack.pop();
  let num1 = numStack.pop();
  let op = opStack.pop();

  switch (op) {
    case "+":
      numStack.push(num1 + num2);
      break;
    case "-":
      numStack.push(num1 - num2);
      break;
    case "*":
      numStack.push(num1 * num2);
      break;
    case "÷":
      numStack.push(num1 / num2);
      break;
    case "^":
      numStack.push(Math.pow(num1, num2));
      break;
  }
}

function updateDisplay() {
  document.getElementById("display").innerHTML = numbArray.join(" ");
}

function clearDisplay() {
  document.getElementById("display").innerHTML = "0";
  numbArray = [];
  flag = 0;
  updateDisplay();
  console.log(numbArray);
}
