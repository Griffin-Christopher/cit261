/* AUTHOR : Christopher Griffin
 * 
 * Globally Used Functions & Variables
 */
 
/**********************
* LOCAL STORAGE Object
**************************************************
* [ARRAY] Users {user, user, etc.}
* '-[OBJECT] User {first, last, user, pass, favs}
*    '-[ARRAY] Favs {id, id, etc.}
**************************************************/
/*************
* USER Object
**************/
function User(first, last, user, favs = []) {
	// Properties
	this.first = first;
	this.last  = last;
	this.user  = user;
	this.favs  = favs;
	// Methods
	this.addFav = function(id) {
		this.favs.push(id);
		updateFavs();
	}
	this.delFav = function(id) {
		var i = this.favs.findIndex(this.findID, id);
		this.favs.splice(i, 1);
		updateFavs();
	}
	this.findID = function(id) {
		return id == this; 
	}
}
 
// VARIABLES
var activeUser; // Active User
var lastUser;   //
var catalog;  	// Drink Catalog
var banner;   	// <header>
var viewport;	  // <main>
var navbar;   	// <footer>

// CREATE
function newElement(tag) {return document.createElement(tag);}
function newText(text)   {return document.createTextNode(text);}

// COMMON ELEMENTS
function errorMsg(id, text) {
	var error = getByID("error");
	if (error) {
		error.innerHTML = text;
	} else {
		error = newPara(text);
		error.id = "error";
		addChild(getByID(id), error);
	}
}
function newButton(id, type, action, text) {
	var button = newElement("BUTTON");
	button.id = id;
	button.type = "button";
	setupButton(button, type);  // nav, form, text
	button.addEventListener("click", action);
	button.innerHTML = text;
	return button;
}
function newCaption(text) {
	var caption = newElement("FIGCAPTION");
	caption.innerHTML = text;
	return caption;
}
function newDiv(id) {
	var div = newElement("DIV");
	div.id = id;
	return div;
}
function newFigure(id, path, alt, caption = null) {
	var figure = newElement("FIGURE");
	figure.id = id;
	addChild(figure, newImage(path, alt));
	if (caption) addChild(figure, newCaption(caption));
	return figure;
}
function newForm(id, method) {
	var form = newElement("FORM");
	form.id = id;
	form.method = method;
	form.onsubmit = "return false"; // Prevent page refresh
	return form;
}
function newH1(id, text) {
	var h1 = newElement("H1");
	h1.id = id;
	h1.innerHTML = text;
	return h1;
}
function newH2(id, text) {
	var h2 = newElement("H2");
	h2.id = id;
	h2.innerHTML = text;
	return h2;
}
function newImage(path, alt) {
	var image = newElement("IMG");
	image.src = path;
	image.alt = alt;
	return image;
}
function newInput(id, type, placeholder = "", value = "") {
	var input = newElement("INPUT");
	input.id = id;
	input.type = type;
	input.name = id;
	input.placeholder = placeholder; // Empty by default
	input.value = value;             // Empty by default
	return input;
}
function newLabel(target, text) {
	var label = newElement("LABEL");
	label.htmlFor = target;
	label.innerHTML = text;
	return label;	
}
function newPara(text) {
	var paragraph = newElement("P");
	paragraph.innerHTML = text;
	return paragraph;
}

// ADD
function addChild(parent, child)     {parent.appendChild(child);                  }
function addClass(id, css)           {getByID(id).classList.add(css);             }
function addEvent(id, event, action) {getByID(id).addEventListener(event, action);}

// REMOVE
function delChild(id) {(getByID(id).parentElement).removeChild(getByID(id));         }
function delClass(id, css)           {getByID(id).classList.remove(css);             }
function delEvent(id, event, action) {getByID(id).removeEventListener(event, action);}

// GET ELEMENTS
function getByID(id)        		 {return document.getElementById(id);          }
function getByClass(name)   		 {return document.getElementsByClassName(name);}
function getByTag(name)     		 {return document.getElementsByTagName(name);  }
function getBySelector(css) 		 {return document.querySelectorAll(css);       }
function getFormValue(id, input) {return document.forms[id][input].value;      }