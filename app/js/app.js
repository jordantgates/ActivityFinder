

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var DATA = [
  {
    "title": "Nickel City", 
    "description": "Arcade games for a nickel! Great for a cheap date.",
    "price": "5.00", 
    "tags": "cheap, gaming, arcade, nickel, date", 
    "seasons": "spring, summer, fall, winter", 
    "address": "1515 S State St, Orem, UT 84097",
    "creator": "alphaMale",
    "upvotes": "45",
    "comments" : [
      {
        "user": "Blue42",
        "comment": "Great Place! Had tons of fun here."
      },
      {
        "user": "Red5",
        "comment": "Some of the machines were broken. Overall great place."
      }
    ]
  },
  {
    "title": "Frisbee Golf", 
    "description": "Go to a park and pick targets to make a course.",
    "price": "0.00", 
    "tags": "free, outdoors, frisbee, golf", 
    "seasons": "spring, summer, fall", 
    "address": "",
    "creator": "Blue42",
    "upvotes": "3",
    "comments": []
  }
];

var ActivityList = React.createClass({
    render: function() {
        return (
          <div>
            { this.props.data.map(function(item) {
                    return (
                      <div>
                        <div>Title: {item.title}</div>
                        <div>Description: {item.description}</div>
                        <div>Up Votes: {item.upvotes}</div>
                        <br/><br/>
                      </div>
                      );
                })
            }
          </div>
        );
    }
});

var Home = React.createClass({
  render: function(){
    return (
        <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                        Search Filters
                </li>
                <li>
                    <a href="#">Clear Filters</a>
                </li>
                <li>
                    Key words
                    <input type="text" className="form-control" placeholder="e.g. outdoors, date, cheap" />
                </li>
                <li>
                    Price Range
                    <p>
                    $<input type="text" size="5" placeholder="0" />
                     &nbsp;-&nbsp; 
                    $<input type="text" size="5" placeholder="10" />
                    </p>
                </li>
                <li>
                    Season
                    <div className="checkbox">
                      <label><input type="checkbox" value=""/>Spring</label>
                      <label><input type="checkbox" value=""/>Summer</label>
                    </div>
                    <div className="checkbox">
                      <label><input type="checkbox" value=""/>Fall</label>
                      <label><input type="checkbox" value=""/>Winter</label>
                    </div>
                </li>
                <li>
                    Distance
                    <p>
                    <input type="text" size="5" placeholder="15" />
                    &nbsp;miles
                    </p>
                </li>
            </ul>
        </div>

        <div id="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Welcome to Activity Finder</h1>
                        <p>Use the filters on the left to find the perfect activity! Or, browse some of our top rated activities:</p>
                        <br/><br/>
                    </div>
                    <ActivityList data={DATA} />
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
