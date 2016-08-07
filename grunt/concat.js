module.exports = {
	options: {
		separator: ';',
	},
	css: {
		options: {
			separator: '',
		},
		src: ['res/js/src/lib/jquery-range/jquery-ui.min.css', 'res/css/src/loader.css', 'res/css/src/style.post.css'],
		dest: 'res/css/style.css'
	},
	knockout: {
		src: ['res/js/lib.js', 'res/js/src/lib/knockout-3.4.0.js', 'res/js/src/knockout/ViewModel.js', 'res/js/src/knockout/main.js'],
		dest: 'res/js/yelp.knockout.js'
	},
	library : {
		src: ['res/js/src/lib/jquery-1.12.1.min.js', 'res/js/src/lib/jquery-range/jquery-ui.min.js', 'res/js/src/lib/moment.min.js'],
		dest: 'res/js/lib.js'
	},
	react: {
		options: {
			separator: '',
		},
		src: ['res/js/lib.js', 'react/res/js/src/lib/react.min.js', 'react/res/js/src/lib/react-dom.min.js', 'react/res/js/src/compiled/components/*.js', 'react/res/js/src/compiled/main.js'],
		dest: 'react/res/js/yelp.react.js'
	}
};