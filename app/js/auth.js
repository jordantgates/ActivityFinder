
// authentication object
var auth = {
  register: function(email, username, password, cb) {
    // submit request to server, call the callback when complete
    var url = "/api/users/register";
    console.log("trying to register");
    $.ajax({
      url: url,
      contentType: 'application/json',
      type: 'POST',
      data:JSON.stringify({
        'user': {
        'email': email,
        'username': username,
        'password': password
      }}),
      // on success, store a login token
      success: function(res) {
        localStorage.token = res.token;
        localStorage.username = res.username;
        this.onChange(true);
        if (cb)
          cb(true);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Error Reg: "+status+" "+err+" "+xhr);

        // if there is an error, remove any login token
        delete localStorage.token;
        delete localStorage.username;
        this.onChange(false);
        if (cb)
          cb(false);
      }.bind(this)
    });
  },
  // login the user
  login: function(email, password, cb) {
    // submit login request to server, call callback when complete
    cb = arguments[arguments.length - 1];
    // check if token in local storage
    if (localStorage.token) {
      this.onChange(true);
      if (cb)
        cb(true);
      return;
    }

    // submit request to server
    var url = "/api/users/login";
    $.ajax({
      url: url,
      contentType: 'application/json',
      type: 'POST',
      data:JSON.stringify({
        'user': {
        'email': email,
        'password': password
      }}),
      success: function(res) {
        // on success, store a login token
        localStorage.token = res.token;
        localStorage.username = res.username;
        this.onChange(true);
        if (cb)
          cb(true);
      }.bind(this),
      error: function(xhr, status, err) {
        // if there is an error, remove any login token
        delete localStorage.token;
        delete localStorage.username;
        this.onChange(false);
        if (cb)
          cb(false);
      }.bind(this)
    });
  },
  // get the token from local storage
  getToken: function() {
    return localStorage.token;
  },
  // get the name from local storage
  getUsername: function() {
    return localStorage.username;
  },
  // logout the user, call the callback when complete
  logout: function(cb) {
    delete localStorage.token;
    delete localStorage.username;
    this.onChange(false);
    if (cb) cb();
  },
  // check if user is logged in
  loggedIn: function() {
    return !!localStorage.token;
  },
  // default onChange function
  onChange: function() {},
};

module.exports = auth;
