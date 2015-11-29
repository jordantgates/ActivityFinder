
var ActivityList = React.createClass({
    handleClick: function(i){
      return console.log(i.comments);
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
            { this.props.data.map(function(item, i) {
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
                  <div className="rcorners" key={i}>
                    <div><pTitle>{item.title}</pTitle></div>
                    <div><pDesc>{item.description}</pDesc></div>
                    <div>Price: ${item.price}</div>
                    <div>Address: {item.address}</div>
                    <div>Awesome Factor: <pVotes>{item.upvotes}</pVotes></div>
                    <br/>
                    <button onClick={this.handleClick.bind(this, item)}id="rightAlign">Show Comments</button>
                    <br/>
                  </div>
                );
              }
            }, this)
            }
          </div>
        );
    }
});

module.exports = ActivityList;