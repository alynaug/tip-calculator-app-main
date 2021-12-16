

function limitInput(input) {
    if (input.value.length > input.maxLength) 
        input.value = input.value.slice(0, input.maxLength);
}


function limitDecimal(input) {
    let num = parseFloat(input.value);
    if (Number.isInteger(num)) {
        input.value = num;
    }
    else if (!Number.isInteger(num) && (input.value.indexOf(".") == input.value.length - 4)) {
        input.value = num.toFixed(2);
    }
}

function closeAll(all, exceptThis) {
    for (let i = 0; i < all.length; i++) {
        if (all[i] !== exceptThis) {
            all[i].classList.remove('active');
        }
    }
}

let tip = document.getElementsByClassName('tip')[0];
let tipButtons = tip.querySelectorAll("button");

for (let button of tipButtons) {
    button.addEventListener("click", function(){
        this.classList.toggle('active');
        closeAll(tipButtons, this);
    });
}

let numOfPeople = document.getElementById('peopleAmount');
let numOfPeopleParent = numOfPeople.parentElement.getElementsByTagName('h1')[0];
let errorMessage = "<span>Can\'t be zero</span>";

numOfPeople.addEventListener("input", function() {
    if (numOfPeople.value == 0 && numOfPeopleParent.innerHTML === "Number of People") {
        numOfPeopleParent.innerHTML = numOfPeopleParent.innerHTML + errorMessage;
        numOfPeople.classList.add('error');
    }
    if (numOfPeople.value != 0) {
       numOfPeopleParent.innerHTML = "Number of People";
       numOfPeople.classList.remove('error');
    }
});

// Calculate Tip and Total
function calculateTip(a, b, c) {
    if (a != null && b != null && c != null) {
        let tip = (a * b) / c;
        let total = (a / c) + tip;
        if (c === 0 || isNaN(c) || isNaN(b)) {
            tipOutput.innerText = '0.00';
            totalOutput.innerText = '0.00';
        }
        else {
            tipOutput.innerText = tip.toFixed(2);
            totalOutput.innerText = total.toFixed(2);  
        }
    }
}

let a;
let b;
let c;

let billAmount = document.getElementById('billAmount');
let peopleAmount = document.getElementById('peopleAmount');
let customPercent = document.getElementById('customPercent');

let tipOutput = document.getElementById('tip-amount');
let totalOutput = document.getElementById('total');


billAmount.addEventListener("input", function() {
    a = parseFloat(billAmount.value);
    calculateTip(a, b, c);
    canReset();
});

for (let button of tipButtons) {
     button.addEventListener("click", function() {
        if (this.classList.contains('active')) {
            b = parseFloat(this.value);
        }
        customPercent.value = '';
        calculateTip(a, b, c);
        canReset();
    });
}

customPercent.addEventListener("input", function() {
    tipButtons.forEach(element => {
        element.classList.remove('active');
    });
    b = parseInt(customPercent.value) / 100;
    calculateTip(a, b, c);
    canReset();
});

peopleAmount.addEventListener("input", function() {
    c = parseInt(peopleAmount.value);
    calculateTip(a, b, c);
    canReset();
});

// Reset Button

let resetBtn = document.getElementsByClassName('btn--results')[0];

function canReset() {
    if (a != null || b != null || c != null) {
        resetBtn.classList.add('active');
    }
}

resetBtn.addEventListener("click", function() {
    billAmount.value = null;
    peopleAmount.value = null;
    tipButtons.forEach(element => {
        element.classList.remove('active');
    });
    customPercent.value = '';
    a = null;
    b = null;
    c = null;
    tipOutput.innerText = "0.00";
    totalOutput.innerText = "0.00";
    resetBtn.classList.remove('active');
});


