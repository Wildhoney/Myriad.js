(function($module, $window) {

    /**
     * @module Myriad
     * @constructor
     */
    var Myriad = function Myriad(options) {

        if (typeof options.model === 'undefined' || typeof options.model !== 'object') {
            throw 'Option `model` should be an instance of Object.';
        }

        if (typeof options.invoke === 'undefined' || typeof options.invoke !== 'function') {
            throw 'Option `invoke` should be an instance of Function.';
        }

        // Memorise the options that were passed in!
        this._options = options;

        var properties = [];

        for (var key in options.model) {

            if (!options.model.hasOwnProperty(key)) {
                continue;
            }

            if (typeof options.model[key] === 'function') {
                continue;
            }

            this._properties.push(key);

        }

        // Initialise the setting up of all the functions.
        this._setup(this._properties);
        return this._methods;

    };

    /**
     * @property prototype
     * @type {Object}
     */
    Myriad.prototype = {

        /**
         * @property _methods
         * @type {Object}
         * @private
         */
        _methods: [],

        /**
         * @property _properties
         * @type {Object}
         * @private
         */
        _properties: [],

        /**
         * @property _options
         * @type {Object}
         * @private
         */
        _options: {},

        /**
         * @method _setup
         * @param properties {Object}
         * @return {void}
         * @private
         */
        _setup: function _setup(properties) {

            for (var index = 0, numProperties = properties.length; index < numProperties; index++) {
                this._addIteration([properties[index]], 1);
            }

        },

        /**
         * @method _addIteration
         * @param properties {Array}
         * @return {void}
         * @private
         */
        _addIteration: function _addIteration(properties) {

            // Calculate the difference between the current iteration of properties, and the
            // globally stored properties to determine if there are more methods to create.
            var difference = _.difference(this._properties, properties);

            if (difference.length) {

                _.forEach(difference, _.bind(function difference(property) {

                    var _properties = _.clone(properties);

                    if (properties.length === 1) {

                        // Create the first method for the single property if it hasn't yet
                        // been define, before we start building the additional methods.
                        this._createMethod(_.clone(_properties));

                    }

                    // Push the current property into the array.
                    _properties.push(property);

                    // Define the method.
                    this._createMethod(_properties);

                    // Add another iteration if there is still a difference between the `_properties` and
                    // current set of properties.
                    this._addIteration(_properties);

                }, this));

            }

        },

        /**
         * @method createMethod
         * @param properties {Array}
         * @return {void}
         */
        _createMethod: function createMethod(properties) {

            var _components = [];

            _.forEach(properties, function(property) {
                // Capitalise each word in the property list.
                _components.push(property.charAt(0).toUpperCase() + property.slice(1));
            });

            // Compose the method name from the components.
            var _methodName = this._options.prefix + _components.join('And');

            // ...And finally add the method!
            this._methods[_methodName] = _.bind(function(args) {
                this._options.invoke.apply(null, [].concat([properties], args));
            }, this);

        }

    };

    if ($window) {
        // Attach it to the DOM window object.
        $window.Myriad = Myriad;
    }

    if (!$window) {
        // Attach it to the CommonJS object.
        $module.exports = Myriad;
    }

})(typeof module !== 'undefined' ? module : {}, typeof window !== 'undefined' ? window : {});