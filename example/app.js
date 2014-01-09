(function($myriad) {

    var callback = function callback(properties, args) {
        console.log(properties);
        console.log(args);
    };

    var model = { name: null, age: null, location: null, sex: null, employed: null };

    var myriad = new $myriad({
        model:  model,
        invoke: callback,
        prefix: 'getBy',
        levels: 4,
        blacklist: ['function']
    });

    myriad.getByNameAndLocationAndSexAndEmployed('ascending');

})(window.Myriad);