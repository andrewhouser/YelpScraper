module.exports = {
	options: {
		compress: true,
		sourceMap: true,
		sourceMapName: 'res/js/yelp.knockout.min.map'
	},
	knockout: {
		options: {
			sourceMap: true,
			sourceMapName: 'res/js/yelp.knockout.min.map'
		},
		files: [{
			src: ['res/js/yelp.knockout.js'],
			dest: 'res/js/yelp.knockout.min.js'
		}]
	},
	react: {
		options: {
			sourceMap: true,
			sourceMapName: 'res/js/yelp.knockout.min.map'
		},
		files: [{
			src: ['react/res/js/yelp.react.js'],
			dest: 'react/res/js/yelp.react.min.js'
		}]
	}
};