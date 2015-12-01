// setup Express
var app = require('./models/express.js');
var home = require('./models/express.js');


//setup mongoose
var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/activities');
var db = mongoose.connect('mongodb://ds031972.mongolab.com:31972/activityfinder');

//models
var api = require('./models/api.js');
var User = require('./models/user.js');
var Activity = require('./models/activity.js');

// start the server
var server = app.listen(3000, function() {
console.log("Started on port 3000");
var host = server.address().address;
var port = server.address().port;
});