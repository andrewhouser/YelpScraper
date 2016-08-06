module.exports = {
	css: {
		files: ['res/css/src/*.css'],
		tasks: ['cssmin']
	},
	knockout: {
		files: ['res/js/src/knockout/*.js'],
		tasks: ['knockout']
	},
	react: {
		files: ['react/res/js/src/react/**/*.jsx'],
		tasks: ['react']
	}
};