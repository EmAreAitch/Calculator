const numbers = document.querySelectorAll(".number");
const _calculation = document.querySelector('.calculation')
const operators = document.querySelectorAll(".operator");
const result = document.querySelector(".result");
const allClear = document.querySelector('.allClear');
const clear = document.querySelector('.clear')
const equal = document.querySelector('.equal');
const dot = document.querySelector('.dot');
const brackets = document.querySelector('.brackets')
const minus = document.querySelector('.minus')

oBracNo = 0;
cBracNo = 0;
// let input = [];
function calculation(equation) {
    if (!(equation.includes(" ÷ 0"))) {
    input = equation.split(' ');
    input = input.map(item => {
        if (!isNaN(+item)) {
            return +item;
        }     
        else return item;
    });

    bracketsCalc(input)
    tier1Calc(input);
    tier2Calc(input);

    result.textContent = Math.round(input[0]*100)/100;}
    
    else alert("Don't divide by zero you RETARD!!");
}

function tier1Calc(equ) {
    tier1 = equ.filter(item => item == '÷' || item == '×' || item == '%');
    tier1.forEach(element => {
        arg1 = equ[equ.indexOf(element)-1];
        arg2 = equ[equ.indexOf(element)+1] || 1;
        let ans;
        if (element == '×') {
            ans = arg1 * arg2;

            equ.splice(equ.indexOf(element)-1, 3, ans);
        }
        else if (element == '÷') {
            ans = arg1 / arg2;
            equ.splice(equ.indexOf(element)-1, 3, ans);
        }
        else if (element == '%') {
            ans = arg1 * arg2 / 100;
            equ.splice(equ.indexOf(element)-1, 3, ans);
        }
    });
}

function tier2Calc(equ) {
    tier2 = equ.filter(item => item == '+' || item == '-');
    tier2.forEach(element => {
        arg1 = equ[equ.indexOf(element)-1];
        arg2 = equ[equ.indexOf(element)+1];
        let ans = 0;
        if (element == '+') {
            ans = arg1 + arg2;
            equ.splice(equ.indexOf(element)-1, 3, ans);
        }
        else if (element == '-') {
            ans = arg1 - arg2;
            equ.splice(equ.indexOf(element)-1, 3, ans);
        }
    });
}

function bracketsCalc(equ) {
    oBrac = equ.lastIndexOf('(')
    while (oBrac !== -1) {
        // oBrac = input.lastIndexOf('(')
        cBrac = equ.indexOf(')') !== -1 ? equ.indexOf(')') : equ.length
        bracEqu = equ.slice((oBrac+1),cBrac)
        tier1Calc(bracEqu)
        tier2Calc(bracEqu)
        equ.splice(oBrac, cBrac-oBrac+1 || equ.length , bracEqu[0])
        oBrac = equ.lastIndexOf('(')
    }
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
    oBracNo = 0;
    cBracNo = 0;
})

clear.addEventListener('click', () => {
    !isNaN(parseInt(_calculation.textContent.slice(-1)))
    ? _calculation.textContent = _calculation.textContent.slice(0,-1)
    : _calculation.textContent.slice(-2).includes('( ') || _calculation.textContent.slice(-2).includes(' )')
        ? _calculation.textContent = _calculation.textContent.slice(0,-2)
        : _calculation.textContent = _calculation.textContent.slice(0,-3);
})

equal.addEventListener('click', () => {
    _calculation.textContent != '' && _calculation.textContent.slice(-1) !== ' '
     ? calculation(_calculation.textContent) : alert("Error!!");
})

dot.addEventListener('click', (e) => {
        _calculation.textContent !== '' && _calculation.textContent.slice(-1) !== ' '
        ? _calculation.textContent.includes('.', _calculation.textContent.lastIndexOf(' '))
            ? alert('Invalid')
            : _calculation.textContent += '.'
        : _calculation.textContent += '0.'
       })

brackets.addEventListener('click', () => {
     _calculation.textContent !== '' && _calculation.textContent.slice(-1) !== ' '
    ? oBracNo > cBracNo
        ? (_calculation.textContent += ' )', cBracNo++)
        : (_calculation.textContent += ' × ( ', oBracNo++)
    : (_calculation.textContent += '( ',oBracNo++)
})