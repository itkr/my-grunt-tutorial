module.exports = function(grunt) {

    // config
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            //            options: {
            //              compress: true
            //            },
            build: {
                src: ['src/style1.less', 'src/style2.less'],
                dest: 'build/style.css'
                    // files: {
                    //   'build/styles.css': ['src/style1.less', 'src/style2.less']
                    //}
            },
        },
        csslint: {
            src: '<%= less.build.dest %>'
        },
        cssmin: {
            minimize: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'build/style.min.css': '<%= less.build.dest %>'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: 'src/*.less',
            tasks: ['less', 'csslint', 'cssmin']
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '127.0.0.1'
                }
            }
        }
    });

    // plugin
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // tasks
    grunt.registerTask('default', ['less', 'csslint', 'cssmin', 'connect', 'watch']);
};