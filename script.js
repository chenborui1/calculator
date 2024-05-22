const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
display.textContent = "0";
let number_one = [];
let number_two = [];
let operator = null;
let state = false;
function operate(num1, num2, operator) {
  num1 = parseFloat(num1.join(""));
  num2 = parseFloat(num2.join(""));
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      if (num2 == 0) {
        return "XD";
      }
      let answer = num1 / num2;
      
      if (answer % 2 != 0) {
        answer = answer.toFixed(2);
      }
      return answer;
    case "*":
      return num1 * num2;
  }
}

function add_number(number) {
  console.log(number);

  if (operator == null) {
    if (number_one.length == 1 && number_one[0] == "0") {
      number_one[0] = number;
    } else {
      if (state) {
        number_one = [];
        number_one.push(number);
      } else {
        number_one.push(number);
      }
    }
    display.textContent = number_one.join("");
  } else {
    if (number_two.length == 1 && number_two[0] == "0") {
      number_two[0] = number;
    } else {
      number_two.push(number);
    }
    display.textContent = number_two.join("");
  }
  state = false;
  console.log(number_one);
  console.log(number_two);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const button_value = button.textContent;
    const numbers = "1234567890";
    if (numbers.includes(button_value)) {
      add_number(button_value);
    } else {
      switch (button_value) {
        case "=":
          if (number_one != null && number_two != null && operator != null) {
            let answer = operate(number_one, number_two, operator).toString();
            if (answer == "XD") {
              display.textContent = answer;
              number_one = [];
              number_two = [];
              operator = null;
              break;
            }

            if (answer.length <= 9) {
              display.textContent = answer;
              number_one = answer.split();
              console.log(number_one);
            } else {
              display.textContent = "NaN";
              number_one = [];
            }

            number_two = [];
            operator = null;
            state = true;
          }

          break;
        case "AC":
          display.textContent = "0";
          number_one = [];
          number_two = [];
          operator = null;
          state = false;
          break;
        case "+":
          operator = "+";
          break;
        case "-":
          operator = "-";
          break;
        case "*":
          operator = "*";
          break;
        case "/":
          operator = "/";
          break;
        case ".":
          let current_num = display.textContent;

          if (
            current_num == number_one.join("") &&
            !number_one.join("").includes(".") &&
            !state
          ) {
            number_one.push(".");
            display.textContent = number_one.join("");
          } else if (
            current_num == number_two.join("") &&
            !number_two.join("").includes(".") &&
            !state
          ) {
            number_two.push(".");
            display.textContent = number_two.join("");
          }
          break;
        case "+/-":
            let display_num = display.textContent
            if (display_num == "0") {
                break;
            }
            if (display_num.includes("-")) {
                if (
                    display_num == number_one.join("") &&
                    !state
                  ) {
                    number_one[0] = ""
                    display.textContent = number_one.join("");
                  } else if (
                    display_num == number_two.join("") &&
                    !state
                  ) {
                    number_two[0] = ""
                    display.textContent = number_two.join("");
                  }
                  break;
            }
            if (
                display_num == number_one.join("") &&
                display_num.length < 9 &&
                !state
              ) {
                number_one.unshift("-");
                display.textContent = number_one.join("");
              } else if (
                display_num == number_two.join("") &&
                display_num.length < 9 &&
                !state
              ) {
                number_two.unshift("-");
                display.textContent = number_two.join("");
              }
            break;
        case "%":
            let displaying_num = display.textContent
            if (displaying_num.length >= 7) {
                break;
            }
            if (displaying_num == number_one.join("") && !state) {
                let answer = parseFloat(displaying_num) / 100;
                number_one = []
                number_one = answer.toString().split()
                display.textContent = number_one.join("");
                break;
            }
            if (displaying_num == number_two.join("") && !state) {
                let answer = parseFloat(displaying_num) / 100;
                number_two = []
                number_two = answer.toString().split()
                display.textContent = number_two.join("");
                break;
            }
      }
    }
  });
});
