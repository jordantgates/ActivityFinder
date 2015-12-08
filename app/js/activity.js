var Comments = require("./comments.js");
var api = require("./api.js");

var Activity = React.createClass({
	getInitialState: function(){
		return {
			comment: ""
		}
	},

	handleComment: function(){
		//alert(this.refs.comment.value);
		this.props.item.comments.push({"user":"jared", "comment":this.refs.comment.value});
		api.updateActivity(this.props.item, function(){
			console.log("the callback is back.");
		});
		//this.refs.comment.value = "";
	},

	handleLike: function(){

	},

	handleComments: function(){
      this.props.item.showComments = !this.props.item.showComments;
      this.forceUpdate();
	},

	render: function(){
		return (
	        <div className="rcorners-green" key={this.props.key}>
	          <div><pTitle>{this.props.item.title}</pTitle></div>
	          <div><pDesc>{this.props.item.description}</pDesc></div>
	          <div>Price: ${this.props.item.price}</div>
	          <div>Address: {this.props.item.address}</div>
	          <div>Awesome Factor: <pVotes>{this.props.item.upvotes}</pVotes></div>
	          <br/>
	          <form onSubmit={this.handleComment}>
	          <input type="text" className="form-control" placeholder="write a comment..." ref="comment"/>
	          <input type="submit" value="Submit"/>
	          </form>
	          <br/>
	          <button onClick={this.handleLike}>Like</button>
	          <button onClick={this.handleComments} id="rightAlign" >Show/Hide Comments</button>
	          <Comments activity={this.props.item}/>
	          <br/>
	        </div>
		)
	}
});

module.exports = Activity;