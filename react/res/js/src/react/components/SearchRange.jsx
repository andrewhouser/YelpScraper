var SearchRange = React.createClass({

	render: function () {
		var loader = (<div className="loader mini-loader">Loading</div>);

		return (
			<div className="range-container flex-container">

				{ this.props.loading ? loader : null }
				<div className="range-date range-date-end">{ this.props.endDate }</div>
				<JQSlider steps={ this.props.steps } />
				<div className="range-date rage-date-start">{ this.props.startDate }</div>

				<div className="average-rating flex-container"> 
					<label className="inline">Average rating</label>
					<div className="review-average">{ this.props.averageRating }</div>
				</div>
			</div>
		);
	}
});