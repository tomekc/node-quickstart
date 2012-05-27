var fs = require('fs');

console.log('Initializing DAO');

var data = require('./auctions.json');

function find(id) {
	for (var j=0; j<data.length; j++) {
		if (data[j].id == id) {
			return data[j];
		}
	}
	return {};
}

data.forEach(function(item) {
	item.current = item.price;
	item.bids = [];
});

exports.auctions = function() {
	return data;
};

exports.item = function(id) {
	return find(id);
};

exports.placeBid = function(id,amount,bidder) {
	var item = find(id);
	var amt = parseInt(amount);
	var curr = parseInt(item.current);
	
	if (isNaN(amt)) {
		return false;
	}
	
	if (amt < curr) {
		return false;
	}
	item.current = amount;
	item.bids.push( {amount:parseInt(amount), bidder:bidder, date:new Date()});
	
	console.log('Bids' + JSON.stringify(item.bids));
	
	return true;
	
}
