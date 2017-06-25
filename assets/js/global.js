/* AUTHOR : Christopher Griffin
 * 
 * Globally Used Functions
 */

// CREATE
function newElement(tag) {return document.createElement(tag);  }
function newText(text)   {return document.createTextNode(text);}
function newEvent(id, event, action) {getByID(id).addEventListener(event, action);}

// DESTROY
function delElement(parent, child) {getByID(parent).removeChild(child);}
function delEvent(id, event, action) {getByID(id).removeEventListener(event, action);}

// GET ELEMENTS
function getByID(id)        {return document.getElementById(id);          }
function getByClass(name)   {return document.getElementsByClassName(name);}
function getByTag(name)     {return document.getElementsByTagName(name);  }
function getBySelector(css) {return document.querySelectorAll(css);       }

// GET FORM DATA
function getInput(formName, inputName) {
  return document.forms.formName.inputName.value;
}