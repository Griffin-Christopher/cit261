/* AUTHOR : Christopher Griffin
 * 
 * Page Assembly Functions
 */
 
/**********************
* SUPPORTING FUNCTIONS
***********************/
function resetViewport() {
	while (viewport.firstChild && viewport.firstChild.id != "progressDialog") {
		viewport.removeChild(viewport.firstChild);
	}
}
function insertLogo() {
	var logo = newImage("assets/images/dutch-bros-logo.png", "Dutch Bros. Logo");
	logo.id = "loginLogo";
	addChild(viewport, logo);
}
function logout() {
	loadLoginPage();
	activeUser = undefined;
}
function getType(id) {
	return id.replace(/[^a-z]/g, "");
}
function getIndex(id) {
	return id.replace(/[^0-9]/g, "");
}

/********
* BANNER
*********/
function insertBanner() {
	delClass("banner", "hidden");
	addChild(banner, newH1("pageTitle", "Dutch Bros. Secret Menu"));
}
function removeBanner() {
	addClass("banner", "hidden");
	delChild("headerText");
}

/*********
* NAV BAR
**********/
function insertGuestNav() {
	delClass("navbar", "hidden");
	addChild(navbar, newButton("guestNav", "nav", loadDrinksPage, "Just show me the goods!"));
}
function removeGuestNav() {
	addClass("navbar", "hidden");
	delChild("guestNav");
}
function insertMainNav() {
	delClass("navbar", "hidden");
	// Navigation Bar
	var mainNav = newDiv("mainNav");
	addChild(navbar, mainNav);
	// Pages
	addChild(mainNav, newButton("homeLink",   "nav", loadHomePage,   "Home")  );
	addChild(mainNav, newButton("drinksLink", "nav", loadDrinksPage, "Drinks"));
	addChild(mainNav, newButton("favsLink",   "nav", loadFavsPage,   "Favs")  );
	// Login/Logout
	if (activeUser) {addChild(mainNav, newButton("logoutLink", "nav", logout, "Logout"));} 
	else {addChild(mainNav, newButton("loginLink", "nav", loadLoginPage, "Login"));}
}
function removeMainNav() {
	addClass("navbar", "hidden");
	delChild("mainNav");
}
// Used by newButton() in global.js
function setupButton(button, type) {
	switch(type) {
		case "nav":
			button.addEventListener("touchstart", navButtonOn);
			button.addEventListener("touchend", navButtonOff);
			break;
		case "form":
			button.addEventListener("touchstart", formButtonOn);
			button.addEventListener("touchend", formButtonOff);
			break;
		case "text":
			button.addEventListener("touchstart", textButtonOn);
			button.addEventListener("touchend", textButtonOff);
			break;
	}	
}
function navButtonOn(event) {
	addClass(event.target.id, "navTouch");
}
function navButtonOff(event) {
	delClass(event.target.id, "navTouch");
}
function formButtonOn(event) {
	addClass(event.target.id, "formTouch");
}
function formButtonOff(event) {
	delClass(event.target.id, "formTouch");
}
function textButtonOn(event) {
	addClass(event.target.id, "textTouch");
}
function textButtonOff(event) {
	delClass(event.target.id, "textTouch");
}

/************
* LOGIN Page
*************/
function loadLoginPage() {
	resetViewport();
	insertLogo();
	insertLoginForm();
	if (getByID("mainNav")) {removeMainNav();}
	if (!getByID("guestNav")) {insertGuestNav();}
}
function insertLoginForm() {
	addChild(viewport, newH2("loginPrompt", "Please Sign In:"));
	// Form
	var loginForm = newForm("loginForm", "post");
	addChild(viewport, loginForm);
	// Inputs
	addChild(loginForm, newLabel("userInput", "Username") );
	addChild(loginForm, newInput("userInput", "text")     );
	addChild(loginForm, newLabel("pwordInput", "Password"));
	addChild(loginForm, newInput("pwordInput", "password"));
	// Buttons
	var formButtons = newDiv("formButtons");
	addChild(viewport, formButtons);
	addChild(formButtons, newButton("loginButton", "form", validateLogin, "Log In"));
	addChild(formButtons, newButton("registerButton", "text", loadRegisterPage, "Not registered? Sign up!"));
}

