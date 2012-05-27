var fs = require('fs');

console.log('Initializing DAO');

var data = require('./auctions.json');
var bids = {};

data.forEach(function(item) {
	item.current = item.price;
	item.bids = [];
});

exports.auctions = function() {
	return data;
};

exports.item = function(id) {
	for (var j=0; j<data.length; j++) {
		if (data[j].id == id) {
			return data[j];
		}
	}
	return {};
};

