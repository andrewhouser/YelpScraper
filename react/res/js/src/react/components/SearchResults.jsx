var SearchResults = React.createClass({
	dateFormat: 'MMM D, YYYY',
	_filterEnd: null,
	_filterStart: null,
	reviews: [],

	componentDidUpdate: function () {
		this.reviews = this.props.reviews;
	},

	averageRating: function () {
		var aRatings = 0,
		    i = 0,
		    len = this.reviews.length;

		for ( i = 0; i < len; i++ ) {
			aRatings += parseInt( this.reviews[i].rating );
		}

		return (aRatings == 0) ? '' : (aRatings / len).toFixed(1);
	},

	filterEnd: function () {
		if ( this._filterEnd != null && this.reviews.length > 0 ) {
			return this.reviews[ this._filterEnd ].date;
		}
		return null;
	},

	filterStart: function () {
		if ( this._filterStart != null && this.reviews.length > 0 ) {
			return this.reviews[ this._filterStart ].date;
		}
		return null;
	},

	momentDate: function ( sDate ) {
		var mDate = moment( sDate );
		return mDate.format( this.dateFormat );
	},

	render: function () {
		var classNames = ['results-container'],
		    rows  = this.reviews.map( function ( val, i, arr ) {
		    	return (
		    		<tr>
						<td>{ ( i + 1 ) }.</td>
						<td>{ val.date }</td>
						<td>{ val.rating }</td>
						<td width="100%" dangerouslySetInnerHTML={ {__html: val.review} }></td>
					</tr>
		    	);
		    });

		if ( this.reviews.length > 0 ) {
			classNames.push( 'results-container-vis' );
		}

		return (
			<div className={ classNames.join(' ') }>
				<SearchRange
					averageRating={ this.averageRating() }
					endDate={ this.filterEnd() }
					startDate={ this.filterStart }
					steps={ this.reviews.length || 0 } />
				<table border="0" cellPadding="0" cellSpacing="0">
					<thead>
						<tr>
							<th></th>
							<th>Date</th>
							<th>Rating</th>
							<th>Review</th>
						</tr>
					</thead>
					<tbody>
						{ rows }
					</tbody>
				</table>
			</div>
		);

	}
});