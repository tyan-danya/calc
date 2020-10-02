function isOper(symbol) {
  if (symbol === "+" || symbol === "-" || symbol === "/" || symbol === "*") {
    return true;
  } else {
    return false;
  }
}


function checkExpression(expression) {
  result = expression.replace(/ /g, "");
  while (result.indexOf('(') !== -1) {
    let firstBracket = result.indexOf('(');
    let secondBracket = result.indexOf(')');
    if (secondBracket === -1)
      return false;
    let subexpression = result.substring(firstBracket + 1, secondBracket);
    let _result = result;
    if (checkExpression(subexpression)) {
      result = _result.substring(0, firstBracket) + "0" + _result.substring(secondBracket + 1, _result.length);

    } else {
      return false;
    }
  }
  if (result.indexOf(')') !== -1)
    return false;
  for (let i = 0; i < result.length; i++) {
    if (isNaN(parseInt(result[i])) && !isOper(result[i])) {
      return false;
    }
    if (isNaN(parseInt(result[i])) && isNaN(parseInt(result[i + 1]))) {
      return false;
    }
  }
  return true;
}

function calculator(expression) {
  if (!checkExpression(expression)) {
    return false;
  }
  let result = expression;
  result = expression.replace(/ /g, "");
  while (result.indexOf('(') !== -1) {
    let firstBracket = result.indexOf('(');
    let secondBracket = result.indexOf(')');
    let subexpression = result.substring(firstBracket + 1, secondBracket);
    result = result.substring(0, firstBracket) + calculator(subexpression) + result.substring(secondBracket + 1, result.length);
  }
  console.log(result);
  if (result.indexOf("/0") !== -1) {
    return false;
  }
  let numbers = new Array();
  let numbersKey = 0;
  let symbols = new Array();
  let symbolsKey = 0;
  let tempString = "";
  for (let i = 0; i < result.length; i++) {
    if (!isNaN(parseInt(result[i])) || tempString === "") {
      tempString += result[i];
    } else {
      symbols[symbolsKey] = result[i];
      symbolsKey++;
      numbers[numbersKey] = parseInt(tempString);
      tempString = "";
      numbersKey++;
    }
  }
  numbers[numbersKey] = parseInt(tempString);
  // умножение/деление
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] === "*") {
      let tempNumber = numbers[i] * numbers[i + 1];
      numbers[i] = tempNumber;
    } else if (symbols[i] === "/") {
      let tempNumber = numbers[i] / numbers[i + 1];
      numbers[i] = tempNumber;
    }
    if (symbols[i] === "*" || symbols[i] === "/") {
      for (let j = i; j < numbers.length - 1; j++) {
        numbers[j + 1] = numbers[j + 2];
      }
      numbers.pop();
      for (let j = i; j < symbols.length; j++) {
        symbols[j] = symbols[j + 1];
      }
      symbols.pop();
      i--;
    }
  }
  // сложение/вычитание
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] === "+") {
      let tempNumber = numbers[i] + numbers[i + 1];
      numbers[i] = tempNumber;
    } else if (symbols[i] === "-") {
      let tempNumber = numbers[i] - numbers[i + 1];
      numbers[i] = tempNumber;
    }
    for (let j = i; j < numbers.length - 1; j++) {
      numbers[j + 1] = numbers[j + 2];
    }
    numbers.pop();
    for (let j = i; j < symbols.length; j++) {
      symbols[j] = symbols[j + 1];
    }
    symbols.pop();
    i--;
  }
  result = numbers[0];
  return result;
}

var button = document.getElementsByClassName("button")[0];
button.addEventListener("click", function() {
  let textBox = document.getElementsByClassName("textbox")[0];
  let calculationString = textBox.value;
  let result = calculator(calculationString);
  let resDiv = document.getElementsByClassName("result")[0];
  resDiv.innerHTML = result;
});