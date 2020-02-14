//Global Variables
const nameInput = document.getElementById('name');
const otherRole = document.getElementById('other-title');
const designMenu = document.getElementById('design');
const colorMenu = document.getElementById('color');


// Focuses Name field by default
nameInput.focus();

// Hides other job role text field
otherRole.hidden = true;

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
        // Creates new <option> with new message
        const colorOption = document.createElement('option');
        colorOption.appendChild(document.createTextNode('Please select a color'));
        colorMenu.insertBefore(colorOption, colorMenu.firstChild);
        // Shows new message but hides it when selecting a color
        colorOption.selected = true;
        colorOption.hidden = true;
    }
    // If statement for Theme/Color
    if (e.target.value == 'js puns') {
        clearColors();
        for (let i = 2; i < 5; i++) {
            colorMenu[i].hidden = false;
        }
    } else if (e.target.value == 'heart js') {
        clearColors();
        for (let i = 5; i < 8; i++) {
            colorMenu[i].hidden = false;
        }
    }
});