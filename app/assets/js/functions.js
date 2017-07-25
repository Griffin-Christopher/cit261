/* AUTHOR : Christopher Griffin
 * 
 * Miscellaneous Functions
 */
 
// App Initialization
window.onload = function() {
	banner   = getByID("banner");
  viewport = getByID("viewport");
	navbar   = getByID("navbar");
  importCatalog();
}

/*************
* ANIMATIIONS
**************/
function favsListOn(event) {
	var td = getByID(event.target.id).parentElement;
	var tr = td.parentElement;
	tr.classList.add("favsListTouch");
}
function favsListOff(event) {
	var td = getByID(event.target.id).parentElement;
	var tr = td.parentElement;
	tr.classList.remove("favsListTouch");
}

/*************
* DATA IMPORT
**************/
function importCatalog() {
  // Create Progress Dialog
  insertProgressDialog();
  var progress = getByID("progressBar");
  var status   = getByID("progressStatus");
  // Request JSON Catalog
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "assets/json/catalog.json");
  xhr.onloadstart = function() {
      progress.value = 0;
      status.innerHTML = "Loading Data: 0%";
  }
  xhr.onprogress = function(bar) {
    if (bar.lengthComputable) {
      // Update Progress Bar
      progress.value = bar.loaded;
      progress.max = bar.total;
      status.innerHTML = "Loading Data: " 
                       + Math.floor((bar.loaded / bar.total) * 100) + "%";
    }
  }
  xhr.onloadend = function(bar) {
    // Convert Catalog || generateCatalog()
    catalog = generateCatalog(JSON.parse(xhr.responseText));
    // Cleanup Progress Bar
    progress.value = bar.loaded;
    status.innerHTML = "Loading Data: 100%";
    setTimeout(removeProgressDialog, 2000);
  }
  xhr.send();
}
function insertProgressDialog() {
  var dialog = newDiv("progressDialog");
  addChild(viewport, dialog);
  var logo = newImage("assets/images/dutch-bros-windmill.png", "Dutch Bros. Logo");
  logo.id = "progressLogo";
  addChild(dialog, logo);
  var bar = newElement("PROGRESS");
  bar.id = "progressBar";
  addChild(dialog, bar);
  var status = newPara("progressStatus");
  status.id = "progressStatus";
  addChild(dialog, status);
}
function generateCatalog(json) {
	var drinks = {breve: [], freeze: [], frost: [], latte: [], mocha: [], rebel: [], tea: []};
	// Breves
	for (var i = 0; i < json.breve.length; i++) {
		drinks.breve[i] = new Breve(i, json.breve[i].name, json.breve[i].ingredients, 
		                            json.breve[i].iced);
	}
	// Freezes
	for (var i = 0; i < json.freeze.length; i++) {
		drinks.freeze[i] = new Freeze(i, json.freeze[i].name, json.freeze[i].ingredients);
	}
	// Frosts
	for (var i = 0; i < json.frost.length; i++) {
		drinks.frost[i] = new Frost(i, json.frost[i].name, json.frost[i].ingredients);
	}
	// Lattes
	for (var i = 0; i < json.latte.length; i++) {
		drinks.latte[i] = new Latte(i, json.latte[i].name, json.latte[i].ingredients, 
		                            json.latte[i].iced);
	}
	// Mochas
	for (var i = 0; i < json.mocha.length; i++) {
		drinks.mocha[i] = new Mocha(i, json.mocha[i].name, json.mocha[i].ingredients, 
		                            json.mocha[i].iced);
	}
	// Rebels
	for (var i = 0; i < json.rebel.length; i++) {
		drinks.rebel[i] = new Rebel(i, json.rebel[i].name, json.rebel[i].ingredients, 
		                            json.rebel[i].iced);
	}
	// Teas
	for (var i = 0; i < json.tea.length; i++) {
		drinks.tea[i] = new Tea(i, json.tea[i].name, json.tea[i].ingredients, json.tea[i].iced);
	}
	return drinks;
}
function removeProgressDialog() {
	// Build Login Page
	insertBanner();
	loadLoginPage();
	addClass("progressDialog", "slideUp");
	setTimeout(close, 250);
}
function close() {
	delChild("progressDialog");
}

/******************
* INPUT VALIDATION
*******************/
function isAlphabetical(text) {
	return /^[a-zA-Z]+$/.test(text);
}

