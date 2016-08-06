var SearchBar = React.createClass({

	handleInputClick: function ( e ) {
		e.target.select();
	},

	render: function () {
		// if is loading for the first time
		// add classname 'searchbar-min'

		var disabled = ( this.props.searchURL == '' ) ? true : false; 
		
		return (
			<div className="searchbar flex-container">
				<LabeledInput
					ref="labeledInput"
					name="yelpUrl"
					label="Enter a Yelp review page URL"
					placeholder="Yelp page URL"
					autocomplete="off"
					onInputChanged={ this.props.onInputChanged }
					onKeyDown={ this.props.onKeyDown }
					value={ this.props.searchURL }
					onClick={ this.handleInputClick } />
				<input
					type="submit"
					value="Go!"
					disabled={ disabled }
					onClick={ this.props.sendSearch } />
			</div>
		);
	}
});