module.exports = function (grunt) {

	grunt.initConfig({
		requirejs: {
			"pro-js": {
				options: {
					baseUrl: "app/js/",
					mainConfigFile: "app/js/main.js",
					out: "build/pro/js/main.js",
					optimize: 'uglify2',
					preserveLicenseComments: false,
					generateSourceMaps: true,
					name: "main"
				}
			},
			"pro-css":{
				options: {
					optimizeCss: 'standard',
					cssIn: 'app/style/main.css',
					out: 'build/pro/style/main.css'
				}
			}
		},
		copy: {
			"pro": {
				files: [
					{expand: true, src: ['{fonts,img,samples,sounds,video,views}/**'], cwd: 'app/', dest: 'build/pro/'},
					{expand: true, src: ['*.html'], cwd: 'app/', dest: 'build/pro/'},
					{src: ['app/js/components/requirejs/require.js'], dest: 'build/pro/js/require.js'}
				]
			}
		},
		version: {
			html: {
				options: {
					prefix: 'bust='
				},
				src: ['env/html/**/*.html','env/html/**/*.vtl']
			},
			project: {
				src: ['bower.json']
			}
		},
		exec: {
			commit: 'git commit -am "Commit Prelease"',
			push: 'git push',
			npmversionpatch: 'npm version patch',
			npmversionminor: 'npm version minor',
			npmversionmajor: 'npm version major'
		},
		clean: {
			build: ["build"]
		}
	});



	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-version');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exec');



	//grunt.registerTask('patch', ['version:html:patch','version:project:patch', 'exec:commit', 'exec:npmversionpatch', 'exec:push']);
	//grunt.registerTask('minor', ['version:html:minor','version:project:minor', 'exec:commit', 'exec:npmversionminor', 'exec:push']);
	//grunt.registerTask('major', ['version:html:major','version:project:major', 'exec:commit', 'exec:npmversionmajor', 'exec:push']);

	grunt.registerTask('build-pro', ['clean:build','copy:pro','requirejs:pro-js','requirejs:pro-css']);
};
