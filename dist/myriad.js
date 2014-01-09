(function($module, $window) {

    "use strict";

    /**
     * @property _
     * Underscore.js!
     */
    var _ = ($window) ? $window._ : undefined;

    if ($module) {

        try {

            // Define Underscore if we're using Node.js!
            _ = require('underscore');

        } catch (e) {

            // Output a more graceful error if it cannot be loaded.
            console.error('Myriad.js requires Underscore.js: http://underscorejs.org/');

        }

    }

    /**
     * @module Myriad
     * @constructor
     */
    var Myriad = function Myriad(options) {

        if (typeof _ === 'undefined') {
            throw 'Myriad.js requires Underscore.js: http://underscorejs.org/';
        }

        if (typeof options.model === 'undefined' || typeof options.model !== 'object') {
            throw 'Option `model` should be an instance of Object.';
        }

        if (typeof options.invoke === 'undefined' || typeof options.invoke !== 'function') {
            throw 'Option `invoke` should be an instance of Function.';
        }

        // Clear arrays and objects.
        this._methods    = [];
        this._properties = [];

        // Memorise the options that were passed in!
        this._options = options;

        // Iterate over each key in the model to determine if it should be considered as a method
        // name.
        for (var key in options.model) {

            // Usual suspect!
            if (options.model.hasOwnProperty(key)) {

                // Determine if the key matches one of the types in the blacklist array.
                if (_.contains(this._options.blacklist || [], typeof options.model[key])) {
                    continue;
                }

                // Otherwise it's a valid key and should be considered for a method name.
                this._properties.push(key);

            }

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
         * @property _defaultDepth
         * @type {Number}
         * @private
         */
        _defaultDepth: 3,

        /**
         * @property _defaultConnector
         * @type {String}
         * @private
         */
        _defaultConnector: 'And',

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
            var remainingProperties = _.difference(this._properties, properties);

            if (remainingProperties.length) {

                _.forEach(remainingProperties, _.bind(function beginIteration(property) {

                    var _properties = _.clone(properties);

                    if (properties.length === 1) {

                        // Create the first method for the single property if it hasn't yet
                        // been defined before we start building the additional methods.
                        this._createMethod(_.clone(_properties));

                    }

                    // Push the current property into the array.
                    _properties.push(property);

                    // Define the method.
                    this._createMethod(_properties);

                    // Add another iteration if there is still a difference between the `_properties` and
                    // current set of properties. Also check if we haven't exceeded our desired depth yet.
                    if (_properties.length < (this._options.depth || this._defaultDepth)) {
                        this._addIteration(_properties);
                    }

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
            var _connector  = this._options.connector || this._defaultConnector,
                _methodName = (this._options.prefix || 'getBy') + _components.join(_connector);

            // ...And finally add the method!
            this._methods[_methodName] = _.bind(function(args) {
                args = Array.prototype.slice.apply(arguments);
                this._options.invoke.apply(this._options.scope || {}, [].concat([properties], args));
            }, this);

        }

    };

    if ($window) {
        // Attach it to the DOM window object.
        $window.Myriad = Myriad;
    }

    if ($module) {
        // Attach it to the CommonJS object.
        $module.exports = Myriad;
    }

})(typeof module !== 'undefined' ? module : null, typeof window !== 'undefined' ? window : null);