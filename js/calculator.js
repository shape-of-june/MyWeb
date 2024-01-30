const theBody = document.querySelector('body');
const calculatorForm = document.querySelector('#calculator-form');
const input = document.querySelector('#result');

input.value = '0';
let previousInput = '0';
let previousOperator = '';
let currentInput = '0';

function calculate(){
    if(previousOperator === '+'){
        previousInput = (Number(previousInput) + Number(currentInput)).toString();
    } else if(previousOperator === '-'){
        previousInput = (Number(previousInput) - Number(currentInput)).toString();
    } else if(previousOperator === '*'){
        previousInput = (Number(previousInput) * Number(currentInput)).toString();
    } else if (previousOperator === '/'){ // if previousOperator === '/'
        if(currentInput === '0'){
            input.value = 'ERROR';
            previousOperator = '';
            return;
        }
        previousInput = (Number(previousInput) / Number(currentInput)).toString();
    } else return;
    currentInput = '0';
    input.value = previousInput;
    previousOperator = '=';
    return;
}

function handleNumber(number){
    if(currentInput === '0'){
        currentInput = number;
    } else {
        currentInput = currentInput + number;
    }
    input.value = currentInput;
}

function handleDot(){
    if(currentInput.indexOf('.') === -1){
        currentInput = currentInput + '.';
    }
    input.value = currentInput;
}

function handleSymbol(symbol){
    if(symbol === '~'){ // clear
        previousInput = '0';
        previousOperator = '';
        currentInput = '0';
        input.value = '0';
        return;
    } else if(symbol === '!'){ // backspace
        if(currentInput.length === 1){
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        input.value = currentInput;
        return;
    }
    else if(symbol === '='){
        calculate();
        return;
    }
    // if previousOperator is empty, set previousOperator to symbol and return
    if(previousOperator === ''){
        previousInput = currentInput;
        currentInput = '0';
        previousOperator = symbol;
        return;
    }
    // if operator, calculate previous operator
    calculate();
    previousOperator = symbol;
    return;
}

function handleSubmit(event){
    event.preventDefault();
    switch(event.submitter.id){
        case 'clear': handleSymbol('~');
        break;
        case 'backspace': handleSymbol('!');
        break;
        case 'add': handleSymbol('+');
        break;
        case 'subtract': handleSymbol('-');
        break;
        case 'multiply': handleSymbol('*');
        break;
        case 'divide': handleSymbol('/');
        break;
        case 'equals': handleSymbol('=');
        break;
        case 'decimal': handleDot();
        default: handleNumber(event.submitter.id);
    }
}

function handleKeyEvent(event) {
    event.preventDefault();
    if(event.key === '.'){
        console.log('dot');
        handleDot();
        return;
    } else if(!isNaN(Number(event.key))){
        handleNumber(event.key);
    } else{
        switch(event.key){
            case 'Escape': handleSymbol('~');
            break;
            case 'Backspace': handleSymbol('!');
            break;
            case 'Enter': case '=': handleSymbol('=');
            break;
            case '+': case '-': 
            case '*': case '/': handleSymbol(event.key);
            break;
            default: return;
        }
    }
    return;
}
console.log('2.' + '3');

theBody.addEventListener('keydown', handleKeyEvent);
calculatorForm.addEventListener('submit', handleSubmit);