
var Home = React.createClass({

  getInitialState: function(){
    return {text: ''};
  },

  goToNextPage: function (){
    name = this.state.text;
  },

  onChange: function(e){
    this.setState({text: e.target.value});
    console.log(this.state.text);
    name = this.state.text;
  },
  
  render: function() {
    return (
      <div>
      	<h1> Welcome to Activity Finder! </h1>
	      <form className="navbar-form navbar-left" role="search">
	        <div className="form-group">
	          <input type="text" className="form-control" placeholder="Search for an activity"/>
	        </div>
	        <button type="submit" className="btn btn-default">Submit</button>
	      </form>
      </div>
    );
  }
})