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
     * @param model {Object}
     * @param callback {Function}
     * @param options {Object}
     */
    var Myriad = function Myriad(model, callback, options) {

        console.time('Myriad');

        setTimeout(function() {
            console.timeEnd('Myriad');
        }, 1);

        if (typeof _ === 'undefined') {
            throw 'Myriad.js requires Underscore.js: http://underscorejs.org/';
        }

        if (typeof model === 'undefined' || typeof model !== 'object') {
            throw 'Option `model` should be an instance of Object.';
        }

        if (typeof callback === 'undefined' || typeof callback !== 'function') {
            throw 'Option `invoke` should be an instance of Function.';
        }

        // Clear the arrays.
        this._methods    = [];
        this._properties = [];

        // Remove the options if it isn't an object.
        if (options && !_.isObject(options.alias)) {
            delete options.alias;
        }

        // Memorise the options that were passed in!
        this._callback = callback;
        this._options  = options;

        // Iterate over each key in the model to determine if it should be considered as a method
        // name.
        for (var key in model) {

            // Usual suspect!
            if (model.hasOwnProperty(key)) {

                // Determine if the key matches one of the types in the ignore array.
                if (_.contains(this._options.ignore || [], typeof model[key])) {
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
         * @property _callback
         * @type {Object}
         * @private
         */
        _callback: null,

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
                this._addIteration([properties[index]]);
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

                _.forEach(remainingProperties, _.bind(function propertyIteration(property) {

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
                _prefix     = (this._options.prefix || 'getBy'),
                _methodName = _prefix + _components.join(_connector);

            // ...And finally add the method!
            this._methods[_methodName] = _.bind(function(args) {
                args = Array.prototype.slice.apply(arguments);
                this._callback.apply(null, [].concat([properties], args));
            }, this);

            // Determine if we need to alias each function onto another object.
            if (this._options.alias) {

                // Apply the method to the alias object.
                this._options.alias[_methodName] = this._methods[_methodName];

            }

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