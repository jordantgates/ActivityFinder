
var Comments = React.createClass({
	render: function() {
		if(this.props.activity.showComments){
			if(this.props.activity.comments.length > 0){
				return (
					<div><br/>{
						this.props.activity.comments.map(function(comment, i){
								return (
									<div className="rcorners-blue" key={i}>
										{comment.comment}
										<br/>
										<div>&nbsp;<div id="rightAlign">~{comment.user}</div></div>
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
