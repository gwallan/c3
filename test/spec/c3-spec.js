var expect = chai.expect, assert = chai.assert;

mocha.setup({
    "ui": "bdd",
    "timeout": 10000
});

describe('c3', function () {
    'use strict';

    var c3 = window.c3;

    it('exists', function () {
        expect(c3).to.be.a('object');
    });
});

mocha.run();