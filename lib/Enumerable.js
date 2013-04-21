var IEnumerator = require("./IEnumerator");

var Enumerable = function(getEnumerator) {
		this.getEnumerator = getEnumerator;
	};

Enumerable.fromArray = function(source) {
	return new Enumerable(function() {
		var index = 0;

		return new IEnumerator(
		null, function(yield) {
			return (index < source.length) ? yield(source[index++]) : false;
		});
	})
};

Enumerable.prototype.forEach = function(action) {
	var index = 0;
	var enumerator = this.getEnumerator();

	while (enumerator.moveNext()) {
		if (action(enumerator.current(), index++) === false) break;
	}
	return this;
};

Enumerable.prototype.where = function(predicate) {
	var source = this;

	return new Enumerable(function() {
		var enumerator;
		var index = 0;

		return new IEnumerator(

		function() {
			enumerator = source.getEnumerator();
		}, function(yield) {
			while (enumerator.moveNext()) {
				if (predicate(enumerator.current(), index++)) {
					return yield(enumerator.current());
				}
			}
			return false;
		})
	});
};

Enumerable.prototype.toArray = function() {
	var array = [];
	this.forEach(function(x) {
		array.push(x)
	});
	return array;
};

module.exports = Enumerable;