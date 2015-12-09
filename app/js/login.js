var Login = React.createClass( {


	render: function(){
		return (
			<div id="page-content-wrapper">
				<div className="container-fluid">
					<div className="panel panel-primary">
						<div className="panel-heading">
							<h3>Login using your email address</h3>
											</div>
											<div className="panel-body">
												<form>
													<div className="input-group">
  													<span className="input-group-addon" id="basic-addon1">Email</span>
  													<input type="email" className="form-control" placeholder="Email Address" aria-describedby="basic-addon1"></input>
													</div>
													<br/>
													<div className="input-group">
  													<span className="input-group-addon" id="basic-addon2">Password</span>
  													<input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon2"></input>
													</div>
													<br/>
  											<button type="submit" className="btn btn-primary">Login</button>
												</form>
											</div>
										</div>
										<p> - or register below - </p>
										<div className="panel panel-primary">
												<div className="panel-heading">
													<h3 >Register as a new User</h3>
												</div>

												<div className="panel-body">
													<form>
													<div className="input-group">
														<span className="input-group-addon" id="basic-addon0">Username</span>
														<input type="text" className="form-control" placeholder="UserName" aria-describedby="basic-addon0"></input>
													</div>
													<br/>
														<div className="input-group">
	  													<span className="input-group-addon" id="basic-addon1">Email</span>
	  													<input type="email" className="form-control" placeholder="Email Address" aria-describedby="basic-addon1"></input>
														</div>
														<br/>
														<div className="input-group">
	  													<span className="input-group-addon" id="basic-addon2">Password</span>
	  													<input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon2"></input>
														</div>
														<br/>
														<div className="input-group">
	  													<span className="input-group-addon" id="basic-addon3"> Retype Password</span>
	  													<input type="password" className="form-control" placeholder="Password" aria-describedby="basic-addon3"></input>
														</div>
														<br/>
	  											<button type="submit" className="btn btn-primary">Login</button>
													</form>
												</div>
											</div>
					</div>
			</div>
		); } });

		module.exports = Login;
