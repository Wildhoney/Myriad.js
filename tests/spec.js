var should = require('should'),
    Myriad = require('./../module/Myriad.js');

describe('Snapshot.js', function() {

    var $model = { name: null, age: 14, location: null };

    describe('Default Params', function() {

        var $myriad;

        beforeEach(function() {
            $myriad = new Myriad($model, function() {}, {
                prefix: 'getBy'
            });
        });

        it('Can setup functions with default params', function() {
            $myriad.getByNameAndAge.should.be.an.instanceOf(Function);
            $myriad.getByAgeAndName.should.be.an.instanceOf(Function);
            $myriad.getByAgeAndNameAndLocation.should.be.an.instanceOf(Function);
        });

    });

    describe('Custom Depth', function() {

        var $myriad;

        beforeEach(function() {
            $myriad = new Myriad($model, function() {}, {
                prefix: 'getBy',
                depth: 2
            });
        });

        it('Can setup functions with custom depth', function() {
            $myriad.getByLocation.should.be.an.instanceOf(Function);
            $myriad.getByAgeAndLocation.should.be.an.instanceOf(Function);
            should.strictEqual(undefined, $myriad.getByAgeAndNameAndLocation);
        });

    });

    describe('Custom Prefix', function() {

        var $myriad;

        beforeEach(function() {
            $myriad = new Myriad($model, function() {}, {
                prefix: 'fetch'
            });
        });

        it('Can setup functions with custom prefix', function() {
            should.strictEqual(undefined, $myriad.getByAge);
            should.strictEqual(undefined, $myriad.getByAgeAndNameAndLocation);
            $myriad.fetchAge.should.be.an.instanceOf(Function);
            $myriad.fetchNameAndLocation.should.be.an.instanceOf(Function);
        });

    });

    describe('Custom Connector', function() {

        var $myriad;

        beforeEach(function() {
            $myriad = new Myriad($model, function() {}, {
                connector: 'Then'
            });
        });

        it('Can setup functions with custom connector', function() {
            should.strictEqual(undefined, $myriad.getByAgeAndName);
            should.strictEqual(undefined, $myriad.getByAgeAndNameAndLocation);
            $myriad.getByAgeThenNameThenLocation.should.be.an.instanceOf(Function);
            $myriad.getByNameThenLocation.should.be.an.instanceOf(Function);
        });

    });

    describe('Custom Blacklist', function() {

        var $myriad;

        beforeEach(function() {
            $myriad = new Myriad($model, function() {}, {
                blacklist: ['number']
            });
        });

        it('Can setup functions with custom blacklist', function() {
            should.strictEqual(undefined, $myriad.getByAge);
            should.strictEqual(undefined, $myriad.getByAgeAndLocationAndName);
            $myriad.getByNameAndLocation.should.be.an.instanceOf(Function);
            $myriad.getByLocationAndName.should.be.an.instanceOf(Function);
        });

    });

});