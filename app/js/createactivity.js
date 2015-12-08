var API = require("./api.js");


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
  }
];


var CreateActivity = React.createClass({
    
    getInitialState: function() {
        return {
            // there was an error on logging in
            error: false
        };
    
    },
    
    createActivity: function(event){
        event.preventDefault();
        
        var title = this.refs.title.value;
        var tags = this.refs.tags.value.split(/[ ,]+/);
        var description = this.refs.description.value;
        var cost = this.refs.cost.value;
        var address = this.refs.address.value;
        var activity = {};
        activity.title = title;
        activity.tags = tags;
        activity.description = description;
        activity.price = cost;
        activity.address = address;
        activity.comments = [];
        API.createActivity(activity, function(submitSucceeded){
            if (submitSucceeded){
                this.forceUpdate();
            }
            else{
                return this.setState({
                    error: true
                });
            }
        });
    },

  render: function(){
    return (
        
    <div id="wrapper">
        <div id="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div id="none" className="col-lg-12">
                        <h1>Create an Activity</h1>
                        <p>Use the filters on the left to find the perfect activity! Or, browse some of our top rated activities:</p>
                        <br/><br/>
                    </div>
                </div>
            </div>
        </div>
        {this.state.error ? (
             <div className="alert">Something went wrong.</div>
           ) : null}
            <div className="panel panel-primary">
                <div className="panel-heading">
                </div>
                <div className="panel=body">
                     <form onSubmit={this.createActivity}>
                        <div className="form-group">
                            <label htmlFor="ActivityTitle">Title</label>
                            <input type="text" className="form-control" id="ActivityTitle" placeholder="Activity Title" ref="title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ActivityDescription">Description</label>
                            <input type="text" className="form-control" id="ActivityDescription" placeholder="Activity Description" ref="description"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ActivityTags">Tags</label>
                            <input type="text" className="form-control" id="ActivityTags" placeholder="Activity Tags" ref="tags"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ActivityCost">Price</label>
                            <span>$<input type="number" className="form-control" id="ActivityCost" ref="cost"/></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ActivityAddress">Address</label>
                            <input type="text" className="form-control" id="ActivityAddress" placeholder="Activity Adress" ref="address"/>
                        </div>
                        
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
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

module.exports = CreateActivity;
