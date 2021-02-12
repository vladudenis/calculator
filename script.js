let op = "";
let temp = 0;

const displayData = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
let buttonsArr = Array.from(buttons);
buttonsArr.forEach(button => btnAddListener(button));

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
    if((op == "" && displayData.textContent != 0) || displayData.textContent.includes(".")){
        displayData.textContent += e.target.textContent;
    }
    else{
       displayData.textContent = e.target.textContent;
    } 
}

function operatorBtn(e){
    if(op == ""){
        op = String(e.target.textContent);
        temp = displayData.textContent;
    }
}

function dotBtn(e){
    if(!displayData.textContent.includes(".")){
        displayData.textContent += e.target.textContent;
    }
}

function evalBtn(e){
    if(op != ""){
        displayData.textContent = operate(op, temp, displayData.textContent);
        op = "";
        temp = 0;
    }
}

function clearBtn(){
    displayData.textContent = 0;
    op = "";
    temp = 0;
}

function deleteBtn(){
    displayData.textContent =  displayData.textContent.toString().slice(0, -1);
}

//change these to make sure they also work with decimals
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