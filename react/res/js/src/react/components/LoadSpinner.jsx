var LoadSpinner = React.createClass({
	render: function () {
		var classNames = ['first-loader'];

		if ( this.props.loading == true ) {
			classNames.push('first-loader-vis');
		}

		return (
			<div className={ classNames.join(' ') }>
				<div className="loader">Loading</div>
			</div>
		);
	}
});