var auth = require("./auth.js");

var Login = React.createClass( {

	// initial state
	  getInitialState: function() {
			return {error: false};},

	  // handle login button submit
	  loginAttempt: function() {
	    // get data from form
	    var email = this.refs.loginEmail.value;
	    var password = this.refs.loginPassword.value;
	    if (!email || !password) {
				this.setState({error: true});
				this.forceUpdate();
	      return;
	    }
	    // login via API
			auth.login(email, password, function(loggedIn) {
      // login callback
      if (!loggedIn){
				this.setState({error: true});
				this.forceUpdate();
	      return;
			}
			this.setState({error: false});
			this.forceUpdate();
			window.location.href = "#/home";
	    }.bind(this));
	  },

		registerAttempt: function() {
	    // get data from form
			var username = this.refs.registerUsername.value;
	    var email = this.refs.registerEmail.value;
	    var password = this.refs.registerPassword.value;
			if (!email || !password|| !username) {
				window.alert("Please enter information for all fields");
	      return;
	    }
	    // login via API
			auth.register(email, username, password, function(loggedIn) {
      // login callback
      if (!loggedIn){
				this.setState({error: true});
				this.forceUpdate();
	      return;
			}
			this.setState({error: false});
			this.forceUpdate();
			window.location.href = "#/home";
    }.bind(this));
	  },

//show login form
	render: function(){
		return (
			<div className="container top-buffer">
				{this.state.error ? (
	<h3 ><div className="alert alert-danger text-center" role="alert">Attempt failed, unable to use pairing of password and email</div></h3>
	) : null}
				<div className="row top-buffer">
					<div className="col-sm-5 col-sm-offset-1">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3>Login using your email address</h3>
							</div>
							<div className="panel-body">
								<form onSubmit={this.loginAttempt}>

									<div className="input-group">
										<span className="input-group-addon" id="basic-addon1">Email</span>
										<input type="email" className="form-control" placeholder="Email Address" aria-describedby="basic-addon1" ref="loginEmail" autoFocus={true}/>
									</div>
									<br/>
									<div className="input-group">
										<span className="input-group-addon" id="basic-addon2">Password</span>
										<input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon2" ref="loginPassword"/>
									</div>
									<br/>
									<button className="btn btn-warning" type="submit" >Login</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-sm-5">
						<div className="panel panel-primary">
							<div className="panel-heading">
								<h3 >Register as a new User</h3>
							</div>
							<div className="panel-body">
								<form onSubmit={this.registerAttempt}>
							 		<div className="input-group">
										<span className="input-group-addon" id="basic-addon0">Username</span>
										<input type="text" className="form-control" placeholder="UserName" ref="registerUsername" aria-describedby="basic-addon0"/>
									</div>
									<br/>
									<div className="input-group">
										<span className="input-group-addon" id="basic-addon1">Email</span>
										<input type="email" className="form-control" placeholder="Email Address" ref="registerEmail"  aria-describedby="basic-addon1"/>
									</div>
									<br/>
									<div className="input-group">
										<span className="input-group-addon" id="basic-addon2">Password</span>
										<input type="password" className="form-control" placeholder="Password" ref="registerPassword" aria-describedby="basic-addon2"/>
									</div>
									<br/>
									<button type="submit" className="btn btn-warning">Register</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		); } });

		module.exports = Login;