/***************
* REGISTER Page
****************/
function loadRegisterPage() {
	resetViewport();
	insertLogo();
	insertRegisterForm();
}
function insertRegisterForm() {
  addChild(viewport, newH2("registerPrompt", "Welcome to Dutch Bros."));
	// Form
	var registerForm = newForm("registerForm", "post");
	addChild(viewport, registerForm);
	// Inputs
	addChild(registerForm, newLabel("firstInput", "First Name")					);
	addChild(registerForm, newInput("firstInput", "text", "Jane / John"));
	addChild(registerForm, newLabel("lastInput", "Last Name")           );
	addChild(registerForm, newInput("lastInput", "text", "Doe")					);
	addChild(registerForm, newLabel("userInput", "Username")						);
	addChild(registerForm, newInput("userInput", "text")    						);
	addChild(registerForm, newLabel("pwordInput", "Password")						);
	addChild(registerForm, newInput("pwordInput", "password")    				);
	// Buttons
	var formButtons = newDiv("formButtons");
	addChild(viewport, formButtons);
	addChild(formButtons, newButton("registerButton", "form", validateRegistration, "Register"));
	addChild(formButtons, newButton("loginButton", "text", loadLoginPage, "Already registered? Login now!"));
}

/***********
* HOME Page
************/
function loadHomePage() {
	if (activeUser) {
		resetViewport();
		insertAccountInfo();
		insertFavsList();
	} else {
		loadLoginPage();
		alert("Please log in to access your profile!");
	}
}
function insertAccountInfo() {
	var heading = "Profile for " + activeUser.user;
	addChild(viewport, newH2("infoHeading", heading));
	var accountInfo = newDiv("accountInfo");
	addChild(viewport, accountInfo);
	var firstName = "First Name: " + activeUser.first;
	addChild(accountInfo, newPara(firstName));
	var lastName = "Last Name: " + activeUser.last;
	addChild(accountInfo, newPara(lastName));
	addChild(accountInfo, newButton("deleteUsers", "text", clearStorage, "Delete All Users"));
}
function insertFavsList() {
	addChild(viewport, newH2("favsHeading", "Favorites:"));
	var favsList = newDiv("favsList");
	addChild(viewport, favsList);
	// Prepare Favorites List
	var list = compileList();
	if (list.length) {
		// Create Table
		var table = newElement("TABLE");
		table.id = "favsTable";
		addChild(favsList, table);
		var header = newElement("TR");
		addChild(table, header);
		var favType = newElement("TH");
		favType.innerHTML = "Type";
		addChild(header, favType);
		var favName = newElement("TH");
		favName.innerHTML = "Name";
		addChild(header, favName);
		// Fill Table
		for (var i = 0; i < list.length; i++) {
			var row = newElement("TR");
			addChild(table, row);
			var type = newElement("TD");
			type.innerHTML = (list[i].type).toUpperCase();
			addChild(row, type);
			var name = newElement("TD");
			addChild(row, name);
			var drink = newButton(list[i].id, "text", loadProductPage, list[i].name);
			drink.addEventListener("touchstart", favsListOn);
			drink.addEventListener("touchend", favsListOff);
			addChild(name, drink);
		}
	} else {addChild(favsList, newPara("You do not have any favorites."));}
}
function compileList() {
	var favsList = [];
	for (var i = 0; i < activeUser.favs.length; i++) {
		// Convert ID to ID/Type/Name sets
		var id 		= activeUser.favs[i];
		var type 	= getType(id);
		var name 	= catalog[type][getIndex(id)].name;
		var drink = {id: id, type: type, name: name};
		favsList.push(drink);
	} // Sort alphabetically by drink name
	favsList.sort(function(a,b) {
									return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
								});
	return favsList;
}

