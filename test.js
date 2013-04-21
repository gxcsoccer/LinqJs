var Enumerable = require("./lib/Enumerable");

var a = Enumerable.fromArray([1, 2, 3, 4, 5, 6]).where(function(item, index) {
	return item > 2;
}).select(function(item) {
	return item + 100;
}).orderByDescending(function(a) {
	return a;
}, true).take(2).forEach(function(item) {
	console.log(item);
}).toArray();

console.log(a);