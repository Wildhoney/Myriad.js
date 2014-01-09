(function($myriad) {

    var callback = function callback(properties, limit, order) {
        console.log('Properties: ' + properties.join(', '));
        console.log('Limit: ' + limit);
        console.log('Order: ' + order);
        console.log('Context: ' + this);
    };

    var model = { name: null, age: null, location: null, sex: null, employed: null };

    var myriad = new $myriad({
        model:  model,
        invoke: callback,
        scope: {},
        prefix: 'getBy',
        levels: 4,
        blacklist: ['function', 'number']
    });

    myriad.getByNameAndLocationAndSexAndEmployed(12, 'ascending');

})(window.Myriad);