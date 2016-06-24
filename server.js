// setup Express
var app = require('./models/express.js');

// start the server
var port = 8080;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    var reportString = "Started on host " + host + ", port " + port;
    console.log(reportString);
	
});