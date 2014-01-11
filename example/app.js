(function($myriad) {

    var callback = _.bind(function callback(properties, limit, order) {
        console.log('Properties: ' + properties.join(', '));
        console.log('Limit: ' + limit);
        console.log('Order: ' + order);
        console.log('Context: ' + this);
    }, 'String as a scope!?');

    var model = { name: null, age: null, location: null, sex: null, employed: null };

    var myriad = new $myriad(model, callback, {
        prefix: 'getBy',
        connector: 'And',
        depth: 4,
        ignore: ['function', 'number']
    });

    myriad.getByNameAndLocationAndSexAndEmployed(12, 'ascending');

})(window.Myriad);