// Login Function()
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let user = document.getElementById("username").value;
	let pass = document.getElementById("password").value;

	// Hash Password
	var hash = md5( password );
  hash = hash.substr(0, 25);
  //console.log(hash);

	// Make Sure Input Fields are Valid (Not Empty) Return if missing input
   	var form = document.querySelector('form');
   	if(form.reportValidity() == false) { return; }

	//let jsonPayload = JSON.stringify({ username: user, password: pass });
	let jsonPayload = JSON.stringify({username:user,password:hash});
	
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + '/login.php';
 

	let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
	try
	{
		xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			if (this.readyState == 4 && this.status == 200) 
			{
				if( userId < 1 )
				{		                    
          			// Blink Effect 
 			    	setTimeout(function(){document.getElementById("loginResult").innerHTML = "Username/Password Combination Incorrect";},250);   
					document.getElementById("loginResult").innerHTML = " ";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

        		saveCookie();
				window.location.href = "main.html";
			}
		};
		xhr.send(jsonPayload); // THE 
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Signup Function()
function doSignup()
{
	userId = 0;
	firstName = "";
	lastName = "";

	// Grab User Input
	let fName = document.getElementById("firstname").value;
	let lName = document.getElementById("lastname").value;
	let user = document.getElementById("username").value;
	let pass = document.getElementById("password").value;
	let passCheck = document.getElementById("passwordcheck").value;

	// Make Sure Input Fields are Valid (Not Empty)
	var form = document.querySelector('form');
	if(form.reportValidity() == false) { return; }

	// Make Sure Passwords Match
	if(pass != passCheck)
	{
		alert("Passwords Must Match")
		return;
	}

	// Hash Password
	var hash = md5( password );
  hash = hash.substr(0, 25);

	// Stringify Input
	//let jsonPayload = JSON.stringify({ username: user, password: pass, firstName: fName, lastName: lName });
	let jsonPayload = JSON.stringify({ username: user, password: hash, firstName: fName, lastName: lName });

 
	// Get Proper URL
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + '/signup.php';
 
	let xhr = new XMLHttpRequest();
  	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
 
	try
	{
		xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

			if (this.readyState == 4 && this.status == 200) 
			{
				// User already exists --> Return Error
				if(userId < 1)
				{		 
         		 	// Blink Effect 
					  setTimeout(function(){document.getElementById("loginResult").innerHTML = "Username Already Taken";},250);   
					  document.getElementById("loginResult").innerHTML = " ";
					  return;              
				}
				
				// User Does Not Exist --> Create User
				else
				{
					firstName = jsonObject.firstName;
					lastName = jsonObject.lastName;
	
					saveCookie();
					window.location.href = "main.html";        
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Show Password Field on Login/Sign Up Page(s)
function showPass() 
{
    var x = document.getElementById("password");
	
    if (x.type === "password") { x.type = "text"; } 
	else { x.type = "password"; }

    x = document.getElementById("passwordcheck");

    if (x.type === "password") { x.type = "text"; }
	else { x.type = "password"; }
}

// Save User Profile as a cookie for 30 minutes
function saveCookie()
{
	let minutes = 30;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ";" + "expires=" + date.toGMTString();
	document.cookie = "lastName=" + lastName + ";" + "expires=" + date.toGMTString();
	document.cookie = "userId=" + userId + ";" + "expires=" + date.toGMTString();
  	//console.log(document.cookie);
}

// Read in Cookie Details
function readCookie()
{
	let data = document.cookie;
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

    // If there is no cookie AKA no user is signed in --> go to login page (index.html)
	if( userId < 0 ) { window.location.href = "index.html";}

    // If there IS a saved user cookie --> go to home page (main.html)
    else 
	{ 
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

    // Go pack to login page (index.html)
	window.location.href = "index.html";
}		

// addContact Function on main.html
function addContact(formName)
{
	// Get User Input
	//let firstname = document.querySelector("#" + formName + " [name=firstname]").value;
	//let lastname = document.querySelector("#" + formName + " [name=lastname]").value;
	//let email = document.querySelector("#" + formName + " [name=email]").value;
	//let phonenum = document.querySelector("#" + formName + " [name=phonenum]").value;
	//console.log(formName);

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
	//console.log(today);

	// Filler if no Email or Phone Number Entered
	if (email == "" || email.trim().length == 0) { email = "-"; }
	if (phonenum == "" || phonenum.trim().length == 0) { email = "-"; }

	// Stringify Input
	let jsonPayload = JSON.stringify({firstname: firstname, lastname: lastname, email: email, phonenum: phonenum, userId: userId, adddate: today});
	//console.log(jsonPayload);

	// Get Proper URL
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + '/addContact.php';

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	try
	{
		xhr.onreadystatechange = function() 
		{
			let jsonObject = JSON.parse(xhr.responseText);
			userId = jsonObject.id;

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
				
				// User Does Not Exist --> Create User
				else
				{
					window.location.href = "main.html";        
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}
