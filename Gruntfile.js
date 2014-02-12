module.exports = function(grunt) {

	// Project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		nodemon: {
			dev: {
				script: 'app.js'
			}
		},

		shell: {
			mongo: {
				command: 'mongod',
				options: {
					async: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-shell-spawn');

	grunt.registerTask('default', ['shell', 'nodemon']);

};