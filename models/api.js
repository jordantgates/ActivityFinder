var app = require('./express.js');
var User = require('./user.js');
var Activity = require('./activity.js');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
}));

//
// API
//

// register a user
app.post('/api/users/register', function (req, res) {
    // find or create the user with the given username
    User.findOrCreate({username: req.body.username}, function(err, user, created) {
        if (created) {
            // if this username is not taken, then create a user record
            user.name = req.body.name;
            user.set_password(req.body.password);
            user.save(function(err) {
		if (err) {
		    res.sendStatus("403");
		    return;
		}
                // create a token
		var token = User.generateToken(user.username);
                // return value is JSON containing the user's name and token
                res.json({name: user.name, token: token});
            });
        } else {
            // return an error if the username is taken
            res.sendStatus("403");
        }
    });
});

// login a user
app.post('/api/users/login', function (req, res) {
    // find the user with the given username
    User.findOne({username: req.body.username}, function(err,user) {
	if (err) {
	    res.sendStatus(403);
	    return;
	}
        // validate the user exists and the password is correct
        if (user && user.checkPassword(req.body.password)) {
            // create a token
            var token = User.generateToken(user.username);
            // return value is JSON containing user's name and token
            res.json({name: user.name, token: token});
        } else {
            res.sendStatus(403);
        }
    });
});

// get all activities
app.get('/api/activities', function (req,res) {
    Activity.find({}, function(err, activities) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
		// return value is the list of activities as JSON
		res.json({activities: activities});
	});
});

// add an activity
app.post('/api/activities', function (req,res) {
    // validate the supplied token
    // get indexes
    user = User.verifyToken(req.headers.authorization, function(user) {
        if (user) {
            // if the token is valid, create the activity for the user
	    Activity.create({
	    	title:req.body.activity.title,
	    	description:activity.description,
	    	price:activity.price,
	    	tags:activity.tags,
	    	address:activity.address,
	    	creator:user.id,
	    	upvotes:0,
	    }, function(err,item) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
		res.json({item:item});
	    });
        } else {
            res.sendStatus(403);
        }
    });
});

// update an activity
app.put('/api/activities/:_id', function (req,res) {
  // validate the supplied token
  //user = User.verifyToken(req.headers.authorization, function(user) {
    if (true){//user) {
      // if the token is valid, then find the requested activity
      console.log(req.params._id);
      Activity.findById(req.params._id, function(err,activity) {
    if (err) {
      res.sendStatus(403);
      return;
    }
    // update the item if it belongs to the user, otherwise return an error
    // if (item.user != user.id) {
    //   res.sendStatus(403);
    //   return;
    // }
    console.log(activity);
    activity.upvotes = req.body.activity.upvotes;
    activity.comments = req.body.activity.comments;
    //OTHER THINGS
    activity.save(function(err) {
      if (err) {
        console.log(err);
        console.log("1");
        res.sendStatus(403);
        return;
      }
          // return value is the item as JSON
          res.json({activity:activity});
        });
      });
    } else {
        console.log("2");
      res.sendStatus(403);
    }
  //}); //end verifyToken
});