

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var Home = React.createClass({
  
  render: function() {
    return (
      <div>
      <center>
        <h1> Welcome to Activity Finder! </h1>
        <form className="navbar-form navbar-center" role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search for an activity"/>
          </div>
          <button type="submit" className="btn btn-default">Search</button>
        </form>
        </center>
      </div>
    );
  }
})



var App = React.createClass({
	render: function() {
		return (
      <div>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
            <ul className="nav navbar-nav">
                <li className="active"><a href="#">Home</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-center">
                <li><a href="#/submit">Submit an Activity Idea</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#/login">Login</a></li>
                <li><a href="#/register">Register</a></li>
            </ul>
        </div>
      </nav>
      <div id="children">
      {this.props.children}
      </div>
      </div>
    );
  }
});


var routes = (
  <Router>
    <Route name="home" path="/" component={Home} />
    <Route path="*" component={Home} />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('content'));
ReactDOM.render(routes, document.getElementById('children'));
