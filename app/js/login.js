var Login = React.createClass( {

	render: function(){
		return (
			<div id="wrapper">
	        <div id="page-content-wrapper">
	            <div className="container-fluid">
	                <div className="panel panel-primary">
											<div className="panel-heading">
												<h3 className="panel-title">Login using your email address</h3>
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
	                </div>
	        </div>
	    </div>
		); } });

		module.exports = Login;
