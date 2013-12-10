(function($module, $window) {

    /**
     * @module Yen
     * @constructor
     */
    var Yen = function Yen() {

    };

    if ($window) {
        // Attach it to the DOM window object.
        $window.Yen = new Yen();
    }

    if (!$window) {
        // Attach it to the CommonJS object.
        $module.exports = new Yen();
    }

})(module, typeof window !== 'undefined' ? window : {});