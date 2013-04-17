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
                    paths: ['app/components/bootstrap/less/']
                },
                files: {
                    'app/components/bootstrap/bootstrap.css': 'app/components/bootstrap/less/bootstrap.less'
                }
            }
        },
        concat: {
            bootstrapCss: {
                src: ['app/components/bootstrap/bootstrap.css'],
                dest: 'app/styles/main.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['jshint', 'less', 'concat']);

    grunt.registerTask('default', ['build']);
};
