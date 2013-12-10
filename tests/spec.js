var should = require('should'),
    yen    = require('./../module/Yen.js');

describe('Snapshot.js', function() {

    var $yenDefault, $yenCustom;

    beforeEach(function() {
        
        var object = {
            yen: function(properties, order) {
                
            }
        };

        $yenDefault = yen.proxy(object).using(model);
        $yenCustom  = yen.proxy(object).using(model);
        
    });

    describe('Basic', function() {


    });

});