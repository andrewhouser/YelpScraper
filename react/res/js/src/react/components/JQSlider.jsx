var JQSlider = React.createClass({
	start: 0,
	end: 0,

	render: function () {
		return ( <div /> );
	},

	componentDidMount: function () {
		var node = ReactDOM.findDOMNode( this );

		var slider = $( node ).slider({
										range: true,
										min: 0,
										max: this.props.steps,
										steps: this.props.steps,
										values: [ 0, this.props.steps ],
										slide: function( event, ui ) {
											//vm.filterReviews( ui.values[0], ui.values[1] );
										}
									});

    	ReactDOM.render( (<div id="yelprng" steps={ this.props.steps }></div>), node );
	},

	componentDidUpdate: function () {
		this.start = this.props.steps;

		$('#yelprng').slider('option', {
			max: this.props.steps,
			steps: this.props.steps,
			values: [this.end, this.prop.steps - start]
		})
	}
});