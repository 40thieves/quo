module.exports = function(grunt) {

	// Project config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		nodemon: {
			dev: {
				script: 'app.js'
			}
		},
		sass: {
			dist: {
				files: {
					'lib/public/css/style.css': 'lib/public/sass/style.scss'
				}
			}
		},
		shell: {
			mongo: {
				command: 'mongod',
				options: {
					async: true
				}
			}
		},
		watch: {
			scripts: {
				files: ['lib/public/sass/*.scss', 'lib/public/sass/bootstrap/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
					interrupt: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-shell-spawn');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	// grunt.registerTask('default', ['shell', 'nodemon']);
	grunt.registerTask('default', ['shell', 'concurrent']);

};