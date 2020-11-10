var config = {
	apiKey: "AIzaSyA1rb94ogzrZovpB-I9b2ubdEDB4nCkVWg",
	authDomain: "flying-9a412.firebaseapp.com",
	databaseURL: "https://flying-9a412.firebaseio.com",
	projectId: "flying-9a412",
	storageBucket: "flying-9a412.appspot.com",
	messagingSenderId: "506823684139",
	appId: "1:506823684139:web:e245849a4966384d3efa6e",
	measurementId: "G-4XGB6ESPWW"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth() ;

// config.auth.Auth.Persistence.LOCAL;

// auth.onAuthStateChanged(function (user) {
// 	if(!user)
// 	{
// 	  window.location.href = "Login.html";
// 	}
// });

//Login Page

$("#btn-login").click(function ()
{
	var email = $("#email").val();
	var password = $("#pwd").val();

	if(email != "" && password != "")
	{
		var result = firebase.auth().signInWithEmailAndPassword(email, password);
		result.catch(function(error)
		{
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			console.log(errorMessage);

			window.alert("Message : " + errorMessage);

		});
	}
	else
	{
		window.alert("Please fill out all the details!");
	}
});

//Log Out
$("#btn-logout").click(function ()
{
	firebase.auth().signOut();
	
});

//Forgot Password
$("#btn-reset").click(function ()
{
	var email = $("#email").val();
	var auth = firebase.auth();
	if(email != "" )
	{
		auth.sendPasswordResetEmail(email)(function()
		{
			window.alert("Email has been sent, Please check and verify!");
		}).catch(function(error)
		{
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);
			console.log(errorMessage);

			window.alert("Message : " + errorMessage);
		});
	}
	else
	{
		window.alert("Enter Email");
	}
});

//Sign Up
$("#btn-submit").click(function ()
{
	var email = $("#email").val();
	var password = $("#pwd").val();
	var confirmpassword = $("#cpwd").val();

	if(email != "" && password != "" && confirmpassword != "")
	{
		if(confirmpassword == password)
		{
			var result = firebase.auth().createUserWithEmailAndPassword(email, password);
			result.catch(function(error)
			{
				var errorCode = error.code;
				var errorMessage = error.message;

				console.log(errorCode);
				console.log(errorMessage);

				window.alert("Message : " + errorMessage);
			});
		}
		else
		{
			window.alert("Passwords do not match!");
		}
	}
	else
	{
		window.alert("Please fill out all the details!");
	}
});