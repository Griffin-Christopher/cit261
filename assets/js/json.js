/* AUTHOR : Christopher Griffin
 * 
 * JSON Parse, Stringify
 * Using XMLHttpRequest to Consume a JSON Web Servce
 * 
 */
// Global Mini-Database
var miniDB;

// On Page Load
function onLoad() {
  // XMLHttpRequest
  importJSON(function(response) {
    // Create JSON object
    miniDB = JSON.parse(response);
  });
  // Fill page author & default values
  pageInit(miniDB);
}

// Pull In JSON Data
function importJSON(callback) {
  var xhr = new XMLHttpRequest();
  // Prepare object for JSON file input
  xhr.overrideMimeType("application/json");
  // Open the file
  xhr.open("GET", "testobjects.json", true);
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      // Send JSON object to callback
      callback(xhr.responseText);
    }
  };
  // Process request
  xhr.send(null);
}

// Populate Page Date
function pageInit(imported) {
  setAuthor(imported.author);
  setQuote(imported.quote);
  setFormDefaults(imported.defaults);
  listVisitors(imported.visitors);
}
function setAuthor(author) {
  getByID("author").innerHTML = author;
}
function setQuote(quote) {
  getByID("quote").innerHTML = quote;
}
function setFormDefaults(defaults) {
  
}
function listVisitors(visitors) {
  
}


// Use/Create Data (User Fills Form)

// Push Out Data - (Save Form Input in JSON)


// Refresh - (Releoad Page and check for first non-default user)


// Confirm Data - (List JSON File Objects)