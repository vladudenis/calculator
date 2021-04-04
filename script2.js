let op = "";  //operator: +, -, * or ÷
let temp = 0; //temporary value, the number on the display that we store once an operatorBtn is pressed
let screenRefresh = false; //false means append stuff; true means set new value

const displayData = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
let buttonsArr = Array.from(buttons);
buttonsArr.forEach(button => btnAddListener(button));

//What button was pressed? What eventListener should we add to it?
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
    if(screenRefresh == true && op == ""){ //set new first number to input, including first number after an evaluation has already taken place
        displayData.textContent = e.target.textContent;
        screenRefresh = false;
    }
    else if(screenRefresh == true && op != ""){ //set first number after operatorBtn was pressed
        displayData.textContent = e.target.textContent;
        screenRefresh = false;
    }
    else if(screenRefresh == false && op == ""){ //append numbers until operatorBtn is pressed
        if(displayData.textContent != 0 || displayData.textContent.includes(".")){
            displayData.textContent += e.target.textContent;
        }
        else{
            displayData.textContent = e.target.textContent;
        }
    }
    else if(screenRefresh == false && op != ""){ //append numbers until evalBtn is pressed
        if(displayData.textContent != 0 || displayData.textContent.includes(".")){
            displayData.textContent += e.target.textContent;
        }
    }
}

function operatorBtn(e){
    if(op == ""){
        op = String(e.target.textContent); //set new operator
        temp = displayData.textContent; //store number on screen as a temporary value
        screenRefresh = true; //ensure the next number typed in sets a new value
    }
}

function dotBtn(e){ //allow decimal input
    if(!displayData.textContent.includes(".")){
        displayData.textContent += e.target.textContent;
    }
}

function evalBtn(e){
    if(op != "" && screenRefresh == false){
        displayData.textContent = operate(op, temp, displayData.textContent);
        op = ""; //reset op
        temp = 0; //reset temp
        screenRefresh = true; //ensure the next number typed in sets a new value
    }
    else{ //no evaluation if there's only a temp value and an op but no second number to do an operation with
        displayData.textContent = "Error";
        op = "";
        temp = 0;
        screenRefresh = true;
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