module.exports = {
	options: {
		processors: [
			require('pixrem')(), // add fallbacks for rem units
			require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
			require('cssnano')() // minify the result
		]
	},
	dist: {
		src: 'res/css/src/*.css',
		dest: 'res/css/src/style.post.css'
	}
};