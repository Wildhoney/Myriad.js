(function($myriad) {

    var callback = function callback(properties) {
        console.log(properties);
    };

    var model = { name: null, age: null, location: null, sex: null };

    var myriad = new $myriad({
        model:  model,
        invoke: callback,
        prefix: 'getBy',
        levels: 3,
        blacklist: ['function']
    });

    myriad.getByNameAndLocationAndSex();

})(window.Myriad);