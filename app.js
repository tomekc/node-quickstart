
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var dao = require('./dao');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app)

var EventEmitter = require( "events" ).EventEmitter;
var bidsEmitter = new EventEmitter();
dao.useEmitter(bidsEmitter);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/item/:id', routes.item);
app.post('/item/:id/bid', routes.bid);

// io.sockets.on('msg', function(socket) {
// 	socket.emit('bid', { id:id, amount:amt, numbids:item.bids.length });
// });

io.sockets.on('connection', function(socket) {
	bidsEmitter.on('bid', function(data) {
		socket.emit('bid', data);
	});
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
