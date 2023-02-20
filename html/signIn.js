// Login Function
function doLogin()
{
	// Cookie Values to be filled in on sucessfull login
	userId = 0;
	firstName = "";
	lastName = "";

	// Make Sure Input Fields are Valid (Not Empty) Return if missing input
	var form = document.getElementById('loginForm');
	if(form.reportValidity() == false) { return; }
	
	// Grab User Input
	let user = document.getElementById("username").value;
	let pass = document.getElementById("password").value;

	// Hash Password
	var hash = md5(pass);
	hash = hash.substr(0, 25); // Only Grab 1st 25 Characters

	// Convert Input to JSON
	let jsonPayload = JSON.stringify({username:user,password:hash});
	console.log(jsonPayload);
	
	// Get [Current URL]/login.php PATH
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + '/login.php';
 
	// Open XML Request to SQL Database
	let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
	try
	{
		// When we have recieved a response, do this
		xhr.onreadystatechange = function() 
		{
			// Parse Repose Text for a User ID
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			// Check if there actually was a response
			if (this.readyState == 4 && this.status == 200) 
			{
				// User ID < 1 ---> USER DOES NOT EXIST
				if( userId < 1 )
				{		                    
          			// Blink Invalid Credentials Effect 
 			    	setTimeout(function(){document.getElementById("loginResult1").innerHTML = "Username/Password Combination Incorrect";},250);   
					document.getElementById("loginResult1").innerHTML = " ";
					return;
				}

				// If we reach here, we have a successfull login
		
				// Save Cookie Detials
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
        		saveCookie();

				// Move to Main Webpage
				window.location.href = "main.html";
			}
		};

		// Send JSON to MySQL server
		xhr.send(jsonPayload);
	}

	// We've encountered some error
	catch(err) { document.getElementById("loginResult1").innerHTML = err.message; }
}


// Signup Function --> Bascially Identical to Login, but add User if NOT Found, return error if Found
function doSignup()
{
	// Cookie Values to be filled in on sucessfull account creation
	userId = 0;
	firstName = "";
	lastName = "";

	// Make Sure Input Fields are Valid (Not Empty)
	var form = document.getElementById('signupForm');
	if(form.reportValidity() == false) { return; }

	// Grab User Input
	let fName = document.getElementById("firstnameCreate").value;
	let lName = document.getElementById("lastnameCreate").value;
	let user = document.getElementById("usernameCreate").value;
	let pass = document.getElementById("passwordCreate").value;
	let passCheck = document.getElementById("passwordcheckCreate").value;

	// Make Sure Passwords Match
	if(pass != passCheck)
	{
		alert("Passwords Must Match")
		return;
	}

	// Hash Password
	var hash = md5( pass );
  	hash = hash.substr(0, 25); // Grab 1st 25 Characters

	// Stringify Input
	let jsonPayload = JSON.stringify({ username: user, password: hash, firstName: fName, lastName: lName });
 
	// Get [Current URL]/signup.php PATH
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + '/signup.php';
 
	// Open XML Request to SQL Database
	let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
	try
	{
		// When we have recieved a response, do this
		xhr.onreadystatechange = function() 
		{
			// Parse Repose Text for a User ID
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			// Check if there actually was a response
			if (this.readyState == 4 && this.status == 200) 
			{
				// User already exists --> Return Error
				if(userId < 1)
				{		 
         		 	// Blink Effect User Already Taken
					  setTimeout(function(){document.getElementById("loginResult2").innerHTML = "Username Already Taken";},250);   
					  document.getElementById("loginResult2").innerHTML = " ";
					  return;              
				}
				
				// User Does NOT Exist --> Create User Account
				else
				{
					// Save Cookie Details
					firstName = jsonObject.firstName;
					lastName = jsonObject.lastName;
					saveCookie();

					// Move to Main Webpage
					window.location.href = "main.html";        
				}
			} 
		};

		// Send JSON to MySQL server
		xhr.send(jsonPayload);
	}

	// We've encountered some error
	catch(err) { document.getElementById("loginResult2").innerHTML = err.message; }

}

