var Comments = require("./comments.js");

var ActivityList = React.createClass({

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
                    <div className="rcorners-green" key={i}>
                      <div><pTitle>{item.title}</pTitle></div>
                      <div><pDesc>{item.description}</pDesc></div>
                      <div>Price: ${item.price}</div>
                      <div>Address: {item.address}</div>
                      <div>Awesome Factor: <pVotes>{item.upvotes}</pVotes></div>
                      <br/>
                      <input type="text" className="form-control" placeholder="write a comment..." ref="comment" />
                      <br/>
                      <button onClick={this.handleVote}>Like</button>
                      <button onClick={this.handleComment}>Comment</button>
                      <button onClick={this.handleComments.bind(this, item)} id="rightAlign" >Show/Hide Comments</button>
                      <Comments activity={item}/>
                      <br/>
                    </div>
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