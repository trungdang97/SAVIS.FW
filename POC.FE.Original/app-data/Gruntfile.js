module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      my_target: {
      files: [{
          "dist/layout.min.js": ["views/cms/cms-layout/layout.js"]
      }]
    }
    },
    jshint: {
	    all: ['Gruntfile.js', 'views/cms/cmspage/interface-builder/page-content.js']
	  }
  });



  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.loadNpmTasks('grunt-contrib-jshint');


  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};