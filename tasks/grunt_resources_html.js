/*
 * grunt-resources-html
 * https://github.com/MarioPerezH/grunt-resources-html
 *
 * Copyright (c) 2017 Mario Pérez
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

  grunt.registerMultiTask('grunt_resources_html', 'Extract the resources from a html file (script-css) and deposit to a destination folder', function () {
      var task = require('../src/grunt_resources_html.js').GruntResourceHtml

      task.proccess(grunt, this);  
  });
}
