var SearchResults = React.createClass({
	render: function () {
		var classNames = ['results-container'],
		    rows  = this.props.reviews.map( function ( val, i, arr ) {
		    	return (
		    		<tr>
						<td>{ ( i + 1 ) }.</td>
						<td>{ val.date }</td>
						<td>{ val.rating }</td>
						<td width="100%" dangerouslySetInnerHTML={ {__html: val.review} }></td>
					</tr>
		    	);
		    });

		if ( this.props.reviews.length > 0 ) {
			classNames.push( 'results-container-vis' );
		}

		return (
			<div className={ classNames.join(' ') }>

				// <div className="range-container flex-container">

				// 	<div className="loader mini-loader" data-bind="visible: isLoadingPages()">Loading</div>
				// 	<div className="range-date range-date-end" data-bind="text: endDate()"></div>
				// 	<div id="yelprng"></div>
				// 	<div className="range-date rage-date-start" data-bind="text: startDate()"></div>
				// 	<div className="average-rating flex-container"> 
				// 		<label className="inline">Average rating</label>
				// 		<div className="review-average" data-bind="text: avgReview"></div>
				// 	</div>
				// </div>

				<table border="0" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th></th>
							<th>Date</th>
							<th>Rating</th>
							<th>Review</th>
						</tr>
					</thead>
					<tbody data-bind="foreach: reviews">
						{ rows }
					</tbody>
				</table>
			</div>
		);

	}
});