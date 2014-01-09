var should = require('should'),
    _      = require('underscore'),
    Myriad = require('./../module/Myriad.js');

describe('Snapshot.js', function() {

    describe('Default Params', function() {

        var $myriad;

        beforeEach(function() {
            $myriad     = new Myriad({
                model:  { name: null, age: null, location: null },
                invoke: function() {},
                prefix: 'getBy'
            });
        });

        it('Can setup basic functions with default params', function() {
            $myriad.getByNameAndAge.should.be.an.instanceOf(Function);
            $myriad.getByAgeAndName.should.be.an.instanceOf(Function);
            $myriad.getByAgeAndNameAndLocation.should.be.an.instanceOf(Function);
        });

    });

    describe('Custom Level', function() {

        var $myriad;

        beforeEach(function() {
            $myriad     = new Myriad({
                model:  { name: null, age: null, location: null },
                invoke: function() {},
                prefix: 'getBy',
                levels: 2
            });
        });

        it('Can setup basic functions with default params', function() {
            $myriad.getByLocation.should.be.an.instanceOf(Function);
            $myriad.getByAgeAndLocation.should.be.an.instanceOf(Function);
            should.strictEqual(undefined, $myriad.getByAgeAndNameAndLocation);
        });

    });

    describe('Custom Prefix', function() {

        var $myriad;

        beforeEach(function() {
            $myriad     = new Myriad({
                model:  { name: null, age: null, location: null },
                invoke: function() {},
                prefix: 'fetch'
            });
        });

        it('Can setup basic functions with default params', function() {
            should.strictEqual(undefined, $myriad.getByAge);
            should.strictEqual(undefined, $myriad.getByAgeAndNameAndLocation);
            $myriad.fetchAge.should.be.an.instanceOf(Function);
            $myriad.fetchNameAndLocation.should.be.an.instanceOf(Function);
        });

    });

    describe('Custom Blacklist', function() {

        var $myriad;

        beforeEach(function() {
            $myriad     = new Myriad({
                model:  { name: null, age: 12, location: null },
                invoke: function() {},
                blacklist: ['number']
            });
        });

        it('Can setup basic functions with default params', function() {
            should.strictEqual(undefined, $myriad.getByAge);
            should.strictEqual(undefined, $myriad.getByAgeAndLocationAndName);
            $myriad.getByNameAndLocation.should.be.an.instanceOf(Function);
            $myriad.getByLocationAndName.should.be.an.instanceOf(Function);
        });

    });

});