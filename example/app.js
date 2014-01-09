(function($myriad) {

    var callback = function callback(properties, args) {
        console.log(properties);
        console.log(args);
        console.log(this);
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

    myriad.getByNameAndLocationAndSexAndEmployed('ascending');

})(window.Myriad);