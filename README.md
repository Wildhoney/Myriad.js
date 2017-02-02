Myriad.js
======

<img src="https://travis-ci.org/Wildhoney/Myriad.js.png?branch=master" />
&nbsp;
<img src="https://badge.fury.io/js/myriad.js.png" />

With Myriad it is possible to mimic the behaviour of Ruby's `method_missing` method, and PHP's `__call`. Since JavaScript doesn't support this type of behaviour natively &ndash; apart from Firefox's `__noSuchMethod`, Myriad.js was created to fill the gap!

Examples
------

```javascript
// Single property.
myriad.getByName();

// Multiple properties.
myriad.getByNameAndLocationAndSex();

// Arguments.
myriad.getByNameAndLocationAndSex('male');
```

All of which can be created without any manual method creating at all. In fact, all possible combinations are created so you can construct your method names however you like.

Getting Started
------

In order to get started, Myriad only requires a couple of parameters from you to begin &ndash; the `model` to create the methods from, and the `callback` property for the function to invoke.

```javascript
new Myriad(model, function callback(properties, args) {

});
```

Myriad has a third argument which accepts a hash for <a href="#options">setting additional options</a>.

<h3>Callback Scope</h3>

Since Myriad has no idea on the desired scope for the callback method, you should use `bind` (or Underscore's `bind`) to enforce the context.

```javascript
_.bind(function callbackWithStringScope() {

    // "String as a scope!?"
    console.log(this);

}, 'String as a scope!?');
```

<h3>Depth</h3>

By default Myriad will only delve 3 levels deep into your `model`, which means that `getByNameAndSexAndLocation` would be created, but `getByNameAndSexAndLocationAndEmployed` would not because that's 4 properties. To change the default behaviour to include the latter, you can specify the `depth` option to set it to 4 or above (or less). For no limit at all you can set the property to `Infinity` &ndash; but be careful.

Options
------

Sometimes wild beasts need to be tamed! Myriad has a set of options for modifying and restricting the behaviour.

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>prefix</code></td>
        <td><code>String</code></td>
        <td>Default prefix for method names is <code>getBy</code>, which can be changed with the <code>prefix</code> option by specifying a string.</td>
    </tr>
    <tr>
        <td><code>depth</code></td>
        <td><code>Number</code></td>
        <td></td>
    </tr>
    <tr>
        <td><code>connector</code></td>
        <td><code>String</code></td>
        <td>Allows the overriding of the connecting word, which by default is <strong>And</strong>.</td>
    </tr>
    <tr>
        <td><code>ignore</code></td>
        <td><code>Array</code></td>
        <td>Allows to exclude certain property types in an array. Therefore any properties that are of type <code>number</code> could be excluded from being considered as a method name by adding <code>number</code> to the <code>ignore</code> array.</td>
    </tr>
    <tr>
        <td><code>alias</code></td>
        <td><code>Object</code></td>
        <td>Adds the ability to specify an object to alias the methods on, which results in your objects having the Myriad generated methods directly.</td>
    </tr>
</table>

Implementation
------

Since JavaScript does not natively support any `method_missing`, `__call`, or even Python's `__getattr__`, Myriad uses recursion to generate all possible combinations from your model's properties. Each created method has attached the properties that were used to create it in the first place &ndash; which are then passed through to your eventual callback.

Myriad is comprised of essentially two methods &ndash; firstly `_addIteration` is invoked passing in the first property that's discovered on your model. Since Myriad knows of all the properties on your model a <code><a href="http://underscorejs.org/#difference">difference</a></code> can be calculated to determine which other properties are required to be attached to it &ndash; `_addIteration` is then called iteratively, adding a new property onto it each and every time until `difference` eventually yields an empty array.

 * `_addIteration(['name'])`;
 * `_addIteration(['name', 'age'])`;
 * `_addIteration(['name', 'age', 'location'])`;
 * `_addIteration(['name'])`;
 * `_addIteration(['name', 'location'])`;
 * `_addIteration(['name', 'location', 'age'])`;

Once the combinations have been generated, the `_createMethod` method takes over to generate those methods with the corresponding properties used to generate it.


Contributing
------

All contributions are welcome provided they come with unit tests. Myriad's tests are written in <a href="http://mochajs.org/">Mocha</a> in conjunction with Should.js &ndash; please refer to the `tests/spec.js`.

Once you've added your contribution, please open a pull request for it to be merged into master.
