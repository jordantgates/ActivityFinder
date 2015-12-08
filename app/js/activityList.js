var Activity = require("./activity.js");
var api = require("./api.js");

var ActivityList = React.createClass({

    // handleComments: function(i){
    //   i.showComments = !i.showComments;
    //   this.forceUpdate();
    // },

    // handleComment: function(i, item){
    //   //alert(this.refs.{i}.value);
    //   //api.addComment(i);
    //   //this.forceUpdate();
    // },

    // handleLike: function(i){
    //   api.addLike(i);
    //   this.forceUpdate();
    // },

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
                  empty = false
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