var app = require('./express.js');
var User = require('./user.js');
var Activity = require('./activity.js');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
}));

// get the list of activities that the current user has liked
app.get('/api/users/likes', function (req, res){
  // find the user with the given username
  user = User.verifyToken(req.headers.authorization, function(user) {
  //console.log(user);
    if (user) {
      res.json({activities: user.activitiesLiked});
      return;
    }
    res.sendStatus(403);
    return;
  });
});



// register a user
app.post('/api/users/register', function (req, res) {
  console.log("register@API\n email:"+req.body.user.email+" username:"+
  req.body.user.username+" password:"+req.body.user.password);
    // find or create the user with the given email
    User.findOrCreate({_id: req.body.user.email}, function(err, user, created) {
        if (created) {
          // if this username is not taken, then create a user record
          user.username = req.body.user.username;
          user.set_password(req.body.user.password);
          user.email = req.body.user.email;
          user.admin=false;
          user.activitiesLiked=[];
          user.save(function(err) {
      if (err) {
        console.log("error building/saving");
        res.sendStatus(403);
        return;
      }
            // create a token
      var token = User.generateToken(user.email);
            // return value is JSON containing the user's name and token
            res.json({username: user.username, token: token});
          });
        } else {
          // return an error if the username is taken
          console.log("error looking");
          res.sendStatus(403);
        }
      });
  });


// login a user
app.post('/api/users/login', function (req, res) {
  console.log("login@API\n email:"+req.body.user.email);
    // find the user with the given username
    User.findOne({email: req.body.user.email}, function(err,user) {
	    if (err) {
	      res.sendStatus(403);
	      return;}
        // validate the user exists and the password is correct
        if (user && user.checkPassword(req.body.user.password)) {
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
    user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      //if the token is valid, create the activity for the user
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
    } else {
        res.sendStatus(403);
    }
    });
});

// update an activity
// used for adding comments
app.put('/api/activities/:_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    console.log(user);
    if (user) {
      // if the token is valid, then find the requested activity
      Activity.findById(req.params._id, function(err,activity) {
    if (err) {
      console.log("error: could not find the activity");
      res.sendStatus(500);
      return;
    }
    //activity.upvotes = req.body.activity.upvotes;
    activity.comments = req.body.activity.comments;
    activity.save(function(err) {
      if (err) {
        console.log("error saving activity");
        res.sendStatus(500);
        return;
      }
          // return value is the item as JSON
          res.json({activity:activity});
        });
      });
    } else {
      console.log("error: invalid user. Failed verification");
      res.sendStatus(403);
    }
  });
});

app.put('/api/users/addLike', function (req,res){
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    console.log(user);
    if(user){
      if(user.activitiesLiked.indexOf(req.body.activityTitle) === -1){
          user.activitiesLiked.push(req.body.activityTitle);
          user.save(function(err) {
            if (err) {
              console.log("error saving user");
              res.sendStatus(500);
              return;
            }
            // return value is the item as JSON
            res.json({user:user});
          });
        } else {
          console.log("error: invalid user. Failed verification");
          res.sendStatus(403);
        }
      }else{
        console.log("error: already liked that activity");
        res.sendStatus(500);
      }
  });
});

app.put('/api/users/removeLike', function (req,res){
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    console.log(user);
    if(user){
      var index = user.activitiesLiked.indexOf(req.body.activityTitle);
      if(index > -1){
          user.activitiesLiked.splice(index, 1);
          user.save(function(err) {
            if (err) {
              console.log("error saving user");
              res.sendStatus(500);
              return;
            }
            // return value is the item as JSON
            res.json({user:user});
          });
        } else {
          console.log("error: invalid user. Failed verification");
          res.sendStatus(403);
        }
    }else{
      console.log("error: tried to unlike an activity that was not liked");
      res.sendStatus(500);
    }
  });
});

