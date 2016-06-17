// setup Express
var app = require('./models/express.js');
var home = require('./models/express.js');


//setup mongoose
var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/activities');
var db = mongoose.connect('mongodb://activityFinder:activityFinder360@ds031972.mongolab.com:31972/activityfinder');

//models
var api = require('./models/api.js');
var User = require('./models/user.js');
var Activity = require('./models/activity.js');

// start the server
var port = 8080;
var server = app.listen(port, function() {
    var reportString = "Started on port " + port;
	console.log(reportString);
	var host = server.address().address;
	var port = server.address().port;
});