const theBody = document.querySelector('body');
const calculatorForm = document.querySelector('#calculator-form');
const result = document.querySelector('#result');
const prevResult = document.querySelector('#prev-result');

const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = '×';
const DIVIDE = '÷';
const LEFT_PARENTHESIS = '(';
const RIGHT_PARENTHESIS = ')';
const EQUALS = '=';
const DECIMAL = '.';
const ERROR = 'Error';


const queue = [];
const operatorStack = [];
const operandStack = [];
let currentInput = '';
let AfterEquals = false;

function calculateFromStacks(){
    let num2 = operandStack.pop();
    let num1 = operandStack.pop();
    let operator = operatorStack.pop();
    if(operator === ADD){
        operandStack.push(num1 + num2);
    } else if(operator === SUBTRACT){
        operandStack.push(num1 - num2);
    } else if(operator === MULTIPLY){
        operandStack.push(num1 * num2);
    } else{
        if(num2 === 0){
            result.innerHTML = ERROR;
            return;
        }
        operandStack.push(num1 / num2);
    }
}

function handleNumber(number){
    if(AfterEquals){
        currentInput = '';
        queue.length = 0;
        prevResult.innerHTML = 'Ans = ' + finalResult;
        AfterEquals = false;
    }
    if(currentInput === '0'){
        currentInput = number;
    } else{
        currentInput += number;
    }
    result.innerHTML = '';
    for(let i = 0; i < queue.length; i++){
        result.innerHTML += queue[i];
    }
    result.innerHTML += currentInput;
}

function handleOperator(operator){
    if(AfterEquals){
        queue.length = 0;
        prevResult.innerHTML = 'Ans = ' + finalResult;
        AfterEquals = false;
    }
    if(currentInput !== ''){
        queue.push(currentInput);
    }
    queue.push(operator);
    currentInput = '';
    result.innerHTML = '';
    for(let i = 0; i < queue.length; i++){
        result.innerHTML += queue[i];
    }
}

function handleEquals(){
    if(AfterEquals){
        return;
    }
    if(currentInput !== ''){
        queue.push(currentInput);
    }
    prevResult.innerHTML = '';
    for(let i = 0; i < queue.length; i++){
        prevResult.innerHTML += queue[i];
    }
    prevResult.innerHTML += EQUALS;

    for(let i = 0; i < queue.length; i++){
        if(isNaN(Number(queue[i]))){
            if(operatorStack.length === 0){
                operatorStack.push(queue[i]);
            } else{
                if(queue[i] === ADD || queue[i] === SUBTRACT){
                    while(operatorStack.length >= 1 &&
                        operandStack.length >= 2 &&
                        operatorStack[operatorStack.length - 1] !== LEFT_PARENTHESIS){
                        calculateFromStacks();
                    }
                    operatorStack.push(queue[i]);
                } else if(queue[i] === MULTIPLY || queue[i] === DIVIDE){
                    while(operatorStack.length >= 1 &&
                        operandStack.length >= 2 &&
                        operatorStack[operatorStack.length - 1] !== ADD &&
                        operatorStack[operatorStack.length - 1] !== SUBTRACT &&
                        operatorStack[operatorStack.length - 1] !== LEFT_PARENTHESIS){
                        calculateFromStacks();
                    }
                    operatorStack.push(queue[i]);
                } else if(queue[i] === LEFT_PARENTHESIS){
                    operatorStack.push(queue[i]);
                } else{
                    while(operatorStack.length >= 1 &&
                        operandStack.length >= 2 &&
                        operatorStack[operatorStack.length - 1] !== LEFT_PARENTHESIS){
                        calculateFromStacks();
                    }
                    if(operatorStack[operatorStack.length - 1] === LEFT_PARENTHESIS){
                        operatorStack.pop();
                    } else{
                        result.innerHTML = ERROR;
                        return;
                    }
                }
            }
        } else{
            operandStack.push(Number(queue[i]));
        }
    }
    while(operatorStack.length >= 1 &&
        operandStack.length >= 2){
        calculateFromStacks();
    }

    finalResult = operandStack.pop();
    result.innerHTML = finalResult.toString();
    currentInput = finalResult.toString();
    queue.length = 0;
    AfterEquals = true;
}

function handleDecimal(){
    if(AfterEquals){
        currentInput = '';
        queue.length = 0;
        prevResult.innerHTML = 'Ans = ' + finalResult;
        AfterEquals = false;
    }
    currentInput += DECIMAL;
    result.innerHTML = '';
    for(let i = 0; i < queue.length; i++){
        result.innerHTML += queue[i];
    }
    result.innerHTML += currentInput;
}


function handleAC(){
    currentInput = '0';
    queue.length = 0;
    result.innerHTML= '0';
    prevResult.value = '';
}

function handleCE(){
    if(currentInput.length === 0 && queue.length > 0){
        if(queue.length > 0){
            if(isNaN(Number(queue[queue.length - 1]))){
                queue.pop();
            }
            else{
                currentInput = queue.pop();
                currentInput = currentInput.substring(0, currentInput.length - 1);
            }
        }
    }
    else if(currentInput.length === 1){
        currentInput = '';
    }
    else{
        currentInput = currentInput.substring(0, currentInput.length - 1);
    }
    result.innerHTML = '';
    for(let i = 0; i < queue.length; i++){
        result.innerHTML += queue[i];
    }
    result.innerHTML += currentInput;
    // for no input left
    if(result.innerHTML === ''){
        result.innerHTML = '0';
    }
}

function handleSubmit(event){
    event.preventDefault();
    switch(event.submitter.id){
        case 'add': handleOperator(ADD);
        break;
        case 'subtract': handleOperator(SUBTRACT);
        break;
        case 'multiply': handleOperator(MULTIPLY);
        break;
        case 'divide': handleOperator(DIVIDE);
        break;
        case 'left-parenthesis': handleOperator(LEFT_PARENTHESIS);
        break;
        case 'right-parenthesis': handleOperator(RIGHT_PARENTHESIS);
        break;
        case 'equals': handleEquals();
        break;
        case 'decimal': handleDecimal();
        break;
        case 'all-clear': handleAC();
        break;
        case 'clear-entry': handleCE();
        break;

        default: handleNumber(event.submitter.id);
    }
    return;
}

function handleKeyEvent(event) {
    event.preventDefault();
    if(isNaN(Number(event.key))){
        switch(event.key){
            case ADD: handleOperator(ADD);
            break;
            case SUBTRACT: handleOperator(SUBTRACT);
            break;
            case '*': handleOperator(MULTIPLY);
            break;
            case '/': handleOperator(DIVIDE);
            break;
            case LEFT_PARENTHESIS: handleOperator(LEFT_PARENTHESIS);
            break;
            case RIGHT_PARENTHESIS: handleOperator(RIGHT_PARENTHESIS);
            break;
            case EQUALS: case 'Enter': handleEquals();
            break;
            case DECIMAL: handleDecimal();
            break;
            case 'Escape': handleAC();
            break;
            case 'Backspace': handleCE();
            break;
            default: return;
        }
    } else{
        handleNumber(event.key);
    }
    return;
}

theBody.addEventListener('keydown', handleKeyEvent);
calculatorForm.addEventListener('submit', handleSubmit);