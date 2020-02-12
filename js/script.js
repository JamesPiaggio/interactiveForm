//Global Variables
const nameInput = document.getElementById('name');
const otherRole = document.getElementById('other-title');
const designMenu = document.getElementById('design');
const colorMenu = document.getElementById('color');
// Focuses Name field by default
nameInput.focus();
// Hides other job role text field
otherRole.style.display = 'none';
designMenu.firstElementChild.style.display = 'none';
// Adds new option to ColorMenu
const selectTheme = document.createElement('option');
selectTheme.appendChild(document.createTextNode('Please select a theme'));
colorMenu.insertBefore(selectTheme, colorMenu.firstChild);
for (let i = 1; i < colorMenu.length; i++) {
    colorMenu[i].hidden = true;
}