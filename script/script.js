function calculator(expression) {
  let result = expression;
  result = expression.replace(/ /g, "");
  let numbers = new Array();
  let numbersKey = 0;
  let symbols = new Array();
  let symbolsKey = 0;
  let tempString = "";
  for (let i = 0; i < result.length; i++) {
    if (!isNaN(parseInt(result[i]))) {
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
    if (symbols[i] == "*") {
      let tempNumber = numbers[i] * numbers[i + 1];
      numbers[i] = tempNumber;
    } else if (symbols[i] == "/") {
      let tempNumber = numbers[i] / numbers[i + 1];
      numbers[i] = tempNumber;
    }
    if (symbols[i] == "*" || symbols[i] == "/") {
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
    if (symbols[i] == "+") {
      let tempNumber = numbers[i] + numbers[i + 1];
      numbers[i] = tempNumber;
    } else if (symbols[i] == "-") {
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
  calculator(calculationString);
});