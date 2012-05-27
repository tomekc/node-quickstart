var socket = io.connect('http://localhost:3000');
	socket.on('bid', function (data) {
	console.log("SIO update: " + JSON.stringify(data));
	if (data.id !== undefined) {
		$('#price-'+data.id).html(data.amount);
		$('#count-'+data.id).html(data.count);
	}
});
