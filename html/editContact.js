// JavaScript source code

// Unneccessary later.
var entries = document.getElementsByClassName('unsetTable');
var currentRowNumber = 0

// Function should change all elements with check, an integer, in their class
// to an editable field
function editContact(check) {
   // Keep track of current row number
    currentRowNumber = entries.length / 4;

    // Debugging stuff
    console.log("Edit Button Pressed");
    console.log("unsetTable = " + entries.length);
    console.log("entries.length is " + currentRowNumber);

    // Check to see if there are unset entries
    // This won't exist once the database table stuff is done.
    if (entries.length > 0) {
        console.log("Condition Met. entries = " + entries.length);
        tableSetter();
    } else {
        console.log("Condition Not Met. entries = " + entries.length);
    }
    // End of stuff to not exist later.

    // Turn all elements with class check into editable fields
    var editField = document.getElementsByClassName(check);
    console.log("This is the number of elements with " + check + ": " + editField.length);
    for (var i = 0; i < 4; i++) {
        editField[i].readOnly = false;
    }
    return;
}

// This shouldn't have to exist later and only exists because something
// hasn't been implemented yet. Don't worry about it.

// Function gives all class 'unsetTable' elements a number based on their row
function tableSetter() {
    currentRow = currentRowNumber;
    console.log("tabelSetter entered");

    for (var i = entries.length - 1; i > -1; i--) {
        entries[i].classList.add(currentRow);
        entries[i].classList.remove("unsetTable");

        if (i % 4 == 0 && i > 0) {
            currentRow--;
            console.log("Iterating");
        }

        console.log("i is " + i);

        console.log("Looped");
    }

    console.log("Complete");
}