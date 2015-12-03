(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Comments = require("./comments.js");

var ActivityList = React.createClass({displayName: "ActivityList",

    handleComments: function(i){
      i.showComments = !i.showComments;
      this.forceUpdate();
    },

    handleComment: function(){

    },

    handleLike: function(){

    },

    render: function() {

        if(this.props.sort === "popularity"){
          this.props.data.sort(function(a,b){
              return b.upvotes - a.upvotes;
          })
        }else if(this.props.sort === "price"){
          this.props.data.sort(function(a,b){
              return parseFloat(a.price) - parseFloat(b.price);
          })
        }

        return (
          React.createElement("div", null, 
             this.props.data.map(function(item, i) {
              var display = true;

              if(parseFloat(item.price) >= this.props.priceMin && 
                parseFloat(item.price) <= this.props.priceMax){
                  if(this.props.keyWords.length > 0){
                      display = false;
                      this.props.keyWords.forEach(function(tag){
                          if(item.tags.indexOf(tag.toLowerCase()) != -1){
                              display = true;
                          }
                      });
                  }
              }else{
                  display = false
              }

              if(display){
                return (
                  React.createElement("div", {className: "rcorners-green", key: i}, 
                    React.createElement("div", null, React.createElement("pTitle", null, item.title)), 
                    React.createElement("div", null, React.createElement("pDesc", null, item.description)), 
                    React.createElement("div", null, "Price: $", item.price), 
                    React.createElement("div", null, "Address: ", item.address), 
                    React.createElement("div", null, "Awesome Factor: ", React.createElement("pVotes", null, item.upvotes)), 
                    React.createElement("br", null), 
                    React.createElement("button", {onClick: this.handleVote}, "Like"), 
                    React.createElement("button", {onClick: this.handleComment}, "Comment"), 
                    React.createElement("button", {onClick: this.handleComments.bind(this, item), id: "rightAlign"}, "Show/Hide Comments"), 
                    React.createElement(Comments, {activity: item}), 
                    React.createElement("br", null)
                  )
                );
              }
            }, this)
            
          )
        );
    }
});

module.exports = ActivityList;

},{"./comments.js":3}],2:[function(require,module,exports){
var Home = require("./home.js");

var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;


var App = React.createClass({displayName: "App",
	render: function() {
		return (
      React.createElement("div", null, 
      React.createElement("nav", {className: "navbar navbar-default navbar-fixed-top"}, 
        React.createElement("div", {className: "container"}, 
            React.createElement("ul", {className: "nav navbar-nav"}, 
                React.createElement("li", {className: "active"}, React.createElement("a", {href: "#"}, "Home"))
            ), 
            React.createElement("ul", {className: "nav navbar-nav navbar-center"}, 
                React.createElement("li", null, React.createElement("a", {href: "#/submit"}, "Submit an Activity Idea"))
            ), 
            React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
                React.createElement("li", null, React.createElement("a", {href: "#/login"}, "Login")), 
                React.createElement("li", null, React.createElement("a", {href: "#/register"}, "Register"))
            )
        )
      ), 
      React.createElement("div", {id: "children"}, 
      this.props.children
      )
      )
    );
  }
});


var routes = (
  React.createElement(Router, null, 
    React.createElement(Route, {name: "home", path: "/", component: Home}), 
    React.createElement(Route, {path: "*", component: Home})
  )
);

ReactDOM.render(React.createElement(App, null), document.getElementById('content'));
ReactDOM.render(routes, document.getElementById('children'));

module.exports = App;

},{"./home.js":4}],3:[function(require,module,exports){

var Comments = React.createClass({displayName: "Comments",
	render: function() {
		if(this.props.activity.showComments){
			if(this.props.activity.comments.length > 0){
				return (
					React.createElement("div", null, React.createElement("br", null), 
						this.props.activity.comments.map(function(comment, i){
								return (
									React.createElement("div", {className: "rcorners-blue", key: i}, 
										comment.comment, 
										React.createElement("br", null), 
										React.createElement("div", null, " ", React.createElement("div", {id: "rightAlign"}, "~", comment.user))
									)
								);
						})
					)
				);
			}else{
				return React.createElement("div", null, "No comments yet on this activity.")
			}
		}else{
			return React.createElement("div", null);
		}
	}
})

module.exports = Comments;

},{}],4:[function(require,module,exports){
var ActivityList = require("./activityList.js");


var DATA = [
  {
    "title": "Nickel City", 
    "description": "Arcade games for a nickel! Great for a cheap date.",
    "price": "5.00", 
    "tags": ["cheap", "gaming", "arcade", "nickel", "date"], 
    "address": "1515 S State St, Orem, UT 84097",
    "creator": "alphaMale",
    "upvotes": "45",
    "showComments": false,
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
    "tags": ["free", "outdoors", "frisbee", "golf"], 
    "address": "Any Park",
    "creator": "Blue42",
    "upvotes": "3",
    "comments": [
        {
            "user": "tester",
            "comment": "This is a long test comment.This is a long test comment.This is a long test comment.This is a long test comment.This is a long test comment.This is a long test comment.This is a long test comment."
        }
    ]
  },
  {
    "title": "Little Ceasars",
    "description": "Best cheap dinner option.",
    "price": "5.39",
    "tags": ["dinner", "cheap", "pizza", "party"],
    "address": "434 N 900 EAST, PROVO, UT 84606",
    "creator": "Ceasar",
    "upvotes": "139",
    "comments": []
  }
];


var Home = React.createClass({displayName: "Home",
    getInitialState: function(){
        console.log(api.getItems());
        return {
            keyWords: [],
            priceMin: 0, 
            priceMax: Infinity,
            sort: "popularity"
        };
    },

    handleTextFilter: function(){
        this.setState({
            keyWords: this.refs.filterText.value.split(', ')
        })
    },

    handlePriceMin: function(){
        this.setState({
            priceMin: this.refs.priceMin.value
        })
    },

    handlePriceMax: function(){
        this.setState({
            priceMax: this.refs.priceMax.value
        })
    },

    handleSort: function(){
        this.setState({
            sort: this.refs.sort.value
        })
    },

    clear: function(){
        this.setState({
            keyWords: [],
            priceMin: 0, 
            priceMax: Infinity,
            sort: "popularity"
        })
        this.refs.filterText.value = ""
        this.refs.priceMin.value = ""
        this.refs.priceMax.value = ""
        this.refs.sort.value = "popularity"
    },

  render: function(){
    return (
        React.createElement("div", {id: "wrapper"}, 
        React.createElement("div", {id: "sidebar-wrapper"}, 
            React.createElement("ul", {className: "sidebar-nav"}, 
                React.createElement("li", {className: "sidebar-brand"}, 
                        "Filters"
                ), 
                React.createElement("hr", null), 
                React.createElement("li", null, 
                    React.createElement("table", null, React.createElement("tbody", null, React.createElement("tr", null, 
                    React.createElement("td", null, 
                    React.createElement("button", {onClick: this.clear}, "Clear Filters")
                    ), React.createElement("td", null, " "), React.createElement("td", null, 
                    "Sort by:", 
                    React.createElement("select", {ref: "sort", onChange: this.handleSort}, 
                      React.createElement("option", {value: "popularity"}, "Popularity"), 
                      React.createElement("option", {value: "price"}, "Price")
                    )
                    )
                    )))
                ), 
                React.createElement("hr", null), 
                React.createElement("li", null, 
                    React.createElement("p", null, "Key words"), 
                    React.createElement("input", {
                        type: "text", 
                        className: "form-control", 
                        placeholder: "e.g. outdoors, date, cheap, winter", 
                        ref: "filterText", 
                        onChange: this.handleTextFilter})
                ), 
                React.createElement("hr", null), 
                React.createElement("li", null, 
                    React.createElement("p", null, "Price Range"), 
                    React.createElement("p", null, 
                    "$", React.createElement("input", {
                        type: "text", 
                        size: "5", 
                        placeholder: "0", 
                        ref: "priceMin", 
                        onChange: this.handlePriceMin}), 

                     " - " + ' ' + 

                    "$", React.createElement("input", {
                        type: "text", 
                        size: "5", 
                        placeholder: "10", 
                        ref: "priceMax", 
                        onChange: this.handlePriceMax})
                    )
                ), 
                React.createElement("hr", null), 
                React.createElement("li", null, 
                    React.createElement("p", null, "Distance"), 
                    React.createElement("p", null, 
                    React.createElement("input", {type: "text", size: "5", placeholder: "15"}), 
                    " miles"
                    )
                )
            )
        ), 

        React.createElement("div", {id: "page-content-wrapper"}, 
            React.createElement("div", {className: "container-fluid"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {id: "none", className: "col-lg-12"}, 
                        React.createElement("h1", null, "Welcome to Activity Finder"), 
                        React.createElement("p", null, "Use the filters on the left to find the perfect activity! Or, browse some of our top rated activities:"), 
                        React.createElement("br", null), React.createElement("br", null)
                    )
                )
            ), 
            React.createElement(ActivityList, {
                data: DATA, 
                keyWords: this.state.keyWords, 
                priceMin: this.state.priceMin, 
                priceMax: this.state.priceMax, 
                sort: this.state.sort})
        )

    )

      );
  }
})

// API object
var api = {
    // get the list of activities, call the callback when complete
    getItems: function(cb) {
        var url = "/api/activities";
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            //headers: {'Authorization': localStorage.token},
            success: function(res) {
                if (cb)
                    cb(true, res);
            },
            error: function(xhr, status, err) {
                // if there is an error, remove the login token
                delete localStorage.token;
                if (cb)
                    cb(false, status);
            }
        });
    }
};

module.exports = Home;

},{"./activityList.js":1}]},{},[2]);
