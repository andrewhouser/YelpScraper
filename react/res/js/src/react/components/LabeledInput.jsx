var LabeledInput = React.createClass({
	render: function () {
		return (
			<div className="r-labeled-input">
				<label htmlFor={ this.props.name }>{ this.props.label }</label>
				<input type="text"
					ref="inputField"
					autoComplete={ this.props.autocomplete }
					className={ this.props.cssNames }
					name={ this.props.name }
					id={ this.props.name }
					value={ this.props.value }
					placeholder={ this.props.placeholder }
					onChange={ this.props.onInputChanged }
					onKeyDown={ this.props.onKeyDown }
					onClick={ this.props.onClick } />
			</div>
		);
	}
});