var Comments = require("./comments.js");
var api = require("./api.js");

var Activity = React.createClass({
	getInitialState: function(){
		if(!!localStorage.token){
			api.getLikesForUser(this.setLikedActivities)
		}
		return {
			comment: "",
			isLiked: false,
		}
	},

	setLikedActivities: function(status, likes){
        if(status){
	      var liked = false
          if(likes.activities.indexOf(this.props.item.title) > -1){
            liked = true
          }
          this.setState({
            isLiked: liked
          })
        }
    },

	handleLike: function(){
		if(!!localStorage.token){
			if(this.state.isLiked){
				api.removeLike(this.props.item.title, function(success){
					if(success){
						api.updateActivity(this.props.item, function(good){
							if(good){
								this.props.item.upvotes--;
								this.setState({
									isLiked: false
								})
							}
						}.bind(this))
					}
				}.bind(this))
			}else{
				api.addLike(this.props.item.title, function(success){
					if(success){
						api.updateActivity(this.props.item, function(good){
							if(good){
								this.props.item.upvotes++;
								this.setState({
									isLiked: true
								})
							}
						}.bind(this))
					}
				}.bind(this))
			}
			
		}else{
			alert("Please login or register to like activities");
		}
	},

	handleComments: function(){
      this.props.item.showComments = !this.props.item.showComments;
      this.forceUpdate();
	},

	render: function(){
		if(this.state.isLiked){
			var heart = <span 
							onClick={this.handleLike} 
							className="glyphicon glyphicon-heart redHeart" 
							id="rightAlign" 
							aria-hidden="true">
						</span>
			var likeBtn = <button className="btn btn-primary" onClick={this.handleLike}>Unlike</button>

		}else{
			var heart = <span 
							onClick={this.handleLike} 
							className="glyphicon glyphicon-heart heart" 
							id="rightAlign" 
							aria-hidden="true">
						</span>
			var likeBtn = <button className="btn btn-primary" onClick={this.handleLike}>Like</button>

		}

		return (
	        <div className="panel panel-primary" key={this.props.key}>
	        	<div className="panel-heading">
	        		<h1 className="panel-title">
	        			{this.props.item.title}
	        			{heart}
	        		</h1>
	        	</div>
	        	<div className="panel-body">
					<div><pDesc>{this.props.item.description}</pDesc></div>
					<div>Price: ${this.props.item.price}</div>
					<div>Address: {this.props.item.address}</div>
					<div>Awesome Factor: <pVotes>{this.props.item.upvotes}</pVotes></div>
					<div className="">Tags: &nbsp;
					{
						this.props.item.tags.map(function(tag, i) {
							return (
								<span key={i}><span className="label label-info">{tag}</span> </span>
							);
						})
					}
					</div>
					<br/>
					{likeBtn}
					<button className="btn btn-primary"onClick={this.handleComments} id="rightAlign" >Show/Hide Comments</button>
					<Comments activity={this.props.item}/>
					<br/>
				</div>
	        </div>
		)
	}
});

module.exports = Activity;
