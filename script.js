var x = y = activeOperator = null,
    delCount = false,
    shiftOperator = false,
    divideByZero = "can't  divide by zero",
    limitText = "Limit is exceeded",
    operatorsList = {
      multiplication: function (x, y) {
        return x * y;
      },
      minus: function (x, y) {
        return x - y;
      },

      plus: function (x, y) {
        return x + y;
      },

      division: function (x, y) {
        if (y == 0) {
          return divideByZero;
        }
        return x / y;
      },

      plusMinus: function () {
        answer.innerHTML = -parseFloat(answer.innerHTML);
      },

      c: function () {
        x = y = activeOperator = nextActivOperator = delCount = null;
        answer.innerHTML = "0";
        solveString.innerHTML = "";
      },

      ce: function () {
          answer.innerHTML = "0";
      },

      backspace: function () {
        if (answer.innerHTML.length == 1) {
           answer.innerHTML = 0;
           return false;
        }

        if (answer.innerHTML.indexOf("e") > -1) {
            return false;
        }

        if (isNaN(answer.innerHTML)) {
          return false;
        }

        answer.innerHTML = answer.innerHTML.substring(0, answer.innerHTML.length - 1);
      },

      equal: function (dataOperator, nextDataOperator) {

        if (dataOperator && nextDataOperator) {

          if (x != null) {
           y = parseFloat(answer.innerHTML);
          } else {
           return false;
          }

          sortingObj.dataOperator(dataOperator, x, y);

          delCount = null;
          shiftOperator = false;

          return false;
        }

        if (x != null) {
          if (solveString.innerHTML) {
            y = parseFloat(answer.innerHTML);
          }
        } else {
         return false;
        }

        sortingObj.dataOperator(dataOperator, x, y);

        if (y) {
         solveString.innerHTML = "";
        }

        nextActivOperator = delCount = null;
        shiftOperator = false;
      },

      point: function () {
          var answerNumber = parseFloat(answer.innerHTML);

          if (answer.innerHTML.indexOf(".") > -1) {
            return false;
          }


          if (answerNumber < 0) {
            answerNumber = -answerNumber;
          }

          if (answerNumber > 0 && answerNumber / Math.floor(answerNumber) == 1) {
            answer.innerHTML += ".";
          }

          if (answerNumber == 0) {
            answer.innerHTML += ".";
          }
      }
    },
    sortingObj = {
      dataOperator: function (name, x1, y1) {
        if (typeof operatorsList[name] === "function") {

          addSolveString(" " + y1);

          var answerNumber = operatorsList[name](x1, y1);

          answerNumber = float(answerNumber, x, y);

          answerNumber = answerNumber.toString();


          if (answerNumber.length > 15 && answerNumber != divideByZero) {
            answerNumber = parseFloat(answerNumber).toExponential(9);
          }

          if (isNaN(answerNumber) && answerNumber != divideByZero) {
            answerNumber = "Result is undefined";
          }

          if (answer.innerHTML == limitText) {
            return false;
          }

          if (answerNumber == Infinity) {
            answerNumber = limitText;
          }



          answer.innerHTML = answerNumber;

          x = parseFloat(answerNumber);
        }
      },
      stringsOperator: function (name, x, y) {
        if (typeof operatorsList[name] === "function") {
          operatorsList[name](x, y);
        }
      },
      keyPress: function (name) {
        if (typeof keyList[name] === "function") {
          keyList[name]();
        }
      }
    },
    keyList = {
      "96": function () {
        document.getElementById('0').click();
        animationButton("0");
      },
      "97": function () {
        document.getElementById('1').click();
        animationButton("1");
      },
      "98": function () {
        document.getElementById('2').click();
        animationButton("2");
      },
      "99": function () {
        document.getElementById('3').click();
        animationButton("3");
      },
      "100": function () {
        document.getElementById('4').click();
        animationButton("4");
      },
      "101": function () {
        document.getElementById('5').click();
        animationButton("5");
      },
      "102": function () {
        document.getElementById('6').click();
        animationButton("6");
      },
      "103": function () {
        document.getElementById('7').click();
        animationButton("7");
      },
      "104": function () {
        document.getElementById('8').click();
        animationButton("8");
      },
      "105": function () {
        document.getElementById('9').click();
        animationButton("9");
      },
      "27": function () {
        document.getElementById('c').click();
        animationButton("c");
      },
      "8": function () {
        document.getElementById('backspace').click();
        animationButton("backspace");
      },
      "111": function () {
        document.getElementById('division').click();
        animationButton("division");
      },
      "106": function () {
        document.getElementById('multiplication').click();
        animationButton("multiplication");
      },
      "109": function () {
        document.getElementById('minus').click();
        animationButton("minus");
      },
      "107": function () {
        document.getElementById('plus').click();
        animationButton("plus");
      },
      "13": function () {
        document.getElementById('equal').click();
        animationButton("equal");
      },
      "110": function () {
        document.getElementById('point').click();
        animationButton("point");
      },
    };

    function float(answer, x, y) {
      var count = yLength = xLength = 0;

      if (x < 1 && x > -1) {
        if (x > 0) {
          while (x < 1) {
            x = x * 10;
            count++;
          }
          xLength = count;
        }

        if (x < 0) {
          while (x > -1) {
            x = x * 10;
            count++;
          }
        }
        xLength = count;
      }

      if (y < 1 && y > -1) {
        count = 0;

        if (y > 0) {
          while (y < 1) {
            y = y * 10;
            count++;
          }
          yLength = count;
        }

        if (y < 0) {
          while (y > -1) {
            y = y * 10;
            count++;
          }
          yLength = count;
        }
      }

      if (yLength == 0 && xLength == 0) {
        return answer;
      }

      if (yLength >= xLength) {
        return parseFloat(answer).toFixed(yLength);
      }

      if (xLength >= yLength) {
        return parseFloat(answer).toFixed(xLength);
      }
    }

