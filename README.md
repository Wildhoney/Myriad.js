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

You can use the `scope` option (see below) to specify what `this` is within your callback method, which is particularly useful if you're invoking a method inside of an object. You can therefore specify the `scope` as your object to maintain context!

All arguments are relayed onto the callback method as the second (and subsequent) argument(s).

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
        <td><code>scope</code></td>
        <td><em>Any</em></td>
        <td></td>
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
        <td><code>blacklist</code></td>
        <td><code>Array</code></td>
        <td>Allows to exclude certain property types in an array. Therefore any properties that are of type <code>number</code> could be excluded from being considered as a method name by adding <code>number</code> to the <code>blacklist</code> array.</td>
    </tr>
</table>