var Activity = require("./activity.js");
var api = require("./api.js");
var auth = require("./auth.js");

var ActivityList = React.createClass({

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
          <div>
            { 
              this.props.data.map(function(item, i) {
                var display = true;

                try{
                  if(parseFloat(item.price) >= this.props.priceMin && 
                    parseFloat(item.price) <= this.props.priceMax){
                      if(this.props.keyWords.length > 0){
                          display = false;
                          this.props.keyWords.forEach(function(tag){
                            if(item.title.toLowerCase().indexOf(tag.toLowerCase()) > -1){
                              display = true;
                              throw "Break";
                            }
                            item.tags.forEach(function(itemTag){
                              if(itemTag.toLowerCase().indexOf(tag.toLowerCase()) > -1){
                                display = true;
                                throw "Break";
                              }
                            });
                          });
                      }
                  }else{
                      display = false
                  }
                }catch (e){
                  if(e!=="Break")
                    throw e;
                }

                if(display){
                  return (
                    <Activity item={item} key={i}/>
                  );
                }
              }, this)
            }
            <br/>
            <p> Note: To see more activities either change the filters to expand your search, 
            or press "Clear Filters" to return to our top rated activities.</p>
          </div>
        );
    }
});

module.exports = ActivityList;