// Show Password Field on Login/Sign Up Page(s)
function showPass() 
{
	// If password, change to text
	// If text, change to password

	// Password Field on Login
    var x = document.getElementById("password");
	
    if (x.type === "password") { x.type = "text"; } 
	else { x.type = "password"; }

	// Password Field on Sign Up
    x = document.getElementById("passwordCreate");

    if (x.type === "password") { x.type = "text"; }
	else { x.type = "password"; }

	// Password Check Field on Sign Up
	x = document.getElementById("passwordcheckCreate");

	if (x.type === "password") { x.type = "text"; }
	else { x.type = "password"; }
}

// Save User Profile as a cookie for 30 minutes
function saveCookie()
{
	let minutes = 30;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	

	// All Cookies Expire 30 Minutes from when this function is called
	document.cookie = "firstName=" + firstName + ";" + "expires=" + date.toGMTString();
	document.cookie = "lastName=" + lastName + ";" + "expires=" + date.toGMTString();
	document.cookie = "userId=" + userId + ";" + "expires=" + date.toGMTString();
}

// Read in Cookie Details
function readCookie()
{
	let data = document.cookie;

	// Split Up the Cookie into each of its values and Parse them
	let splits = data.split(";");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");

		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

    // If there is NO cookie AKA no user is signed in --> redirect to login/signup page (index.html)
	if (document.cookie.indexOf('userId') == -1 ) { window.location.href = "index.html"; }

    // If there IS a saved user cookie --> go to home page (main.html)
    else 
	{ 
		// Fill Hello User Banner with cookie details
		document.getElementById("helloBanner1").innerText = "Hello,  " + firstName + " " + lastName;
		document.getElementById("helloBanner2").innerText = "Hello,  " + firstName + " " + lastName; 
		document.getElementById("userID").innerText = userId;
	}
}


// Sign Out Function
function doLogout()
{
    // Reset Cookie Details
	userId = 0;
	firstName = "";
	lastName = "";

	// Clear ALL Cookies
	document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

	// Then throw in this as a filler 
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirect to login page (index.html)
	window.location.href = "index.html";
}		

// addContact Function on main.html
function addContact(formName)
{
	// Placeholders for data fields
	let firstname = "";
	let lastname = "";
	let email = "";
	let phonenum = "";

	// Add Contact from Mobile Version
	if(formName == "mobileAdd")
	{
		// Check that all fields are present
		if(document.getElementById(formName).reportValidity() == false) { return; }

		// Get User Input
		firstname = document.getElementById("firstname-m").value;
		lastname = document.getElementById("lastname-m").value;
		email = document.getElementById("email-m").value;
		phonenum = document.getElementById("phonenum-m").value;
	}

	// Addd Contact from Desktop Version
	else
	{
		// Check that all fields are present
		if(document.getElementById(formName).reportValidity() == false) { return; }

		// Get User Input
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

	// Filler if no Email or Phone Number Entered -- They are not required
	if (email == "" || email.trim().length == 0) { email = "-"; }
	if (phonenum == "" || phonenum.trim().length == 0) { email = "-"; }

	// Stringify Input
	let jsonPayload = JSON.stringify({firstname: firstname, lastname: lastname, email: email, phonenum: phonenum, userId: userId, adddate: today});

	// Get Proper URL
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + '/addContact.php';

	// Open XML Request to SQL Database
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		// When we have recieved a response, do this
		xhr.onreadystatechange = function() 
		{
			// Get and Parse Response Text
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			// If Valid Server Response --- THIS STILL NEEDS REVIEW
			if (this.readyState == 4 && this.status == 200) 
			{
				// User already exists --> Return Error
				if(userId < 1)
				{		 
					// Blink Effect 
					setTimeout(function(){document.getElementById("loginResult").innerHTML = "Contact Not Added";},250);   
					document.getElementById("loginResult").innerHTML = " ";
					return;              
				}
				
				// User Does Not Exist --> Create User and Proceed
				else
				{
					window.location.href = "main.html";        
				}
			}
		};

		// Send JSON to MySQL database
		xhr.send(jsonPayload);
	}

	// We've encounted an error here
	catch(err) { document.getElementById("loginResult").innerHTML = err.message; }
}
