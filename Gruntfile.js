module.exports = function(grunt) {

  grunt.initConfig({
    'jasmine-node': {
      run: {
          spec: 'spec'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'server/**/*.js', 'client/**/*.js', '!client/js/lib/**/*.js']
    },
    less: {
      bootstrap: {
        options: {
          paths: ['components/bootstrap/less/', 'client/css/bootstrap/']
        },
        files: {
          'client/css/bootstrap/bootstrap.css': 'client/css/bootstrap/bootstrap.less'
        }
      }
    },
    concat: {
      bootstrapCss: {
        src: ['client/css/bootstrap/bootstrap.css', 'components/angular-ui/build/angular-ui.min.css', 'components/font-awesome/css/font-awesome.min.css', 'client/css/hours.css'],
        dest: 'client/css/main.css'
      }
    },
    copy: {
      jqueryUiCss: {
        files: [{
          src: ['**'],
          expand: true,
          dest: 'client/css/jqueryui/',
          cwd: 'components/jquery-ui/themes/smoothness/'
        }]
      },
      js: {
        files: [{
          src: ['components/jquery/jquery.min.js', 'components/jquery-ui/ui/minified/jquery-ui.custom.min.js', 'components/bootstrap-growl/jquery.bootstrap-growl.min.js', 'components/angular/angular.js', 'components/angular-ui/build/angular-ui.min.js', 'components/angular-cookies/angular-cookies.js', 'components/angular-resource/angular-resource.js', 'components/angular-sanitize/angular-sanitize.js', 'components/bootstrap/docs/assets/js/bootstrap.min.js', 'components/angular-strap/dist/angular-strap.min.js', 'components/lodash/dist/lodash.min.js', 'components/socket.io-client/dist/socket.io.min.js', 'components/moment/min/moment.min.js', 'components/restangular/dist/restangular.min.js'],
          dest: 'client/js/lib/',
          filter: 'isFile',
          expand: true,
          flatten: true
        }]
      },
      fonts: {
        files: [{
          src: ['components/font-awesome/font/*'],
          dest: 'client/font/',
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
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');

  grunt.registerTask('test', ['jasmine-node']);
  grunt.registerTask('build', ['jshint', 'test', 'less', 'concat', 'copy']);

  grunt.registerTask('default', ['build']);
};
