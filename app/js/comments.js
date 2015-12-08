
var Comments = React.createClass({
	render: function() {
		if(this.props.activity.showComments){
			if(this.props.activity.comments.length > 0){
				return (
					<div><br/>{
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
				);
			}else{
				return <div>No comments yet on this activity.</div>
			}
		}else{
			return <div></div>;
		}
	}
})

module.exports = Comments;
