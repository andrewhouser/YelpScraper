module.exports = function(grunt) {
	// Load all the required grunt task plugins
	var options = { config: { src: "grunt/*.js" } };
	var configs = require('load-grunt-configs')(grunt, options);

	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig(configs);

	/**
	SPECIFY TASKS TO RUN
	*/
	grunt.registerTask( 'knockout', [
			'css',
			'concat:library',
			'concat:knockout',
			'uglify:knockout',
			'clean:knockout'
	]);

	grunt.registerTask( 'css', ['postcss', 'concat:css', 'cssmin', 'clean:css'] );

	grunt.registerTask( 'react', [
			'css',
			'concat:library',
			'babel',
			'concat:react',
			'uglify:react',
			'clean:react'
	]);

	// Default task(s).
	grunt.registerTask('default', ['watch']);

};