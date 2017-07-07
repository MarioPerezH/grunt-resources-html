'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.grunt_resources_html = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    main: function (test) {
        test.expect(2);

        var actual = fs.readdirSync('test/resources-origin');
        var expected = fs.readdirSync('test/resources-dest');

        test.equal(actual.length, 2, 'Two read resources');
        test.equal(expected.length, 2, 'Two written resources');

        test.done();
    },
};
