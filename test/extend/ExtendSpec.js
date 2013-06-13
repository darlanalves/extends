describe('Extend - class extension', function() {
	var DummyClass = function() {};

	it('should extend a class', function() {
		var A = extend(DummyClass);
		var B = A.extend(A);
		expect(B).toBeDefined();
		expect(typeof B).toBe('function');
	});

	it('should add static properties', function() {
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