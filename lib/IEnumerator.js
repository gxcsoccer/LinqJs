function noop() {}

function yield(value) {
	this.cur = value;
	return true;
}

var IEnumerator = function(initializer, tryGetNext) {
		if (!(this instanceof IEnumerator)) {
			return new IEnumerator(initialize, tryGetNext);
		}

		this.tryGetNext = tryGetNext;
		this.initializer = initializer || noop;
	};

IEnumerator.prototype.moveNext = function() {
	if (this.initializer) {
		this.initializer();
		this.initializer = null;
	}

	return this.tryGetNext(yield.bind(this));
};

IEnumerator.prototype.current = function() {
	return this.cur;
};

module.exports = IEnumerator;