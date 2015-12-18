"use strict";

module.exports = function(grunt) {

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
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
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

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'watch']);


    // A very basic default task.
    //grunt.registerTask('default', 'Log some stuff.', function() {
    //    grunt.log.write('Logging some stuff...').ok();
    //});
};