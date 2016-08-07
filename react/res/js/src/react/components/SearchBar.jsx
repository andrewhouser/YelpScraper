var SearchBar = React.createClass({

	handleInputClick: function ( e ) {
		e.target.select();
	},

	render: function () {
		var classNames = ['searchbar', 'flex-container'],
		    disabled = ( this.props.searchURL == '' ) ? true : false;

		if ( this.props.minimized ) {
			classNames.push('searchbar-min');
		}
		
		return (
			<div className={ classNames.join(' ') }>
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