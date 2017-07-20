module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    distFolder: 'test/resources-dest',
    grunt_resources_html: {
      options: {
        verbose: true,
        sort: true
      },
      app: {
        src: ['test/index.html'],
        dest: '<%= distFolder %>/'
      }
    },
    watch: {
      files: '**/*.ts',
      tasks: ['exec']
    },
    exec: {
      compileTS: {
        command: 'tsc -p .'
      },
    },
    clean: {
      dist: ['<%= distFolder %>/']
    },
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'grunt_resources_html', 'nodeunit']);

  grunt.registerTask('default', ['test']);
};