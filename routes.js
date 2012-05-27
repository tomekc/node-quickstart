var dao = require('./dao');

/*
 * GET home page.
 */

exports.index = function(req, res){
	
	console.log('Num '+dao.auctions().length );
	
  res.render('index', { 
	title: 'AleDrogo', 
	items: dao.auctions()
	});
};


exports.item = function(req,res) {
	var item = dao.item(req.params.id);
	
	// console.log('Item:' + JSON.stringify(item) );
	// console.log('Flaszka' + JSON.stringify(req.flash()));
	
	res.render('item', { 'title':'AleDrogo', 'item':item, flash:req.flash() });
};


// place bid
exports.bid = function(req, res) {
	var id = req.params.id
	var bidder = req.body.user
	var amount = req.body.bid
	
	console.log('Bid '+amount+' from '+bidder+' on '+id);
	
	var ok = dao.placeBid(id,amount,bidder);
	if (ok) {
		req.flash('info', 'Dziękujęmy za licytację')
	} else {
		req.flash('error', 'Błąd, oferujesz za mało?')
	}
	res.redirect('/item/'+req.params.id)
};
