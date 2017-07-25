/* AUTHOR : Christopher Griffin
 * 
 * Drink Objects
 */
/*************
* DRINK Object
**************/
function Drink(type, id, name, ingredients) {
	// Properties
	this.type 			 = type;
	this.id 				 = this.setID(id);
	this.name 			 = name
	this.image 			 = this.setImage(name);
	this.ingredients = ingredients;
	this.desc        = this.setDesc(ingredients);
}
// Methods
Drink.prototype.setID = function(id) {
	return this.type.toLowerCase() + id; // "Example: "frost2"
}
Drink.prototype.setImage = function(name) {
	var path;
	// Generate Filepath
	var lower = name.toString().toLowerCase(); 	 // "Cool Drink" => "cool drink"
	if (/\s/.test(lower)) {         		 				 // Does name contain spaces?
		var words = lower.split(" "); 		 				 // "cool drink" => ["cool","drink"];
		path = words[0];
		for (var i = 1; i < words.length; i++) path += "-" + words[i];
	} else {
		path = lower;
	} // Create PNG image link without non-hyphen special characters
	return path.replace(/[^a-z-]/g, "") + ".png";
}
Drink.prototype.setDesc = function(ingredients) {
	return this.name + ": a " + this.type.toLowerCase() + " mixed with "
									 + this.joinIngredients(ingredients) + ".";
}
Drink.prototype.joinIngredients = function(ingredients) {
	var ingredientList = ingredients[0];
	for (var i = 1; i < ingredients.length; i++) {
		ingredientList += (i == (ingredients.length - 1) ? " and " : ", ")
										+ ingredients[i];
	}
	return ingredientList.toLowerCase();
}
	
/*************
* BREVE Drink
**************/
function Breve(id, name, ingredients, isIced) {
	// Properties
	this.type = "Breve";
	this.isIced = isIced;
	// Inherited
	Drink.call(this, this.type, id, name, ingredients);
}
// Inheritance
Breve.prototype = Object.create(Drink.prototype);
Breve.prototype.constructor = Breve;
// Methods
Breve.prototype.setDesc = function(ingredients) {
	return this.name + ": this " + (this.isIced ? "iced" : "hot") + " breve "
									 + "is mixed with " + this.joinIngredients(ingredients) + ".";
}

/**************
* FREEZE Drink
***************/
function Freeze(id, name, ingredients) {
	// Properties
	this.type = "Freeze";
	// Inherited
	Drink.call(this, this.type, id, name, ingredients);	
}
// Inheritance
Freeze.prototype = Object.create(Drink.prototype);
Freeze.prototype.constructor = Freeze;

/*************
* FROST Drink
**************/
function Frost(id, name, ingredients) {
	// Properties
	this.type = "Frost";
	// Inherited
	Drink.call(this, this.type, id, name, ingredients);	
}
// Inheritance
Frost.prototype = Object.create(Drink.prototype);
Frost.prototype.constructor = Frost;

/*************
* LATTE Drink
**************/
function Latte(id, name, ingredients, isIced) {
	// Properties
	this.type = "Latte";
	this.isIced = isIced;
	// Inherited
	Drink.call(this, this.type, id, name, ingredients);	
}
// Inheritance
Latte.prototype = Object.create(Drink.prototype);
Latte.prototype.constructor = Latte;
// Methods
Latte.prototype.setDesc = function(ingredients) {
	return this.name + ": this " + (this.isIced ? "iced" : "hot") + " latte "
									 + "is mixed with " + this.joinIngredients(ingredients) + ".";
}

/*************
* MOCHA Drink
**************/
function Mocha(id, name, ingredients, isIced) {
	// Properties
	this.type = "Mocha";
	this.isIced = isIced;
	// Inherited
	Drink.call(this, this.type, id, name, ingredients);
}
// Inheritance
Mocha.prototype = Object.create(Drink.prototype);
Mocha.prototype.constructor = Mocha;
// Methods
Mocha.prototype.setDesc = function(ingredients) {
	return this.name + ": this " + (this.isIced ? "iced" : "hot") + " mocha "
									 + "is mixed with " + this.joinIngredients(ingredients) + ".";
}

/*************
* REBEL Drink
**************/
function Rebel(id, name, ingredients, isIced) {
	// Properties
	this.type = "Rebel";
	this.isIced = isIced;
	// Inherited
	Drink.call(this, this.type, id, name, ingredients);	
}
// Inheritance
Rebel.prototype = Object.create(Drink.prototype);
Rebel.prototype.constructor = Rebel;
// Methods
Rebel.prototype.setDesc = function(ingredients) {
	return this.name + ": this " + (this.isIced ? "iced" : "blended") + " rebel "
									 + "is mixed with " + this.joinIngredients(ingredients) + ".";
}

/***********
* TEA Drink
************/
function Tea(id, name, ingredients, isIced) {
	// Properties
	this.type = "Tea";
	this.isIced = isIced;
	// Inherited
	Drink.call(this, this.type, id, name, ingredients);
}
// Inheritance
Tea.prototype = Object.create(Drink.prototype);
Tea.prototype.constructor = Tea;
// Methods
Tea.prototype.setDesc = function(ingredients) {
	return this.name + ": this " + (this.isIced ? "iced" : "hot") + " tea "
									 + "is mixed with " + this.joinIngredients(ingredients) + ".";
}