//Global Variables
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const basicInfo = emailInput.parentElement;
const basicInfoLabels = basicInfo.querySelectorAll('label');
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

// Hides <div id="colors-js-puns">
colorMenu.parentElement.hidden = true;
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
        // Shows <div id="colors-js-puns">
        colorMenu.parentElement.hidden = false;
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

// Error message variables
const ccNumMessage = document.createElement('p');
const emailMessage = document.createElement('p');
// Hides error message
ccNumMessage.hidden = true;
emailMessage.hidden = true;

// Hides Select Payment option and payment fields
payment.firstElementChild.hidden = true;
payment[1].selected = true;
paypal.hidden = true;
bitcoin.hidden = true;

// Payment eventListener
payment.addEventListener('change', () => {
    // Shows selected, hides the other two
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

// Validation functions
const validateName = () => {
    // Stores value of input
    const nameValue = nameInput.value;
    // If nameValue has more than 1 character
    if (nameValue.length > 1) {
        nameInput.style.borderColor = 'rgb(111, 157, 220)';
        return true;
    } else {
        nameInput.style.borderColor = 'red';
        return false;
    }
}

const validateEmail = () => {
    const emailValue = emailInput.value;
    // Grabs index of '@'
    const atIndex = emailValue.indexOf('@');
    // Grabs the index of the last '.'
    const dotIndex = emailValue.lastIndexOf('.');
    // If '@' is after 1 character 
    // and '.' is at least 1 character after '@'
    if (atIndex > 1 && dotIndex > (atIndex + 1)) {
        emailMessage.hidden = true;
        emailInput.style.borderColor = 'rgb(111, 157, 220)';
        return true;
    } else {
        emailMessage.innerHTML = 'Please format email (example@email.com)';
        basicInfo.insertBefore(emailMessage, basicInfoLabels[2]);
        emailMessage.hidden = false;
        emailMessage.style.color = 'red';
        emailInput.style.borderColor = 'red';
        return false;
    }
}


const validateActivity = () => {
    // Loop to check checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            activityField.firstElementChild.style.color = 'rgba(6, 49, 68, 0.9)';
            return true;
        }
    }
    // Executes if all checkboxes are unchecked
    activityField.firstElementChild.style.color = 'red';
    return false;
}

const validateCCNum = () => {
    // Credit card variables
    const ccNum = document.getElementById('cc-num');
    const ccNumValue = ccNum.value;
    // If number is between 13 and 16
    if (ccNumValue.length >= 13 && ccNumValue.length <= 16) {
        ccNumMessage.hidden = true;
        ccNum.style.borderColor = 'green';
        return true;
      // Else if number is between 1 and 12
    } else if (ccNumValue.length >= 1 && ccNumValue.length <= 12) {
        // Adds text specific for this condition
        ccNumMessage.innerHTML = 'Credit card number must be between 13 and 16 numbers';
        // Appends error message to div of ccNum
        ccNum.parentElement.appendChild(ccNumMessage);
        // Shows error message
        ccNumMessage.hidden = false;
        ccNumMessage.style.color = 'red';
        ccNum.style.borderColor = 'red';
        return false;
      // Else if the input is empty
    } else if (ccNumValue === '') {
        // Adds text specific for this condition
        ccNumMessage.innerHTML = 'Please enter credit card number';
        // Appends error message to div of ccNum
        ccNum.parentElement.appendChild(ccNumMessage);
        // Shows error message
        ccNumMessage.hidden = false;
        ccNumMessage.style.color = 'red';
        ccNum.style.borderColor = 'red';
        return false;
    }
}
        
const validateZip = () => {
    // Zipcode variables
    const zipcode = document.getElementById('zip');
    const zipcodeValue = zipcode.value;
    // If zipcodeValue is 5 characters
    if (zipcodeValue.length === 5) {
        zipcode.style.borderColor = 'green';
        return true;
    } else {
        zipcode.style.borderColor = 'red';
        return false;
    }
}

const validateCCV = () => {
    // Ccv variables
    const ccv = document.getElementById('cvv')
    const ccvValue = ccv.value;
    // If ccvValue is 3 characters
    if (ccvValue.length === 3) {
        ccv.style.borderColor = 'green';
        return true;
    } else {
        ccv.style.borderColor = 'red';
        return false;
    }
}

// Functions to validate all payment inputs
const validatePayment = () => {
        if (validateCCNum() === true && validateZip() === true && validateCCV() === true) {
            return true;
        } else {
            return false;
        }
}

// Event Listener for validations
form.addEventListener('submit', (e) => {
    if (!validateName()) {
        e.preventDefault();
        console.log('This validator prevented submission');
    }
    if (!validateEmail()) {
        e.preventDefault();
        console.log('This validator prevented submission');
    }
    if (!validateActivity()) {
        e.preventDefault();
        console.log('This validator prevented submission');
    }
    if (payment.value === 'credit card') {
        if (!validatePayment()) {
            e.preventDefault();
            console.log('This validator prevented submission');
        }
    }
});

// Event Listener to check email input in real time
emailInput.addEventListener('keyup', validateEmail);



















