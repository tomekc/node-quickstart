var fs = require('fs');

console.log('Initializing DAO');

var data = require('./auctions.json');

data.forEach(function(item) {
	item.current = 0;
})

exports.auctions = function() {
	return data;
}