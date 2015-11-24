var ActivityList = require("./activityList.js");

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
    "address": "Any Park",
    "creator": "Blue42",
    "upvotes": "3",
    "comments": []
  }
];


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
                    <div id="none" className="col-lg-12">
                        <h1>Welcome to Activity Finder</h1>
                        <p>Use the filters on the left to find the perfect activity! Or, browse some of our top rated activities:</p>
                        <br/><br/>
                    </div>
                </div>
            </div>
            <ActivityList data={DATA} />
        </div>

    </div>

      );
  }
})

module.exports = Home;