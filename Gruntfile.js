module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'app/scripts/{,*/}*.js']
    },
    less: {
      bootstrap: {
        options: {
          paths: ['app/components/bootstrap/less/', 'app/styles/bootstrap/']
        },
        files: {
          'app/styles/bootstrap/bootstrap.css': 'app/styles/bootstrap/bootstrap.less'
        }
      }
    },
    concat: {
      bootstrapCss: {
        src: ['app/styles/bootstrap/bootstrap.css', 'app/components/angular-ui/build/angular-ui.min.css', 'app/components/font-awesome/css/font-awesome.min.css', 'app/styles/hours.css'],
        dest: 'app/styles/main.css'
      }
    },
    copy: {
      jqueryUiCss: {
        files: [{
          src: ['**'],
          expand: true,
          dest: 'app/styles/jqueryui/',
          cwd: 'app/components/jquery-ui/themes/smoothness/'
        }]
      },
      js: {
        files: [{
          src: ['app/components/jquery/jquery.min.js', 'app/components/jquery-ui/ui/minified/jquery-ui.custom.min.js', 'app/components/bootstrap-growl/jquery.bootstrap-growl.min.js', 'app/components/angular/angular.js', 'app/components/angular-ui/build/angular-ui.min.js', 'app/components/angular-cookies/angular-cookies.js', 'app/components/angular-resource/angular-resource.js', 'app/components/angular-sanitize/angular-sanitize.js', 'app/components/bootstrap/docs/assets/js/bootstrap.min.js', 'app/components/angular-strap/dist/angular-strap.min.js', 'app/components/socket.io-client/dist/socket.io.min.js'],
          dest: 'app/lib/',
          filter: 'isFile',
          expand: true,
          flatten: true
        }]
      },
      fonts: {
        files: [{
          src: ['app/components/font-awesome/font/*'],
          dest: 'app/font/',
          filter: 'isFile',
          expand: true,
          flatten: true
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['jshint', 'less', 'concat', 'copy']);

  grunt.registerTask('default', ['build']);
};
