# Extends

A method to extend classes in Javascript.

**Features:**
- super method calling `this._super()`
- static properties
- object cloning with `this.clone()`


**Examples:**

```
var Class = function() {};

var Stuff = extend(Class, {
	statics: {
		COLOR_RED: 'red',
		COLOR_BLUE: 'blue'
	},
	
	setColor: function(color) {
		this.color = color;
	}
});

// extended classes will have a .extend method
var Ball = Stuff.extend({
	setColor: function(color) {
		this._super(color);
		this.updateBallColor();
	},
	updateBallColor: function() {
		// do something	
	}
});

```
