var Home = require("./home.js");
var CreateActivity = require("./createactivity.js");
var Login = require("./login.js");

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;


var App = React.createClass({
	// initial state
  getInitialState: function() {
    return {
      // the user is logged in
      loggedIn: auth.loggedIn()
    };
  },

  // callback when user is logged in
  setStateOnAuth: function(loggedIn) {
    this.setState({loggedIn:loggedIn});
  },

  // when the component loads, setup the callback
  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
  },
	render: function() {
		return (
      <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <ul className="nav navbar-nav navbar-left">
                <li><a href="#">Home</a></li>
								<li><a href="#/createactivity">Submit an Activity Idea</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
						{this.state.loggedIn ? (
                 <ul className="nav navbar-nav">
                   <li><a href="#/login">Login/Register</a></li>
                   <li><a href="#" onClick={this.logout}>Logout</a></li>
                 </ul>
               ) : (<div></div>)}
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
    <Route name="login" path="/login" component={Login}/>
    <Route path="*" component={Home} />

  </Router>
);

ReactDOM.render(<App />, document.getElementById('content'));
ReactDOM.render(routes, document.getElementById('children'));

module.exports = App;