function isAlphanumerical(text) {
	return /^[a-zA-Z0-9]+$/.test(text);
}
function isPassword(text) {
	// At least 8 characters with 1 upper, lower, number and symbol
	return /^[a-zA-Z0-9!@#$%^&*()]{8}$/.test(text);
}

/************
* USER LOGIN
*************/
function validateLogin() {
	var user = getFormValue("loginForm", "userInput");
	var pass = getFormValue("loginForm", "pwordInput");
	// Validate
	if (!user || !pass) {
		errorMsg("loginForm", "Please enter your username and/or password.");
	} else if (!localStorage.users) {
		errorMsg("loginForm", "There are no registered users on this device! Please register.");
		createTestUser();
	} else if (!isAlphanumerical(user) || !isPassword(pass)) { // Unrecognized Input
		errorMsg("loginForm", "There was an error processing your request! Please try again.");
	} else { // Scan for matching login
		var i = findUser(user);
	  if (i >= 0 && passMatches(pass, i)) {
			importUser(i); // Valid User Found
			loadDrinksPage();
		}	else { // Unauthorized Login Attempt
			errorMsg("loginForm", "Username and/or password not recognized! Please try again."); 
		}
	}
}

/*******************
* USER REGISTRATION
********************/
function validateRegistration() {
	var first = getFormValue("registerForm", "firstInput");
	var last  = getFormValue("registerForm", "lastInput");
	var user  = getFormValue("registerForm", "userInput");
	var pass  = getFormValue("registerForm", "pwordInput");
	// Validate
	if (!isAlphabetical(first) || !isAlphabetical(last)) {
		errorMsg("registerForm", "Please enter your name using only letters.");
	} else if (!isAlphanumerical(user)) {
		errorMsg("registerForm", "Please enter a username using only letters and numbers.");
	} else if (!isPassword(pass)) {
		errorMsg("registerForm", "Please choose a password with 1 uppercase, 1 lowercase, 1 number, 1 symbol and at least 8 characters.");
	} else if (!findUser(user) == -1) { // findIndex() returns -1 when no match
		errorMsg("registerForm", "That username has already been taken! Please choose another username.");
	} else {registerUser(first, last, user, pass);}
}
function registerUser(first, last, user, pass) {
	if (!localStorage.users) {
		setupStorage();
	} 
	storeUser(first, last, user, pass);
	loadLoginPage();
	alert("Registration successful! Please log in to continue.")
}

/***************
* LOCAL STORAGE
****************/
function createTestUser() {
	var users = [
		{	first: "John",
      last:  "Doe",	
			user:  "example",
			pass:  "P@55word",	
			favs: ["frost5", "latte1", "mocha1", "rebel0", "rebel2", "rebel3"]
		} 
	];
	localStorage.users = JSON.stringify(users);
	alert("A test user (example:P@55word) has been created for you.");
}
function setupStorage() {
	var users = [];
	localStorage.users = JSON.stringify(users);	
}
function storeUser(first, last, user, pass, favs = undefined) {
	var users = JSON.parse(localStorage.users);
	var user = {first: first, last: last, user: user, pass: pass, favs: favs};
	users.push(user);
	localStorage.users = JSON.stringify(users);
}
function findUser(user) {
	var users = JSON.parse(localStorage.users);
	return users.findIndex(userExists, user);
}
function userExists(user) {
	return user.user == this;	
}
function passMatches(pass, i) {
	var users = JSON.parse(localStorage.users);
	return pass == users[i].pass;
}
function importUser(i) {
	var localUsers = JSON.parse(localStorage.users);
	activeUser = new User(localUsers[i].first, localUsers[i].last, 
												localUsers[i].user, localUsers[i].favs);
}
function updatePass(pass) {
	var users = JSON.parse(localStorage.users);
	var i = users.findIndex(userExists, activeUser.user);
	users[i].pass = pass;
	localStorage.users = JSON.stringify(users);
}
function updateFavs() {
	var users = JSON.parse(localStorage.users);
	var i = users.findIndex(userExists, activeUser.user);
	users[i].favs = activeUser.favs;
	localStorage.users = JSON.stringify(users);
}
function clearStorage() {
	if (localStorage.users) localStorage.removeItem("users");
	loadLoginPage();
	alert("All users have been deleted.");
}