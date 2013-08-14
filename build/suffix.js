
	exports.extend = function(a, b) {
		var len = arguments.length,
			firstIsFunction = (typeof a === f),
			emptyClass = function() {};

		if (len === 1) {
			if (firstIsFunction) {
				// one parameter, a class constructor
				return extend(a, {});
			}

			// one parameter, class prototype
			return extend(emptyClass, (typeof a === 'object' && a !== null && a) || {});
		}

		if (len === 2) {
			// two parameters, constructor and new prototype
			return extend((firstIsFunction && a) || emptyClass, (typeof b === 'object' && b !== null && b) || {});
		}

		// no parameters, empty class
		return extend(emptyClass, {});
	};

}(typeof exports === 'object' && exports || this);