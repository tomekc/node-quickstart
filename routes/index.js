var dao = require('../dao');

/*
 * GET home page.
 */

exports.index = function(req, res){
	
	console.log('Num '+dao.auctions().length );
	
  res.render('index', { 
	title: 'AleDrogo', 
	items: dao.auctions(),
	})
};


exports.item = function(req,res) {
	res.render('item', { 'title':'AleDrogo', 'itemid':req.params.id });
}