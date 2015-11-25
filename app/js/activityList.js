
var ActivityList = React.createClass({
    handleClick: function(i){
      return console.log(i.comments);
    },

    render: function() {
        return (
          <div>
            { this.props.data.map(function(item, i) {
                    return (
                      <div className="rcorners" key={i}>
                        <div><pTitle>{item.title}</pTitle></div>
                        <div><pDesc>{item.description}</pDesc></div>
                        <div>Price: ${item.price}</div>
                        <div>Address: {item.address}</div>
                        <div>Up Votes: <pVotes>{item.upvotes}</pVotes></div>
                        <br/>
                        <button onClick={this.handleClick.bind(this, item)}id="rightAlign">Show Comments</button>
                        <br/>
                      </div>
                      );
                }, this)
            }
          </div>
        );
    }
});

module.exports = ActivityList;