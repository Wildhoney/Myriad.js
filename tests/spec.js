var should = require('should'),
    myriad = require('./../module/Myriad.js');

describe('Snapshot.js', function() {

    var $myriadDefault, $myriadCustom;

    beforeEach(function() {
        
        var object = {
            myriad: function(properties) {

            }
        };

        var model = { name: null, age: null, location: null };

        $myriadDefault = new Myriad({
            model:  model,
            invoke: object.myriad(),
            prefix: 'getBy',
            levels: 3
        });
        
    });

    describe('Basic', function() {

        it('Can setup basic functions', function() {
            expect(typeof $myriadDefault.getByNameAndId).toEqual('function');
        });

    });

});