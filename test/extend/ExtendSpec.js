describe('Extend - class extension', function() {
	var DummyClass = function() {};

	it("should not call constructor twice", function() {
		var count = 0;

		var Class = extend(function() {
			count++;
			if (count > 1) throw new Error();
		});

		var obj = new Class();
		expect(count).toBe(1);
	});

	it("should setup the prototype chain properly and don't call constructor twice", function() {
		var countA = 0, countB = 0;

		var A = extend({
			constructor: function() {
				countA++;

				if (countA > 1) throw Error();
			}
		});

		var B = extend(A, {
			constructor: function() {
				countB++;

				if (countB > 1) throw Error();
			}
		});

		var a = new A();
		var b = new B();

		expect(countA).toBe(1);
		expect(countB).toBe(1);
		expect(b instanceof B).toBe(true);
		expect(b instanceof A).toBe(true);
	});

	it("should create an empty class", function() {
		var Class = extend();
	});

	it('should extend a class', function() {
		var A = extend(DummyClass);
		var B = A.extend(A);
		expect(B).toBeDefined();
		expect(typeof B).toBe('function');
	});

	it('should add static properties to a new class', function() {
		var A = extend(DummyClass, {
			statics: {
				STATIC_ONE: 1
			}
		});

		var a = new A();
		expect(a.statics).toBeUndefined();
		expect(A.STATIC_ONE).toBeDefined();
		expect(A.STATIC_ONE).toEqual(1);
	});

	it("should call super method on constructor", function() {
		var parentCalled = false,
			subCalled = false;

		var BaseClass = extend(function() {
			parentCalled = true;
		});

		var SubClass = extend(BaseClass, {
			constructor: function() {
				subCalled = true;
				this._super();
			}
		});

		var sub = new SubClass();
		expect(parentCalled).toBe(true);
		expect(subCalled).toBe(true);
	});

	it("should call superclass method via this._super()", function() {
		var SuperClass = extend(DummyClass, {
			test: function() {
				return true;
			}
		});

		var SubClass = SuperClass.extend({
			test: function() {
				return (true && this._super());
			}
		});

		var obj = new SuperClass();
		var sub = new SubClass();
		expect(obj.test()).toBe(true);
		expect(sub.test()).toBe(true);
		expect(sub.test).not.toThrow();
	});

	it('should create a clone', function() {
		var ClonedClass = extend(DummyClass, {
			prop: true
		});

		// creates a instace of our new class
		var obj1 = new ClonedClass;

		// sets the value of obj1.prop
		obj1.prop = false;

		// clones the instance
		var obj2 = obj1.clone();

		// the cloned object must have the same properties
		expect(obj2.prop).toBeDefined();
		expect(obj2.prop).toBe(false);
	});
});