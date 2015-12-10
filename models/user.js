// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

// setup bcrypt
var bcrypt = require('bcrypt');
var SALT = bcrypt.genSaltSync();

// setup json web token
var jwt = require('jsonwebtoken');
var SECRET = '\x1f\x1e1\x8a\x8djO\x9e\xe4\xcb\x9d`\x13\x02\xfb+\xbb\x89q"F\x8a\xe0a';

// User info, with Activities created by that user
var userSchema = new Schema({
    _id: { type: String, index: true, unique: true},
    email: { type: String, index: true, unique: true},
    username: String,
    password_hash: String,
    admin: Boolean,
    activitesLiked:[String],
});

// hash the password
userSchema.methods.set_password = function(password) {
    this.password_hash = bcrypt.hashSync(password, SALT);
};

// check the password
userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password,this.password_hash);
};

// Generate a token for a client
userSchema.statics.generateToken = function(email) {
    return jwt.sign({ email: email }, SECRET);
};

// Verify the token from a client. Call the callback with a user object if successful or null otherwise.
userSchema.statics.verifyToken = function(token,cb) {
  console.log("Verifying Token");

    if (!token) {
      console.log("No Token");
        cb(null);
        return;
    }
    // decrypt the token and verify that the encoded user id is valid
    jwt.verify(token, SECRET, function(err, decoded) {
        if (!decoded) {
          console.log("Nothing after decode");
            cb(null);
            return;
        }
        console.log(decoded);
        User.findOne({email: decoded.email},function(err,user) {
	    if (err) {
          console.log("error decoding");
		cb(null);
	    } else {
          console.log("verified");
		cb(user);
	    }
	});
    });
};

// add findOrCreate
userSchema.plugin(findOrCreate);

// create user
var User = mongoose.model('users', userSchema);

module.exports = User;
