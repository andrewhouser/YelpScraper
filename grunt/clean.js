module.exports = {
	options: {
		force: true
	},
	css: ['res/css/src/*.post.css', 'res/css/*.css', '!res/css/*.min.css'],
	knockout: ['res/js/*.js', '!res/js/*.min.js'],
	react: ['react/res/js/src/compiled/', 'react/res/js/*.js', '!react/res/js/*.min.js']
};