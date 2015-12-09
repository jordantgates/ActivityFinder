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
app.get('/api/users/likes', function (req, res){
  // find the user with the given username
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      res.json({activities: user.activitesLiked});
      return;
    }
    res.sendStatus("403");
    return;
  });
});



// register a user
app.post('/api/users/register', function (req, res) {
    // find or create the user with the given email
    User.findOrCreate({_id: req.body.user.email}, function(err, user, created) {
        if (created) {
            // if this email is not taken, then create a user record
            user.email = req.body.user.email;
            user.set_password(req.body.user.password);
            user.admin = false;
            user.activitiesLiked = [];
            user.username = req.body.user.username;
            user.save(function(err) {
		if (err) {
		    res.sendStatus("403");
		    return;
		}
                // create a token
		var token = User.generateToken(user.username);
                // return value is JSON containing the user's name and token
                res.json({username: user.username, token: token});
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
    User.findOne({email: req.body.email}, function(err,user) {
	if (err) {
	    res.sendStatus(403);
	    return;
	}
        // validate the user exists and the password is correct
        if (user && user.checkPassword(req.body.password)) {
            // create a token
            var token = User.generateToken(user.email);
            // return value is JSON containing user's username and token
            res.json({username: user.username, token: token});
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
    // user = User.verifyToken(req.headers.authorization, function(user) {
    //     if (user) {
            // if the token is valid, create the activity for the user
	    Activity.create({
            _id:req.body.activity.title,
	    	title:req.body.activity.title,
	    	description:req.body.activity.description,
	    	price:req.body.activity.price,
	    	tags:req.body.activity.tags,
	    	address:req.body.activity.address,
	    	upvotes:0,
	    }, function(err,item) {
		if (err) {
            console.log(err);
		    res.sendStatus(403);
		    return;
		}
		res.json({item:item});
	    });
       // } else {
       //     res.sendStatus(403);
    //     }
    // });
    });

// update an activity
app.put('/api/activities/:_id', function (req,res) {
  // validate the supplied token
  //user = User.verifyToken(req.headers.authorization, function(user) {
    if (true){//user) {
      // if the token is valid, then find the requested activity
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
    activity.upvotes = req.body.activity.upvotes;
    activity.comments = req.body.activity.comments;
    activity.save(function(err) {
      if (err) {
        res.sendStatus(403);
        return;
      }
          // return value is the item as JSON
          res.json({activity:activity});
        });
      });
    } else {
      res.sendStatus(403);
    }
  //}); //end verifyToken
});