/*************
* DRINKS Page
**************/
function loadDrinksPage() {
	resetViewport();
	insertTypes();
	if (getByID("guestNav")) {removeGuestNav();}		
	if (!getByID("mainNav")) {insertMainNav();}
}
function insertTypes() {
	var index = newDiv("index");
	addChild(viewport, index);
	// Drink Types
	for (key in catalog) {
		var drinkType = newFigure((key), ("assets/images/" + key + ".png"), 
		                          ("Dutch Bros. " + key + "s"), key.toUpperCase());
		drinkType.addEventListener("click", loadDrinks);
		addChild(index, drinkType);
	}
}
function loadDrinks(event) {
	resetViewport();
	var gallery = newDiv("gallery");
	addChild(viewport, gallery);
	// Drinks of Type
	var type = event.currentTarget.id;
	for (var i = 0; i < catalog[type].length; i++) {
		var drink = newFigure( catalog[type][i].id, 
		                      ("assets/images/" + type + "/" + catalog[type][i].image),
		                      ("Dutch Bros. " + catalog[type][i].name));
		drink.addEventListener("click", loadProductPage);
		addChild(gallery, drink);
		addClass(catalog[type][i].id, "hidden");
		setTimeout(function(id) {			
				addClass(id, "flipIn");
				delClass(id, "hidden");
			}, 
		(i * 100), catalog[type][i].id);
	}
}

/**************
* PRODUCT Page
***************/
function loadProductPage(event) {
	resetViewport();
	insertProduct(event.currentTarget.id);
}
function insertProduct(id) {
	var product = newDiv("product");
	addChild(viewport, product);
	// Product Information
	var type = getType(id);
	var i    = getIndex(id);
	addChild(product, newImage(("assets/images/" + type + "/" + catalog[type][i].image),
	                           ("Dutch Bros. " + catalog[type][i].name)));
	addChild(product, newPara(catalog[type][i].desc));
	// Favorite Button
	var favText = "ADD TO FAVORITES";
	if (activeUser) {
		if (activeUser.favs.find(isFav, id)) {
			var favText = "REMOVE FROM FAVORITES";
		}
	}
	addChild(product, newButton(id, "text", toggleFavorite, favText));
}
function isFav(id) {
	return id == this;
}
function toggleFavorite(event) {
	if (activeUser)	{
		var id = event.target.id;
		if (activeUser.favs.find(isFav, id)) {
			activeUser.delFav(id);
			alert(catalog[getType(id)][getIndex(id)].name 
			      + " has been removed from your favorites!");
		} else {
			activeUser.addFav(id);
			alert(catalog[getType(id)][getIndex(id)].name 
			      + " has been added to your favorites!");
		}
		loadFavsPage();
	} else {alert("Please log in to add this drink to favorites!");}
}

/****************
* FAVORITES Page
*****************/
function loadFavsPage() {
	if (activeUser) {
		resetViewport();
		insertFavorites();
	}
	else {
		loadLoginPage();
		alert("Please log in to begin tracking your favorite drinks!");
	}
}
function insertFavorites() {
	var favorites = newDiv("favorites");
	addChild(viewport, favorites);
  // Prepare Favorites List
	var gallery = compileGallery();
	if (gallery.length) { 
		for (var i = 0; i < gallery.length; i++) {
			var drink = newFigure( gallery[i].id,
														("assets/images/" + gallery[i].type + "/" + gallery[i].image),
														("Dutch Bros. " + gallery[i].name));
			drink.addEventListener("click", loadProductPage);
			addChild(favorites, drink);
			addClass(gallery[i].id, "hidden");
			setTimeout(function(id) {			
					addClass(id, "flipIn");
					delClass(id, "hidden");
				}, 
			(i * 100), gallery[i].id);
		}
	} else {addChild(favorites, newPara("You do not have any favorites."));}	
}
function compileGallery() {
	var favsList = [];
	for (var i = 0; i < activeUser.favs.length; i++) {
		// Convert ID to ID/Type/Name/Image sets
		var id 	  = activeUser.favs[i];
		var type  = getType(id);
		var name  = catalog[type][getIndex(id)].name;
		var image = catalog[type][getIndex(id)].image;
		var drink = {id: id, type: type, name: name, image: image};
		favsList.push(drink);
	} // Sort alphabetically by drink name
	favsList.sort(function(a,b) {
									return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
								});
	return favsList;
}