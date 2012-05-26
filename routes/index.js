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