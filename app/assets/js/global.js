/* AUTHOR : Christopher Griffin
 * 
 * Globally Used Functions
 */

// CREATE
function newElement(tag) {return document.createElement(tag);}
function newText(text)   {return document.createTextNode(text);}

// ADD
function addChild(parent, child)     {parent.appendChild(child);       }
function addClass(id, css)           {getByID(id).classList.add(css);             }
function addEvent(id, event, action) {getByID(id).addEventListener(event, action);}

// REMOVE
function delChild(id) {(getByID(id).parentElement).removeChild(getByID(id));}
function delClass(id, css)           {getByID(id).classList.remove(css);}
function delEvent(id, event, action) {getByID(id).removeEventListener(event, action);}

// GET ELEMENTS
function getByID(id)        {return document.getElementById(id);          }
function getByClass(name)   {return document.getElementsByClassName(name);}
function getByTag(name)     {return document.getElementsByTagName(name);  }
function getBySelector(css) {return document.querySelectorAll(css);       }