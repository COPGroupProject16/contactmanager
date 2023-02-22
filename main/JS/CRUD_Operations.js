// JavaScript source code

// Unneccessary later.
var entries = document.getElementsByClassName('unsetTable');
var currentRowNumber = 0

// Function should change all elements with check, an integer, in their class
// to an editable field
function editContact(check) 
{
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

function showContacts()
{
    let userId = parseInt(document.getElementById("userID").innerText);
    console.log(userId);

    let jsonPayload = JSON.stringify({userId: userId});
	console.log(jsonPayload);

    let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/returnContacts.php';

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	xhr.onreadystatechange = function()	
    {
        let jsonObject = JSON.parse(xhr.responseText);

        let contactTable = document.getElementById("tbody");

        jsonObject.array.forEach(element => {
            let row = contactTable.insertRow();

            let firstName = row.insertCell(0);
            firstName.innerHTML = element.firstname;

            let lastName = row.insertCell(1);
            lastName.innerHTML = element.lastname;

            let email = row.insertCell(2);
            email.innerHTML = element.email;

            let phoneNum = row.insertCell(3);
            phoneNum.innerHTML = element.phone;

            let dateCreated = row.insertCell(4);
            dateCreated.innerHTML = element.datecreated;
            
        });
        

    };

	xhr.send(jsonPayload); 

}

// addContact Function on main.html
function addContact(formName)
{
	// Get User Input
	let firstname = "";
	let lastname = "";
	let email = "";
	let phonenum = "";


	// Add Contact from Mobile Version
	if(formName == "mobileAdd")
	{
		// Check that all fields are present
		if(document.getElementById(formName).reportValidity() == false) { return; }

		firstname = document.getElementById("firstname-m").value;
		lastname = document.getElementById("lastname-m").value;
		email = document.getElementById("email-m").value;
		phonenum = document.getElementById("phonenum-m").value;
	}

	// Addd Contact from Desktop Version
	else
	{
		if(document.getElementById(formName).reportValidity() == false) { return; }

		firstname = document.getElementById("firstname").value;
		lastname = document.getElementById("lastname").value;
		email = document.getElementById("email").value;
		phonenum = document.getElementById("phonenum").value;
	}

	// Get UserID
	let userId = parseInt(document.getElementById("userID").innerText);

	// Get Today's Date (MM/DD/YYYY)
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	
	today = mm + '/' + dd + '/' + yyyy;
	console.log(today);

	// Filler if no Email or Phone Number Entered
	if (email == "" || email.trim().length == 0) { email = "-"; }
	if (phonenum == "" || phonenum.trim().length == 0) { email = "-"; }

	// Stringify Input
	let jsonPayload = JSON.stringify({firstname: firstname, lastname: lastname, email: email, phonenum: phonenum, userId: userId, adddate: today});
	console.log(jsonPayload);

	// Get Proper URL
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + 'PHP/addContact.php';

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	xhr.onreadystatechange = function()	{};

	xhr.send(jsonPayload); 
	
}

// deleteContact Function on main.html
function deleteContact()
{

}

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