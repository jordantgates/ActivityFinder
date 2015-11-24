

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var Home = React.createClass({
  render: function(){
    return (
        <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        Start Bootstrap
                    </a>
                </li>
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li>
                    <a href="#">Shortcuts</a>
                </li>
                <li>
                    <a href="#">Overview</a>
                </li>
                <li>
                    <a href="#">Events</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Services</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </div>

        <div id="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Welcome to Activity Finder</h1>
                        <p>This is some lovely text.</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

      );
  }
})


var App = React.createClass({
	render: function() {
		return (
      <div>
      <nav className="navbar navbar-default navbar-fixed-top">
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
