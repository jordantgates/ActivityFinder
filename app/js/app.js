var Home = require("./home.js");
var CreateActivity = require("./createactivity.js");
var Login = require("./login.js");

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;


var App = React.createClass({
	render: function() {
		return (
      <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <ul className="nav navbar-nav">
                <li><a href="#">Home</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-center">
                <li><a href="#/createactivity">Submit an Activity Idea</a></li>
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
    <Route name="createactivity" path="/createactivity" component={CreateActivity} />
    <Route name="home" path="/" component={Home}/>
    <Route name="login" path="/" component={Login}/>
    <Route path="*" component={Home} />
    
  </Router>
);

ReactDOM.render(<App />, document.getElementById('content'));
ReactDOM.render(routes, document.getElementById('children'));

module.exports = App;
