module.exports = function(grunt) {

	// Project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		nodemon: {
			dev: {
				script: 'app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');

	grunt.registerTask('default', ['nodemon']);

};