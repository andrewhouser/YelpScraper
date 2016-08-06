module.exports = {
	options: {
		plugins: ['transform-react-jsx'],
		presets: ['es2015', 'react']
	},
	jsx: {
		files: [{
			expand: true,
			cwd: 'react/res/js/src/react/', // Custom folder
			src: ['**/*.jsx'],
			dest: 'react/res/js/src/compiled/', // Custom folder
			ext: '.js'
		}]
	}
};