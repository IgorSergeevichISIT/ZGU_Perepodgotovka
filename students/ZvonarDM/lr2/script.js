// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    //кнопка +/-
    document.getElementById("btn_op_sign").onclick = function () {
        if (selectedOperation === null) {
          if (a != '') {
            a = (-a).toString();
            outputElement.innerHTML = a;
          }
        } else {
          if (b != '') {
            b = (-b).toString();
            outputElement.innerHTML = b;
          }
        }
      }
    //кнопка процента
    document.getElementById('btn_op_percent').onclick = function () {
        if (selectedOperation === null) {
          if (a != '') {
            a = (parseFloat(a) / 100).toString();
            outputElement.innerHTML = a;
          }
        } else {
          if (b != '') {
            b = ((parseFloat(b) * parseFloat(a)) / 100).toString();
            outputElement.innerHTML = b;
          }
        }
      }
//удаление одного символа
    document.getElementById('delOne').onclick = function() {
            if (selectedOperation === null) {
                // Если не выбрана операция, удаляем последнюю цифру из a
                a = a.slice(0, -1);
                outputElement.innerHTML = a;
            } else {
                // Если выбрана операция, удаляем последнюю цифру из b
                b = b.slice(0, -1);
                outputElement.innerHTML = b;
            }
        };
//квадратный корень
    document.getElementById('corenb').onclick = function() {
      if (selectedOperation === null) {
          if (a !== '') {
              a = Math.sqrt(parseFloat(a)).toString();
              outputElement.innerHTML = a;
          }
      } else if (b !== '') {
          b = Math.sqrt(parseFloat(b)).toString();
          outputElement.innerHTML = b;
      }
    };
//возведение в степень
    document.getElementById('stepenb').onclick = function() {
            if (selectedOperation === null) {
              a = Math.pow(parseFloat(a), 2).toString();
              outputElement.innerHTML = a;
            } else if (b !== '') {
              b = Math.pow(parseFloat(b), 2).toString();
              outputElement.innerHTML = b;
            }
          };
//факториал
    document.getElementById('fact').onclick = function() {
        if (a) {
            a = calculateFactorial(parseFloat(a)).toString();
            outputElement.innerHTML = a;
          } else if (b !== '') {
            b = calculateFactorial(parseFloat(b)).toString();
            outputElement.innerHTML = b;
          }
        };
        function calculateFactorial(number) {
          if (number < 0) {
            return "Error";
          } else if (number === 0) {
            return "1";
          } else {
            let result = 1;
            for (let i = 1; i <= number; i++) {
              result *= i;
            }
            return result;
          }
        };
//Агент 000
          document.getElementById('agent').onclick = function() {
            if (selectedOperation === null) {
              a =  a + "000";
              outputElement.innerHTML = a;
            } else {
              b = b + "000";
              outputElement.innerHTML = b;
            }
          };
//смена темы results
document.getElementById('resultstheme').onclick = function() {
    const bodyElement = document.querySelector(".result");
    const currentBackgroundColor = getComputedStyle(bodyElement).backgroundColor;

    let newBackgroundColor;
    if (currentBackgroundColor === "rgb(46, 159, 252)") {
      newBackgroundColor = "#a6a6a6"; 
    } else {
      newBackgroundColor = "rgb(46, 159, 252)";
    }
  
    bodyElement.style.backgroundColor = newBackgroundColor;
  };

//смена фона
  document.getElementById("backtheme").onclick = function() {
    const bodyElement = document.querySelector(".body");
    const currentBackgroundColor = getComputedStyle(bodyElement).backgroundColor;
    const currentBackgroundImage = getComputedStyle(bodyElement).backgroundImage;
    bodyElement.style.backgroundImage = "url('wallp2.jpg')";
    let newBackgroundColor;
    if (currentBackgroundColor === "rgb(0, 0, 0)") {
      newBackgroundColor = "rgb(128, 128, 128)"; 
    } else {
      newBackgroundColor = "rgb(0, 0, 0)"; 
    }
    bodyElement.style.backgroundColor = newBackgroundColor;
};
    


};




//Запрограммируйте операцию смены знака +/-; 90
//Запрограммируйте операцию вычисления процента %;  104  
//Добавьте кнопку стирания введенной цифры назад (backspace). Расположить кнопку можно, например, на месте нерабочих +/- и % кнопок; 118
//Сделайте смену цвета фона по кнопке;  200
//Запрограммируйте операцию вычисления квадратного корня √; 130
//Запрограммируйте операцию возведения в квадрат x²;142
//Запрограммируйте операцию вычисления факториала x!; 152
//Добавьте кнопку, которая за раз добавляет сразу три нуля (000); 175
//Запрограммируйте накапливаемое сложние; 
//Запрограммируйте накапливаемое вычитание;
//Сделайте смену цвета окна вывода результата по кнопке. 185
