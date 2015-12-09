var api = require("./api.js");

var Comments = React.createClass({

	handleComment: function(){
		if(this.refs.comment.value !== ""){
			this.props.activity.comments.unshift({"user":"jared", "comment":this.refs.comment.value});
			api.updateActivity(this.props.activity, function(){
				this.forceUpdate();
			}.bind(this));
			this.refs.comment.value = "";
		}
	},

	render: function() {
		if(this.props.activity.showComments){
			if(this.props.activity.comments.length > 0){
				return (
					<div>
					<br/>
					<form onSubmit={this.handleComment}>
					<div className="input-group">
						<input aria-describedby="basic-addon2" type="text" className="form-control" placeholder="write a comment..." ref="comment"/>
						<span className="input-group-btn" id="basic-addon2">
							<button className="btn btn-primary" type="submit">Submit Comment</button>
						</span>
					</div>
					</form>
					<br/>
					<div  className="scroll"><br/>{
						this.props.activity.comments.map(function(comment, i){
								return (
									<div className="panel panel-success" key={i}>
										<div className="panel-heading">
											<h1 className="panel-title">{comment.user} </h1>
										</div>
										<div className="panel-body">
										{comment.comment}
										</div>
									</div>
								);
						})
					}</div>
					</div>
				);
			}else{
				return <div>
					<div>
					<br/>
					<form onSubmit={this.handleComment}>
					<div className="input-group">
						<input aria-describedby="basic-addon2" type="text" className="form-control" placeholder="write a comment..." ref="comment"/>
						<span className="input-group-btn" id="basic-addon2">
							<button className="btn btn-primary" type="submit">Submit Comment</button>
						</span>
					</div>
					</form>
					<br/>
					No comments yet on this activity.
					</div></div>
			}
		}else{
			return <div></div>;
		}
	}
})

module.exports = Comments;
