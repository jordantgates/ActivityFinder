var ActivityList = require("./activityList.js");


var DATA = [
  {
    "title": "Nickel City", 
    "description": "Arcade games for a nickel! Great for a cheap date.",
    "price": "5.00", 
    "tags": ["cheap", "gaming", "arcade", "nickel", "date"], 
    "seasons": ["spring", "summer", "fall", "winter"], 
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
    "tags": ["free", "outdoors", "frisbee", "golf"], 
    "seasons": ["spring", "summer", "fall"], 
    "address": "Any Park",
    "creator": "Blue42",
    "upvotes": "3",
    "comments": []
  },
  {
    "title": "Little Ceasars",
    "description": "Best cheap dinner option.",
    "price": "5.39",
    "tags": ["dinner", "cheap", "pizza", "party"],
    "season": ["spring", "summer", "fall", "winter"],
    "address": "434 N 900 EAST, PROVO, UT 84606",
    "creator": "Ceasar",
    "upvotes": "139",
    "comments": []
  }
];


var Home = React.createClass({
    getInitialState: function(){
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
        <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                        Filters
                </li>
                <hr/>
                <li>
                    <table><tbody><tr>
                    <td>
                    <button onClick={this.clear}>Clear Filters</button>
                    </td><td>&nbsp;</td><td>
                    Sort by:
                    <select ref="sort" onChange={this.handleSort}>
                      <option value="popularity">Popularity</option>
                      <option value="price">Price</option>
                    </select>
                    </td>
                    </tr></tbody></table>
                </li>
                <hr/>
                <li>
                    <p>Key words</p>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. outdoors, date, cheap, winter" 
                        ref="filterText"
                        onChange={this.handleTextFilter}/>
                </li>
                <hr/>
                <li>
                    <p>Price Range</p>
                    <p>
                    $<input 
                        type="text" 
                        size="5" 
                        placeholder="0" 
                        ref="priceMin"
                        onChange={this.handlePriceMin}/>

                     &nbsp;-&nbsp; 

                    $<input 
                        type="text" 
                        size="5" 
                        placeholder="10" 
                        ref="priceMax"
                        onChange={this.handlePriceMax}/>
                    </p>
                </li>
                <hr/>
                <li>
                    <p>Season</p>
                    <div className="checkbox">
                      <label><input type="checkbox" value="spring"/>Spring</label>
                      <label><input type="checkbox" value="summer"/>Summer</label>
                    </div>
                    <div className="checkbox">
                      <label><input type="checkbox" value="fall"/>Fall</label>
                      <label><input type="checkbox" value="winter"/>Winter</label>
                    </div>
                </li>
                <hr/>
                <li>
                    <p>Distance</p>
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
            <ActivityList 
                data={DATA} 
                keyWords={this.state.keyWords} 
                priceMin={this.state.priceMin} 
                priceMax={this.state.priceMax}
                sort={this.state.sort}/>
        </div>

    </div>

      );
  }
})

// API object
var api = {
    // get the list of activities (sorted), call the callback when complete
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