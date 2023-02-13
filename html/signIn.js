// Login Function()
function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	let user = document.getElementById("username").value;
	let pass = document.getElementById("password").value;

	let jsonPayload = JSON.stringify({ username: user, password: pass });
 
 
	let url = location.href.substring(0, location.href.lastIndexOf("/")+1) + '/login.php';
 

	let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true); // The Error Happens Here
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

	// Stringify Input
	let jsonPayload = JSON.stringify({ username: user, password: pass, firstName: fName, lastName: lName });
 
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
				// User Does Not Exist --> Create User
				if( userId < 1 )
				{		 
					firstName = jsonObject.firstName;
					lastName = jsonObject.lastName;
	
					saveCookie();
					window.location.href = "main.html";                   
				}
				
				// User already exists --> Return Error
				else
				{
         		 	// Blink Effect 
 			    	setTimeout(function(){document.getElementById("loginResult").innerHTML = "Username/Password Combination Incorrect";},250);   
					document.getElementById("loginResult").innerHTML = " ";
					return;
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

    x = document.getElementById("passwordCheck");

    if (x.type === "password") { x.type = "text"; }
	else { x.type = "password"; }
}

// Save User Profile as a cookie for 30 minutes
function saveCookie()
{
	let minutes = 30;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
  console.log(document.cookie);
}

// Read in Cookie Details
function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");

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
	}
}


// Sign Out Function
function doLogout()
{
    // Reset Cookie Details
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    // Go pack to login page (index.html)
	window.location.href = "index.html";
}


// Performs a validation of new username and password
function signupCheck()
{
  // Get Username and Passwords
  var username = document.getElementById("username").value;

  var password = document.getElementById("password").value;
  var passwordCheck = document.getElementById("passwordCheck").value;

  // Check if username is already taken

  // Check if passwords match

  // Check if password is 8+ characters long
}