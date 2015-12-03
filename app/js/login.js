var Login = React.createClass({
	getInitialState: function(){
		return {
			keyWords: [],
			priceMin: 0, 
			priceMax: Infinity,
			sort: "popularity"
		};
	},

	handleTextFilter: function(){
		this.setState({
			keyWords: this.refs.filterText.value.split(', ')
		})
	},

	handlePriceMin: function(){
		this.setState({
			priceMin: this.refs.priceMin.value
		})
	},

	handlePriceMax: function(){
		this.setState({
			priceMax: this.refs.priceMax.value
		})
	},

	handleSort: function(){
		this.setState({
			sort: this.refs.sort.value
		})
	},

	clear: function(){
		this.setState({
			keyWords: [],
			priceMin: 0, 
			priceMax: Infinity,
			sort: "popularity"
		})
		this.refs.filterText.value = ""
		this.refs.priceMin.value = ""
		this.refs.priceMax.value = ""
		this.refs.sort.value = "popularity"
	},

	render: function(){
		return (
			<div id="wrapper">
			<div className="container-fluid">
			<div className="row">
			<div id="none" className="col-lg-12">
			<h1>Hey Dummy, this is a login page</h1>
			<p>Enter your info below</p>
			<br/><br/>
			</div>
			</div>
			</div>
            {/*}
            <ActivityList 
                data={DATA} 
                keyWords={this.state.keyWords} 
                priceMin={this.state.priceMin} 
                priceMax={this.state.priceMax}
                sort={this.state.sort}/>
            */}

            </div>

            );
	}
})

module.exports = Login;