var API = require("./api.js");

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
        }.bind(this));
    },

  render: function(){
    return (

    <div id="page-content-wrapper">
            <div className="container-fluid">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>Create an Activity</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.createActivity}>
                            <div className="input-group">
  								<span className="input-group-addon" id="Title-addon">Title</span>
                                <input type="text" className="form-control" id="ActivityTitle" placeholder="Activity Title" ref="title"/>
                            </div>
                            <br/>
                            <div className="input-group">
  								<span className="input-group-addon" id="Activity-addon">Description</span>
                                <input type="text" className="form-control" id="ActivityDescription" placeholder="Activity Description" ref="description"/>
                            </div>
                            <br/>
                            <div className="input-group">
  								<span className="input-group-addon" id="Tags-addon">Tags</span>
                                <input type="text" className="form-control" id="ActivityTags" placeholder="Activity Tags" ref="tags"/>
                            </div>
                            <br/>
                            <div className="input-group">
                                <span className="input-group-addon" id="Price-addon">Price</span>
                                <span className="input-group-addon" id="Price-addon"><span className="glyphicon glyphicon-usd" aria-hidden="true"></span></span>
                                <input type="number" className="form-control" id="ActivityCost" ref="cost"/>
                            </div>
                            <br/>
                            <div className="input-group">
  								<span className="input-group-addon" id="Address-addon">Address</span>
                                <input type="text" className="form-control" id="ActivityAddress" placeholder="Activity Adress" ref="address"/>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
       </div>
      );
  }
})

module.exports = CreateActivity;
