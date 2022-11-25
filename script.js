const numbers = document.querySelectorAll(".number");
const _calculation = document.querySelector('.calculation')
const operators = document.querySelectorAll(".operator");
const result = document.querySelector(".result");
const allClear = document.querySelector('.allClear');
const clear = document.querySelector('.clear')
const equal = document.querySelector('.equal');

// let input = [];
function calculation(equation) {
    if (!(equation.includes(" ÷ 0"))) {
    input = equation.split(' ');
    input = input.map(item => {
        if (!!(+item)) {
            return +item;
        }     
        else return item;
    });
    tier1 = input.filter(item => item == '÷' || item == '×' || item == '%');
    tier2 = input.filter(item => item == '+' || item == '-');

    tier1.forEach(element => {
        arg1 = input[input.indexOf(element)-1];
        arg2 = input[input.indexOf(element)+1] || 1;
        let ans;
        if (element == '×') {
            ans = arg1 * arg2;
            input.splice(input.indexOf(element)-1, 3, ans);
        }
        else if (element == '÷') {
            ans = arg1 / arg2;
            input.splice(input.indexOf(element)-1, 3, ans);
        }
        else if (element == '%') {
            ans = arg1 * arg2 / 100;
            input.splice(input.indexOf(element)-1, 3, ans);
        }
    });

    tier2.forEach(element => {
        arg1 = input[input.indexOf(element)-1];
        arg2 = input[input.indexOf(element)+1];
        let ans;
        if (element == '+') {
            ans = arg1 + arg2;
            input.splice(input.indexOf(element)-1, 3, ans);
        }
        else if (element == '-') {
            ans = arg1 - arg2;
            input.splice(input.indexOf(element)-1, 3, ans);
        }
    });

    result.textContent = input[0]*10/10;}
    
    else alert("Don't divide by zero you RETARD!!");
}

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        _calculation.textContent += e.target.textContent;
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        _calculation.textContent != '' 
        ? _calculation.textContent.slice(-1) !== ' ' 
            ? _calculation.textContent += e.target.textContent
            : _calculation.textContent = _calculation.textContent.slice(0,-3) + e.target.textContent
        : _calculation.textContent = ''; 
       })
})

allClear.addEventListener('click', () => {
    _calculation.textContent='';
    result.textContent='';
})

clear.addEventListener('click', () => {
    _calculation.textContent.slice(-1) !== ' ' 
    ? _calculation.textContent = _calculation.textContent.slice(0,-1)
    : _calculation.textContent = _calculation.textContent.slice(0,-3);
})

equal.addEventListener('click', () => {
    _calculation.textContent != '' ? calculation(_calculation.textContent) : alert("Error!!");
})

