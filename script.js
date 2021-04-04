let op = ""; //operator currently in calculator cache
let temp = 0; // temporary value, the number on the display that we store when an operatorBtn is pressed
let appendNumber = false; //true means we set a new value, false means we append on the value
let chainOperation = false; //for chain operations, like 2 + 6 * 8 / 3 - 22

const displayData = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => btnAddListener(button));

//Check what button was pressed and add the appropriate event listener to it
function btnAddListener(btn){
    if(btn.className == "number-btn"){
        btn.addEventListener("click", numberBtn);
    }
    else if(btn.className == "operator-btn"){
        btn.addEventListener("click", operatorBtn);
    }
    else if(btn.className == "dot-btn"){
        btn.addEventListener("click", dotBtn);
    }
    else if(btn.className == "eval-btn"){
        btn.addEventListener("click", evalBtn);
    }
    else if(btn.className == "del-clear-btn clear"){
        btn.addEventListener("click", clearBtn);
    }
    else if(btn.className == "del-clear-btn del"){
        btn.addEventListener("click", deleteBtn);
    }
}

function numberBtn(e){
    //case: first button pressed when loading page or immediately after an evaluation has taken place
    if(appendNumber == false && op == ""){
        displayData.textContent = e.target.textContent;
        appendNumber = true; //now we must append any number we press
    }
    //case: first button immediately pressed after the operator has been determined
    else if(appendNumber == false && op != ""){
        displayData.textContent = e.target.textContent;
        appendNumber = true;
        chainOperation = true; //set to true just in case we actually do a chain operation
    }
    //case: append numbers until an operator button is pressed
    else if(appendNumber == true && op == ""){
        if(displayData.textContent != 0 || displayData.textContent.includes(".")){
            displayData.textContent += e.target.textContent;
        }else{
            //if you press another number button after typing in 0, that new value will be set on the display screen
            displayData.textContent = e.target.textContent;
        }
    }
    //case: append numbers until the evaluation button is pressed
    else if(appendNumber == true && op != ""){
        chainOperation = false;
        if(displayData.textContent != 0 || displayData.textContent.includes(".")){
            displayData.textContent += e.target.textContent;
        }else{
            //if you press another number button after typing in 0, that new value will be set on the display screen
            displayData.textContent = e.target.textContent;
        }
    }
}

function operatorBtn(e){
    if(op == "" || chainOperation == true){
        if(chainOperation == true){
            displayData.textContent = operate(op, temp, displayData.textContent);
            temp = displayData.textContent;
            op = e.target.textContent;
            appendNumber = false;
            chainOperation = false;
        }else{
            op = e.target.textContent; //set new operator
            temp = displayData.textContent; //store number on screen as temporary value
            appendNumber = false; //ensure next number typed in sets a new value
        } 
    }
}

function dotBtn(e){
    if(!displayData.textContent.includes(".")){
        displayData.textContent += e.target.textContent; //add dot
    }
}

function evalBtn(e){
    if(chainOperation == true){
        chainOperation = false;
    }
    if(appendNumber == true && op != ""){
        displayData.textContent = operate(op, temp, displayData.textContent);
        op = ""; //reset operator
        temp = 0; //reset temp
        appendNumber = false;
    }else{ //no evaluation if there's only a temporary value and an operator but no second operand
        displayData.textContent = "Error";
        op = "";
        temp = 0;
        appendNumber = false;
    }
}

function clearBtn(){ //clear display and reset all values
    displayData.textContent = 0;
    op = "";
    temp = 0;
}

function deleteBtn(){ //delete a number from the back
    displayData.textContent =  displayData.textContent.toString().slice(0, -1);
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case "+": 
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return  a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(b == 0) return "Error";
    return a / b;
}