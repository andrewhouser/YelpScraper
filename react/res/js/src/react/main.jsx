var YelpApp = React.createClass({
	dateFormat: 'MMM D, YYYY',

	getInitialState: function () {
		return {
			filterEnd: null,
			filterStart: null,
			isFirstLoad: false,
			reviews: [],
			searching: false,
			searchURL: '',
			start: 0
		};
	},

	componentDidMount: function(){
		ReactDOM.findDOMNode( this.refs.searchBar.refs.labeledInput.refs.inputField ).focus();
	},

	formatDate: function ( sDate ) {
		var mDate = moment( sDate );
		return mDate.format( this.dateFormat );
	},

	getYelpReviews: function () {
		$.ajax({
			url: '../yelpscrape.php',
			method: 'GET',
			dataType: 'json',
			data: {
				yelpURL: this.state.searchURL,
				start: this.state.start
			},
			success: this.processReviews
		});
	},

	handleInputChanged: function ( e ) {
		this.setState( { searchURL: e.target.value } )
	},

	handleInputKey: function ( e ) {
		var key = e.nativeEvent.keyCode || e.nativeEvent.charCode;

		if ( key == 13 ) {
			this.searchYelp();
			return false;
		}

		return true;
	},

	processReviews: function ( data ) {
		var i = 0,
		    newStart = null,
		    starts = [],
		    bIsAtEnd = ( this.state.filterEnd == null || this.state.filterEnd == this.state.reviews.length - 1 );

		this.setState({
			isFirstLoad: false,
			reviews: this.state.reviews.concat( data.reviews )
		});

		// self.resetSliderSteps( bIsAtEnd );

		starts = data.starts;

		for ( i = 0; i < starts.length; i++ ) {
			if( starts[i] > this.state.start ) {
				newStart = starts[i];
				break;
			}
		}

		if ( newStart ) {
			this.setState( { start: newStart } );
			this.getYelpReviews();
		}
		else {
			console.log( this.state.reviews.length );
			this.setState( { searching: false } );
		}
	},

	render: function () {
		return (
			<div className="flex-container flex-columns" id="wrapper">
				<SearchBar
					ref="searchBar"
					onInputChanged={ this.handleInputChanged }
					onKeyDown={ this.handleInputKey }
					searchURL={ this.state.searchURL }
					sendSearch={ this.searchYelp } />
				<LoadSpinner loading={ this.state.isFirstLoad } />
				<SearchResults
					ref="searchResults"
					formatDate={ this.formatDate }
					reviews={ this.state.reviews } />
			</div>
		);
	},

	searchYelp: function () {
		this.setState({
			filterEnd: null,
			filterStart: null,
			isFirstLoad: true,
			reviews: [],
			searching: true,
			start: 0
		});

		this.getYelpReviews();
	}
});


ReactDOM.render( <YelpApp />, document.getElementById('yelpapp') );