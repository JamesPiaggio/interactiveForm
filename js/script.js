//Global Variables
const nameInput = document.getElementById('name');
const selectRole = document.getElementById('title');
const otherRole = document.getElementById('other-title');
const designMenu = document.getElementById('design');
const colorMenu = document.getElementById('color');

// Activity variables
const activityField = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('label input');
const totalCostField = document.createElement('h3');
let totalCost = 0;
activityField.appendChild(totalCostField);

// Focuses Name field by default
nameInput.focus();

// Hides other job role text field
otherRole.hidden = true;

// Show other job role field if other is selected
selectRole.addEventListener('change', () => {
if (selectRole.value === 'other') {
        otherRole.hidden = false;
    } else {
        otherRole.hidden = true;
    }
});

// Shows Select theme <option>
designMenu.firstElementChild.selected = true;

// Adds new option to ColorMenu
const themeOption = document.createElement('option');
// Adds text to the created <option> element
themeOption.appendChild(document.createTextNode('Please select a T-shirt theme'));
// Inserts new <option> before the first child inside the select menu
colorMenu.insertBefore(themeOption, colorMenu.firstChild);
themeOption.selected = true;

// Hides colorMenu colors
const clearColors = () => {
    for (let i = 1; i < colorMenu.length; i++) {
        colorMenu[i].hidden = true;
    }
}

clearColors();

designMenu.addEventListener('change', (e) => {
    // If statement to only execute once
    if (themeOption.hidden == false) {
        // Hides Select theme <option>
        designMenu.firstElementChild.hidden = true;
        themeOption.hidden = true;
    }
    // If statement for Theme/Color
    if (e.target.value == 'js puns') {
        clearColors();
        colorMenu[1].selected = true;
        for (let i = 1; i < 4; i++) {
            colorMenu[i].hidden = false;
        }
    } else if (e.target.value == 'heart js') {
        clearColors();
        colorMenu[4].selected = true;
        for (let i = 4; i < 7; i++) {
            colorMenu[i].hidden = false;
        }
    }
});

// Activity section eventListener
activityField.addEventListener('change', (e) => {
    const clicked = e.target;
    const dataCost = parseInt(clicked.getAttribute('data-cost'));
    const dayAndTime = clicked.getAttribute('data-day-and-time');
    // Adds dataCost to totalCost if clicked and subtracts when unclicked
    if(clicked.checked == true) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    // Concatinates text and totalCost to show in HTML
    totalCostField.innerHTML = 'Total: $' + totalCost;
    // Disables checkboxes with same day/time
    for (let i = 0; i < checkboxes.length; i++) {
        const input = checkboxes[i];
        if (dayAndTime === input.getAttribute('data-day-and-time') && clicked !== input) {
            input.disabled = true;
        }
        // Reenables checkboxes when target is unchecked
        if (clicked.checked == false && dayAndTime === input.getAttribute('data-day-and-time')) {
            input.disabled = false;
        }
    }
});

// Payment variables
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

// Hides Select Payment option and payment fields
payment.firstElementChild.hidden = true;
paypal.hidden = true;
bitcoin.hidden = true;

// Payment eventListener
payment.addEventListener('change', () => {
    if (payment.value === 'credit card') {
        creditCard.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;
    } else if (payment.value === 'paypal') {
        paypal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    } else if (payment.value = 'bitcoin') {
        bitcoin.hidden = false;
        creditCard.hidden = true;
        paypal.hidden = true;
    }
});






















