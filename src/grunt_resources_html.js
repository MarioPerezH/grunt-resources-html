"use strict";
/*
 * grunt-resources-html
 * https://github.com/MarioPerezH/grunt-resources-html
 *
 * Copyright (c) 2017 Mario Pérez
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var GruntResourceHtml = (function () {
    function GruntResourceHtml() {
    }
    GruntResourceHtml.proccess = function (grunt, task) {
        var _this = this;
        this.grunt = grunt;
        if (!task.files.length) {
            this.grunt.log.warn('There are no resources to process');
            return;
        }
        this.options = task.options({
            verbose: true,
            regexCss: '<link href="(.*|\n*)" rel(\s*|\n*)',
            regexScript: '<script src="(.*|\n*)">(\s*|\n*)<\/script>',
            modifer: 'ig'
        });
        // custom targets
        task.files.forEach(function (file) {
            // existing roads
            var paths = file.src.filter(function (path) { return _this.existsFile(path); });
            paths.forEach(function (path) {
                var filestring = grunt.file.read(path), srcScripts = _this.getSources(_this.options.regexScript, filestring, _this.options.modifer), srcCss = _this.getSources(_this.options.regexCss, filestring, _this.options.modifer), srcs = srcScripts.concat(srcCss);
                srcs.forEach(function (src) {
                    if (!_this.existsFile(src)) {
                        if (_this.options.verbose) {
                            _this.grunt.log.warn("Path not found: " + src);
                        }
                        return;
                    }
                    var name = _this.getNameFromPath(src);
                    _this.copySources(src, file.dest, name);
                    if (_this.options.verbose) {
                        _this.grunt.log.writeln(name + " writting");
                    }
                });
            });
        });
    };
    GruntResourceHtml.copySources = function (src, dest, nameFile) {
        this.grunt.file.copy(src, dest + "/" + nameFile);
    };
    GruntResourceHtml.getSources = function (regexExpress, fileString, modifiers) {
        var regex = new RegExp(regexExpress, modifiers), match, matchs = [];
        while ((match = regex.exec(fileString)) !== null) {
            matchs.push(match[1].split('/').filter(function (path) { return path !== '..'; }).join('/'));
        }
        ;
        return matchs;
    };
    GruntResourceHtml.existsFile = function (path) {
        return this.grunt.file.exists(path);
    };
    GruntResourceHtml.getNameFromPath = function (path) {
        return path.split('/').reverse()[0];
    };
    return GruntResourceHtml;
}());
exports.GruntResourceHtml = GruntResourceHtml;
