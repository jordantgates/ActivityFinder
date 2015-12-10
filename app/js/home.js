var ActivityList = require("./activityList.js");
var api = require("./api.js");


var Home = React.createClass({
    getInitialState: function(){
        api.getItems(this.setActivities)
        // if(!!localStorage.token){
        //     api.getLikesForUser(this.setLikedActivities)
        // }
        return {
            keyWords: [],
            priceMin: 0,
            priceMax: Infinity,
            sort: "popularity",
            activities: [],
        };
    },

    setActivities: function(status, items){
        if(status){
            this.setState({
                activities: items.activities
            })
        }
    },

    // setLikedActivities: function(status, items){
    //     if(status){
    //         this.setState({
    //             likedActivities: items.activities
    //         })
    //     }
    // },

    handleTextFilter: function(){
        this.setState({
            keyWords: this.refs.filterText.value.split(/[ ,]+/).filter(Boolean)
        })
    },

    handlePriceMin: function(){
        this.setState({
            priceMin: this.refs.priceMin.value
        })
    },

    handlePriceMax: function(){
        var max = this.refs.priceMax.value;
        if(this.refs.priceMax.value === ""){
            max = Infinity;
        }
        this.setState({
            priceMax: max
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
        //this.refs.activityList.forceUpdate()
        this.forceUpdate()
    },

  render: function(){
    return (
      <div>
        <div className="container-flow" >
          <div className="panel panel-primary">
            <div className="panel-body blueBackground">
              <div className="row top-buffer">
                  <div className="col-md-1 col-md-offset-1">
                  <p className="text-center whiteText pagination-centered">Sort By:</p>
                  </div>
                  <div className="col-md-2 ">
                    <select className="form-control" ref="sort" id="drop" onChange={this.handleSort}>
                      <option value="popularity">Popularity</option>
                      <option value="price">Price</option>
                    </select>
              </div>
              <div className="col-md-4 col-md-offset-3">
                <div className="input-group pull-right">
                  <span className="input-group-addon" id="basic-addon1">Key words</span>
                  <input type="text" className="form-control" placeholder="e.g. outdoors, date, cheap, winter, etc."
                   aria-describedby="basic-addon1" ref="filterText" onChange={this.handleTextFilter}/>
               </div>
              </div>
              </div>
            <div className="row top-buffer">
              <div className="col-md-1 col-md-offset-1">
                <p className="text-center whiteText pagination-centered">Price:</p>
                </div>

                <div className="col-md-2">
                  <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Min $</span>
                    <input type="number" className="form-control" placeholder="0"
                     aria-describedby="basic-addon1" size="5" ref="priceMin" onChange={this.handlePriceMin}/>
                 </div>
                 </div>
                 <div className="col-md-2">
                   <div className="input-group">
                       <span className="input-group-addon" id="basic-addon1">Max $</span>
                       <input type="number" className="form-control" placeholder="10"
                        aria-describedby="basic-addon1" size="5" ref="priceMax" onChange={this.handlePriceMax}/>
                     </div>
                     </div>
                     <div className="col-md-1 col-md-offset-4">
                     <button className="btn btn-default pull-right" onClick={this.clear}>Reset</button>
                     </div>
</div></div>
      </div>
</div>
        <div className="container">
                <div className="row">
                    <div id="none" className="col-lg-12">
                        <h1>Welcome to Activity Finder</h1>
                        <p>Use the filters above to find the perfect activity! Or, browse some of our top rated activities:</p>
                        <br/><br/>
                    </div>
                </div>
          <ActivityList ref="activityList"
                data={this.state.activities}
                keyWords={this.state.keyWords}
                priceMin={this.state.priceMin}
                priceMax={this.state.priceMax}
                sort={this.state.sort}/>
        </div>
      </div>

      );
  }
})

module.exports = Home;
