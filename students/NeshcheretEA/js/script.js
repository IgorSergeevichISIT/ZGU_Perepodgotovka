window.onload = function () {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

// окно вывода результата
    outputElement = document.getElementById("result")
    perc_btn = document.getElementById("btn_op_percent")

    function OutputElementForResult(a, b, selectedOperation) {
        if (a === '' || a === '.') {
            return ((a[0] === '.') ? 0 + a : a)
        } else {
            if (!selectedOperation) {
                return ((a[0] === '.') ? 0 + a : a)
            } else {
                if (b === '' || b === '.') {
                    return ((a[0] === '.') ? 0 + a : a) + selectedOperation + ((b[0] === '.') ? 0 + b : b)
                } else {
                    return ((a[0] === '.') ? 0 + a : a) + selectedOperation + ((b[0] === '.') ? 0 + b : b)
                }
            }
        }
    }

    function GetExpressionResult(selectedOperation) {
        switch (selectedOperation) {
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
    }

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation);
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit
            }
            outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation);
        }
    }

    perc_btn.onclick = function () {
        if (a === '' || b === '') return
        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b) / 100
                break;
            case '+':
                expressionResult = (+a) + a * (+b) / 100
                break;
            case '-':
                expressionResult = (+a) - a * (+b) / 100
                break;
            case '/':
                expressionResult = (+a) / (+b) / 100
                break;
        }
        outputElement.innerHTML = expressionResult.toString()
    }

// устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

// установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function () {
        if (a === '' || a === '.') return
        if (!selectedOperation) {
            selectedOperation = 'x'
        } else {
            GetExpressionResult(selectedOperation)
            a = expressionResult
            selectedOperation = 'x'
            b = ''
        }
        outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation)
    }
    document.getElementById("btn_op_plus").onclick = function () {
        if (a === '' || a === '.') return
        if (!selectedOperation) {
            selectedOperation = '+'
        } else {
            GetExpressionResult(selectedOperation)
            a = expressionResult
            selectedOperation = '+'
            b = ''
        }
        outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation)
    }
    document.getElementById("btn_op_minus").onclick = function () {
        if (a === '' || a === '.') return
        if (!selectedOperation) {
            selectedOperation = '-'
        } else {
            GetExpressionResult(selectedOperation)
            a = expressionResult
            selectedOperation = '-'
            b = ''
        }
        outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation)
    }
    document.getElementById("btn_op_div").onclick = function () {
        if (a === '' || a === '.') return
        if (!selectedOperation) {
            selectedOperation = '/'
        } else {
            GetExpressionResult(selectedOperation)
            a = expressionResult
            selectedOperation = '/'
            b = ''
        }
        outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation)
    }
// кнопка +/-
    document.getElementById("btn_op_sign").onclick = function () {
        if (a === '') return
        if (!selectedOperation) {
            a = -a
            outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation)
        } else {
            b = -b
            outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation)
        }
    }
// кнопка очищения
    document.getElementById("btn_op_clear").onclick = function () {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

// кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation)
            return
        GetExpressionResult(selectedOperation)
        a = expressionResult
        b = ''
        selectedOperation = null

        outputElement.innerHTML = OutputElementForResult(a, b, selectedOperation)
    }
};