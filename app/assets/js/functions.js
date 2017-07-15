/* AUTHOR : Christopher Griffin
 * 
 * Miscellaneous Functions
 */

// Global Variables
var user;     // User Login/Password
var drinks;   // Drink Catalog
var viewport; // <main> Quick Reference

// App Initialization
window.onload = function() {
  viewport = getByID("viewport");
  importCatalog();
 }

// Data Import
function importCatalog() {
  // Create Progress Dialog
  insertProgressDialog();
  var progress = getByID("progressBar");
  var status   = getByID("progressStatus");
  // Request JSON Catalog
  var jsonCatalog = new XMLHttpRequest();
  jsonCatalog.open("GET", "assets/json/catalog.json");
  jsonCatalog.onloadstart = function() {
      progress.value = 0;
      status.innerHTML = "Loading Data: 0%";
  }
  jsonCatalog.onprogress = function(bar) {
    if (bar.lengthComputable) {
      // Update Progress Bar
      progress.value = bar.loaded;
      progress.max = bar.total;
      status.innerHTML = "Loading Data: " 
                       + Math.floor((bar.loaded / bar.total) * 100) + "%";
    }
  }
  jsonCatalog.onloadend = function(bar) {
    // Store Catalog Locally
    drinks = JSON.parse(jsonCatalog.responseText);
    // Cleanup Progress Bar
    progress.value = bar.loaded;
    status.innerHTML = "Loading Data: 100%";
    setTimeout(removeProgressDialog, 2000);
  }
  jsonCatalog.send();
}
function insertProgressDialog() {
  var dialog = newElement("DIV");
  dialog.id = "progressDialog";
  addChild(viewport, dialog);
  var bar = newElement("PROGRESS");
  bar.id = "progressBar";
  addChild(dialog, bar);
  var status = newElement("P");
  status.id = "progressStatus";
  addChild(dialog, status);
}
function removeProgressDialog() {
  delChild("progressDialog");
}
