const screenDisplayStored = document.querySelector(`#screen-display-stored`);
const screenDisplayCurrent = document.querySelector(`#screen-display-current`);
const screenDisplayOperator = document.querySelector(`#screen-display-operator`);
const num0Key = document.querySelector(`.numeric0`);
const num1Key = document.querySelector(`.numeric1`);
const num2Key = document.querySelector(`.numeric2`);
const num3Key = document.querySelector(`.numeric3`);
const num4Key = document.querySelector(`.numeric4`);
const num5Key = document.querySelector(`.numeric5`);
const num6Key = document.querySelector(`.numeric6`);
const num7Key = document.querySelector(`.numeric7`);
const num8Key = document.querySelector(`.numeric8`);
const num9Key = document.querySelector(`.numeric9`);
const addKey = document.querySelector(`.o-add`);
const subKey = document.querySelector(`.o-subtract`);
const mulKey = document.querySelector(`.o-multiply`);
const divKey = document.querySelector(`.o-divide`);
const equKey = document.querySelector(`.o-equals`);
const perKey = document.querySelector(`.o-percent`);
const allClearKey = document.querySelector(`.all-clear`);
const clearEntryKey = document.querySelector(`.clear-entry`);
const backspaceKey = document.querySelector(`.backspace`);
const decimalKey = document.querySelector(`.decimal`);

num0Key.addEventListener(`click`, () => { inputNumber(`0`) });
num1Key.addEventListener(`click`, () => { inputNumber(`1`) });
num2Key.addEventListener(`click`, () => { inputNumber(`2`) });
num3Key.addEventListener(`click`, () => { inputNumber(`3`) });
num4Key.addEventListener(`click`, () => { inputNumber(`4`) });
num5Key.addEventListener(`click`, () => { inputNumber(`5`) });
num6Key.addEventListener(`click`, () => { inputNumber(`6`) });
num7Key.addEventListener(`click`, () => { inputNumber(`7`) });
num8Key.addEventListener(`click`, () => { inputNumber(`8`) });
num9Key.addEventListener(`click`, () => { inputNumber(`9`) });
addKey.addEventListener(`click`, () => { operate(stored, current, "+") });
subKey.addEventListener(`click`, () => { operate(stored, current, "-") });
mulKey.addEventListener(`click`, () => { operate(stored, current, "x") });
divKey.addEventListener(`click`, () => { operate(stored, current, "/") });
equKey.addEventListener(`click`, () => { operate(stored, current, null) });
perKey.addEventListener(`click`, () => { operate(stored, current, "%") });
allClearKey.addEventListener(`click`, () => { allClear(); });
clearEntryKey.addEventListener(`click`, () => { clearEntry(); });
backspaceKey.addEventListener(`click`, () => { backspace(); });
decimalKey.addEventListener(`click`, () => { inputNumber(`.`) });



let stored = `0`;
let current = `0`;
let storedOperator = null;
updateDisplay();





function operate(a, b, operator) {

    if (storedOperator === "/" && (+a === 0 || +b === 0)) {
        alert(`Not today, buddy!`);
        allClear();
        return;
    }
    if (operator === null) {//null represents the equals operator
        switch (storedOperator) {
            case "-": current = `${(subtraction(a, b).toFixed(8) * 1000) / 1000}`; break;//store current in string so user can edit
            case "+": current = `${(addition(a, b).toFixed(8) * 1000) / 1000}`; break;
            case "x": current = `${(multiplication(a, b).toFixed(8) * 1000) / 1000}`; break;
            case "/": current = `${(division(a, b).toFixed(8) * 1000) / 1000}`; break;
            case "%": current = `${(percent(a, b).toFixed(8) * 1000) / 1000}`;
            case null: break;
        }
     
        resetStoredNumber();
    } else {
        switch (storedOperator) {
            case "-": stored = (subtraction(a, b).toFixed(8) * 1000) / 1000; break;
            case "+": stored = (addition(a, b).toFixed(8) * 1000) / 1000; break;
            case "x": stored = (multiplication(a, b).toFixed(8) * 1000) / 1000; break;
            case "/": stored = (division(a, b).toFixed(8) * 1000) / 1000; break;
            case "%": stored = (percent(a, b).toFixed(8) * 1000) / 1000;
            case null: storeCurrentNumber(); break;//store the answer in current number after pressing equals so user may edit before continuing 
        }
  
        resetCurrentNumber();
    }
    storedOperator = operator;
    updateDisplay();
}

function addition(a, b) {
    return +a + +b;
}
function subtraction(a, b) {
    return +a - +b;
}
function multiplication(a, b) {
    return +a * +b;
}

function division(a, b) {
    return +a / +b;
}

function percent(a, b) {
    return (+a / 100) * +b;
}
function inputNumber(num) {

    if (current.length < 12) {
        if (num === `.`) {
            if (current.includes(`.`)) {

                return;
            }
        }
        current += num;
        updateDisplay();
    }
}


function allClear() {
    stored = `0`;
    current = `0`;
    storedOperator = null;
    updateDisplay();

}

function clearEntry() {
    current = `0`;
    updateDisplay();

}

function backspace() {
    if (current.length > 1) {
        current = current.slice(0, -1);
    } else { current = `0`; }
    updateDisplay()

}

function updateDisplay() {
    screenDisplayStored.textContent = `${+stored}`;
    storedOperator === null ? screenDisplayOperator.textContent = ` ` : screenDisplayOperator.textContent = storedOperator;
    screenDisplayCurrent.textContent = `${+((+current * 1000) / 1000)}`;
    if (current[current.length - 1] === `.`) {
        screenDisplayCurrent.textContent += `.`;
    }
}

function storeCurrentNumber() {
    stored = +current;
}

function resetCurrentNumber() {
    current = `0`;
}

function resetStoredNumber() {
    stored = `0`;
}

