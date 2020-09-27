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
  console.log(numbers);
  console.log(symbols);
  for (let i = symbolsKey; i >= 0; i--) {
    if (symbols[i] == "+") {
      let tempNumber = numbers[i] + numbers[i + 1];
      numbers[i] = tempNumber;
    } else if (symbols[i] == "-") {
      let tempNumber = numbers[i] - numbers[i + 1];
      numbers[i] = tempNumber;
    }
  }
  return result;
}

var button = document.getElementsByClassName("button")[0];
button.addEventListener("click", function() {
  let textBox = document.getElementsByClassName("textbox")[0];
  let calculationString = textBox.value;
  console.log(calculator(calculationString));
});