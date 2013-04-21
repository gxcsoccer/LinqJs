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

/**
 * 遍历
 */
Enumerable.prototype.forEach = function(action) {
	var index = 0;
	var enumerator = this.getEnumerator();

	while (enumerator.moveNext()) {
		if (action(enumerator.current(), index++) === false) break;
	}
	return this;
};

/** 
 * 查询
 */
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
		});
	});
};

/**
 * 提取
 */
Enumerable.prototype.select = function(selector) {
	var source = this;

	return new Enumerable(function() {
		var enumerator;
		var index = 0;

		return new IEnumerator(

		function() {
			enumerator = source.getEnumerator();
		}, function(yield) {
			if (enumerator.moveNext()) {
				return yield(selector(enumerator.current(), index++));
			}
			return false;
		});
	});
};

/**
 * 正序排序
 */
Enumerable.prototype.orderBy = function(keySelector) {
	keySelector = keySelector ||
	function(a) {
		return a;
	}
	var source = this;

	return new Enumerable(function() {
		var indexes = [],
			buffer = [],
			index = 0,
			enumerator;

		return new IEnumerator(

		function() {
			enumerator = source.getEnumerator();
			source.forEach(function(item, index) {
				indexes.push(index);
				buffer.push(item);
			});

			indexes.sort(function(a, b) {
				return keySelector(buffer[a]) > keySelector(buffer[b]);
			});

		}, function(yield) {
			return (index < indexes.length) ? yield(buffer[indexes[index++]]) : false;
		});
	});
};

/**
 * 倒序排序
 */
Enumerable.prototype.orderByDescending = function(keySelector) {
	keySelector = keySelector ||
	function(a) {
		return a;
	}
	var source = this;

	return new Enumerable(function() {
		var indexes = [],
			buffer = [],
			index = 0,
			enumerator;

		return new IEnumerator(

		function() {
			enumerator = source.getEnumerator();
			source.forEach(function(item, index) {
				indexes.push(index);
				buffer.push(item);
			});

			indexes.sort(function(a, b) {
				return keySelector(buffer[a]) < keySelector(buffer[b]);
			});

		}, function(yield) {
			return (index < indexes.length) ? yield(buffer[indexes[index++]]) : false;
		});
	});
};

/**
 * 获取头几个
 */
Enumerable.prototype.take = function(count) {
	var source = this;

	return new Enumerable(function() {
		var enumerator;
		var index = 0;

		return new IEnumerator(

		function() {
			enumerator = source.getEnumerator();
		}, function(yield) {
			while (index++ < count && enumerator.moveNext()) {
				return yield(enumerator.current());
			}
			return false;
		});
	});
};

/**
 * 获取个数
 */
Enumerable.prototype.count = function() {
	var count = 0;
	this.forEach(function() {
		count++;
	});
	return count;
};

/**
 * 转换为数组
 */
Enumerable.prototype.toArray = function() {
	var array = [];
	this.forEach(function(x) {
		array.push(x)
	});
	return array;
};

module.exports = Enumerable;