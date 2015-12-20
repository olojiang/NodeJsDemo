"use strict";

module.exports = function(grunt) {

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    // Replace all thing like: grunt.loadNpmTasks('grunt-contrib-uglify');
    //require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true,
                sourceMapName: 'target/<%= pkg.name %>.min.js.map'
            },
            build: {
                src: '<%=concat.dist.dest%>',
                dest: 'target/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\r\n//-------\r\n'
            },
            dist: {
                // the files to concatenate
                src: ['js/*.js'],
                // the location of the resulting JS file
                dest: 'target/<%= pkg.name %>.js'
            }
        },
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'js/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    require: true,
                    exports: true,
                    process: true,
                    __dirname: true
                },
                // "use strict"; in global way
                globalstrict: true
            }
        },
        watch: {
            jshint: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            less: {
                files: ['less/test.less'],
                tasks: ['less']
            }
        },
        cssmin: {
            compress: {
                files: [
                    {
                        src: ['css/*.css'],
                        dest: 'target/<%= pkg.name %>.css'
                    }
                ]
            }
        },
        less: {
            dist: {
                files: {
                    'target/testLess.css': 'less/test.less'
                }
            }
        },
        copy: {
            json:{
                files: [
                    // includes files within path
                    {expand: true, src: ['json/*'], dest: 'target/', flatten: true, filter: ''}
                ]
            }
        },
        clean: ['target/json', 'target/*.css', 'target/*.map'],
        autoprefixer: {
            options: {
                // browsers: ['last 2 versions', 'ie 8', 'ie 9']
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    src: 'target/*.css',
                    dest: ''
                }]
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: 'target/img'
                }]
            }
        },
        concurrent: {
            css: ['less', 'cssmin'],
            js: ['concat', 'uglify']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin that provides the "copy" task.
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Load the plugin that provides the "clean" task.
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load the plugin that provides the "autoprefixer" task.
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Load the plugin that provides the "imagemin" task.
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Load the plugin that provides the "concurrent" task.
    grunt.loadNpmTasks('grunt-concurrent');

    // Load the plugin that provides the "newer" task.
    grunt.loadNpmTasks('grunt-newer');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']);

    // Call concat to do incremental
    grunt.registerTask('jshintn', ['newer:jshint']);

    // A very basic default task.
    //grunt.registerTask('default', 'Log some stuff.', function() {
    //    grunt.log.write('Logging some stuff...').ok();
    //});
};