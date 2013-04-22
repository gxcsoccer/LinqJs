var chai = require('chai'),
	should = chai.should(),
	expect = chai.expect,
	linq = require('../'),
	toString = Object.prototype.toString;

describe('Operation Array', function() {
	it('should be able to enumerate the collection', function() {
		var em = linq.fromArray([1, 2, 3, 4, 5]),
			tmp = [];
		em.forEach(function(item, index) {
			tmp.push(item);
		});

		tmp.should.have.length(5);
		tmp[0].should.equal(1);
	});

	it('should be able to count the collection', function() {
		var em = linq.fromArray([1, 2, 3, 4, 5]);
		em.count().should.equal(5);
	});

	it('should be able to convert to array', function() {
		var em = linq.fromArray([1, 2, 3, 4, 5]),
			arr = em.toArray();

		toString.call(arr).should.equal('[object Array]');
		arr.should.have.length(5);
		arr[4].should.equal(5);
	});

	it('should be able to filter the collection', function() {
		var em = linq.fromArray([1, 2, 3, 4, 5]),
			newEm = em.where(function(item) {
				return item > 2;
			}),
			arr = newEm.toArray();

		arr.should.have.length(3);
		arr[0].should.equal(3);
	});

	it('should be able to order the collection', function() {
		var em = linq.fromArray([3, 23, 1, 324, 45, 3]),
			oArr = em.orderBy().toArray();

		oArr.should.have.length(6);
		oArr[0].should.equal(1);
		oArr[1].should.equal(3);
		oArr[2].should.equal(3);
		oArr[3].should.equal(23);
		oArr[4].should.equal(45);
		oArr[5].should.equal(324);
	});

	it('should be able to order by desendence', function() {
		var em = linq.fromArray([3, 23, 1, 324, 45, 3]),
			oArr = em.orderByDescending().toArray();

		oArr.should.have.length(6);
		oArr[5].should.equal(1);
		oArr[4].should.equal(3);
		oArr[3].should.equal(3);
		oArr[2].should.equal(23);
		oArr[1].should.equal(45);
		oArr[0].should.equal(324);
	});

	it('should be able to map the collection to new one', function() {
		var em = linq.fromArray([1, 2]),
			newEm = em.select(function(item) {
				return item * 2;
			}),
			arr = newEm.toArray();

		arr.should.have.length(2);
		arr[0].should.equal(2);
		arr[1].should.equal(4);
	});

	it('should be able to call function using chain style', function() {
		var em = linq.fromArray([1, 2, 3, 4, 5]),
			newEm = em.where(function(item) {
				return item > 3;
			}).orderByDescending().select(function(item) {
				return item + 100;
			}),
			arr = newEm.toArray();

		arr.should.have.length(2);
		arr[0].should.equal(105);
		arr[1].should.equal(104);
	});
});