// References:
// Super method: 		http://ejohn.org/blog/simple-javascript-inheritance/
// Prototype setup: 	https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/instanceof

function copy(destination, source) {
	if (Object.keys) {
		Object.keys(source).forEach(function(name) {
			destination[name] = source[name];
		});
	} else {
		var name;
		for (name in source) {
			if (has.call(source, name)) {
				destination[name] = source[name];
			}
		}
	}

	return destination;
}

var has = {}.hasOwnProperty,
	fnTest = /xyz/.test(function() {
		xyz();
	}) ? /\b_super\b/ : /.*/,
	f = 'function';

/**
 * Returns a function used to call superclass methods
 *  - saves old this._super value;
 *  - sets this._super as parent fn
 *  - calls the proto.name fn in the proper scope (this)
 *  - restores the old _super value
 */

function setupSuperMethod(property, superclass, fn) {
	return function() {
		var tmp = this._super;

		// Adds a new this._super() method that references the superclass
		this._super = superclass[property];

		var ret = fn.apply(this, arguments);

		// The method only needs to be bound temporarily, so we
		// remove it when we're done executing
		this._super = tmp;

		return ret;
	};
}

/**
 * @method extend
 */
function extend(SuperClass, prototype) {
	var members, superProto, NewClass, statics = false;

	// if (SuperClass && SuperClass === Object) { SuperClass = Class; }
	if (prototype) {
		if (has.call(prototype, 'statics')) {
			statics = prototype.statics;
			prototype.statics = false;
			delete prototype.statics;
		}

		if (has.call(prototype, 'constructor')) {
			NewClass = prototype.constructor;
		}
	} else {
		prototype = {};
	}

	if (!NewClass) {
		NewClass = function() {
			return this.constructor.apply(this, arguments);
		};
	}

	// we use a dummy constructor to provide inheritance mechanism
	var Surrogate = function() {};

	// a reference to superclass.prototype will allow the 'instanceof' operator to work
	// with all inherited superclasses of a instance
	Surrogate.prototype = SuperClass.prototype;
	Surrogate.prototype.__initialize__ = false;
	NewClass.prototype = new Surrogate();
	NewClass.prototype.__initialize__ = true;
	superProto = SuperClass.prototype;

	var name, member;
	for (name in prototype) {
		// skip reserved keys
		if (name === 'self' || name === 'superclass') continue;
		member = prototype[name];

		// Check if we're overwriting an existing function:
		// if proto.name is function and superclass.name are both function
		// and proto.name has a reference to _super(), we should:
		NewClass.prototype[name] = (typeof member === f && typeof superProto[name] === f && fnTest.test(member)) ? setupSuperMethod(name, superProto, member) : member;
	}

	/**
	 * Creates a clone of this instance
	 * @method
	 * @return {Object}
	 */
	NewClass.prototype.clone = function() {
		return copy(new this.self(), this);
	};

	/**
	 * Copy static properties/methods to new class
	 */
	if (statics) {
		copy(NewClass, statics);
	}

	NewClass.extend = function(prototype) {
		return extend(this, prototype);
	}

	// this.superclass gives access to parent class
	NewClass.superclass = NewClass.prototype.superclass = superProto;

	// this.self is a reference to proto
	NewClass.prototype.self = NewClass;

	return NewClass;
};