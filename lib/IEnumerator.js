var ST_INIT = 0,
	ST_INITED = 1;

function noop() {}

function yield(value) {
	this.cur = value;
	return true;
}

var IEnumerator = function(initializer, tryGetNext) {
		if (!(this instanceof IEnumerator)) {
			return new IEnumerator(initialize, tryGetNext);
		}

		this.state = ST_INIT;
		this.tryGetNext = tryGetNext;
		this.initializer = initializer || noop;
	};

IEnumerator.prototype.moveNext = function() {
	if (this.state == ST_INIT) {
		this.initializer();
		this.state = ST_INITED;
	}

	return this.tryGetNext(yield.bind(this));
};

IEnumerator.prototype.current = function() {
	return this.cur;
};

module.exports = IEnumerator;