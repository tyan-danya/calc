function calculator(expression) {
  expression = expression.replace(/ /g, "");
  let numbers = new Array();
  let numbersKey = 0;
  let symbols = new Array();
  let symbolsKey = 0;
  let tempString = "";
  for (let i = 0; i < expression.length; i++) {
    if (!isNaN(parseInt(expression[i]))) {
      tempString += expression[i];
    } else {
      symbols[symbolsKey] = expression[i];
      symbolsKey++;
      numbers[numbersKey] = parseInt(tempString);
      tempString = "";
      numbersKey++;
    }
  }
  numbers[numbersKey] = parseInt(tempString);
  //console.log(numbers);
  //console.log(symbols);
  console.log("___");
  while (symbols.length != 0){
    console.log(symbols);
  console.log(numbers);
  if (symbols[i] == "+") {
    let tempNumber = numbers[i] + numbers[i + 1];
    //console.log(tempNumber);
    numbers[i] = tempNumber;
  } else if (symbols[i] == "-") {
    let tempNumber = numbers[i] - numbers[i + 1];
    numbers[i] = tempNumber;
  }
  for (let j = i; j < numbers.length; j++) {
    numbers[i + 1] = numbers[i + 2];
  }
  for (let j = i; j < symbols.length; j++) {
    symbols[i + 1] = symbols[i + 2];
  }
  numbers.pop();
  symbols.pop();
  console.log(symbols);
  console.log(numbers);
  console.log("___");
  //i--;
}
return numbers;
}

var button = document.getElementsByClassName("button")[0];
button.addEventListener("click", function() {
  let textBox = document.getElementsByClassName("textbox")[0];
  let calculationString = textBox.value;
  console.log(calculator(calculationString));
});