function addSolveString(text) {
  if (answer.innerHTML == "Limit is exceeded") {
    return false;
  }

  var text = solveString.innerHTML + text;

  if (text.length > 34) {
    text = "..." + text.substring(text.length - 34);
  }

  solveString.innerHTML = text;
}

function animationButton(id) {
  document.getElementById(id).style.backgroundColor = "#B8B8B8";
  setTimeout (function () {
    document.getElementById(id).style.backgroundColor = "";
  }, 100);
}

window.onclick = function (e) {
  var target = e.target;

  if (target.className == "numbers") {

    if (shiftOperator) {
      answer.innerHTML = "";
      shiftOperator = false;
    }

    if (activeOperator && !delCount) {
      answer.innerHTML = "";
      delCount = true;
    }

    if (answer.innerHTML == "0") {
      answer.innerHTML = "";
    }

    if (answer.innerHTML.length > 15) {
      return false;
    }

    answer.innerHTML += target.innerHTML;
  }

  if (target.hasAttribute("data-operator")) {

      if (target.getAttribute("data-operator") != "equal") {

        if (activeOperator && solveString.innerHTML) {
          var nextActivOperator = target.getAttribute("data-operator");
          operatorsList.equal(activeOperator, nextActivOperator);
          addSolveString(" " + target.innerHTML)
          shiftOperator = true;
          return false;
        }

        if (!nextActivOperator) {
          x = parseFloat(answer.innerHTML);
          addSolveString(" " + answer.innerHTML + " " + target.innerHTML);
          activeOperator = target.getAttribute("data-operator");
        }

      }

      shiftOperator = true;

      if (target.getAttribute("data-operator") == "equal") {
        operatorsList.equal(activeOperator);
        return false;
      }
  }

  if (target.hasAttribute("strings-operator")) {
    sortingObj.stringsOperator(target.getAttribute("strings-operator"));
  }
};

window.onkeydown = function (e) {
  sortingObj.keyPress(e.keyCode);
};
