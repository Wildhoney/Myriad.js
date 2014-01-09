Myriad.js
======

With Myriad it is possible to mimic the behaviour of Ruby's `method_missing` method, and PHP's `__call`. Since JavaScript doesn't support this type of behaviour natively &ndash; apart from Firefox's `__noSuchMethod`, Myriad.js was created to fill the gap!

Examples
------

```javascript
// Single property.
myriad.getByName();

// Multiple properties.
myriad.getByNameAndLocationAndSex();

// Arguments
myriad.getByNameAndLocationAndSex('male');
```

All of which can be created without any manual method creating at all. In fact, all possible combinations are created so you can construct your method names however you like.

Getting Started
------

In order to get started, Myriad only requires a couple of options from you to begin &ndash; the `model` to create the methods from, and the `invoke` property for the function to invoke.

```javascript
new Myriad({ model: model, invoke: function(properties, args) {

});
```

<h3>Callback Scope</h3>

You can use the `scope` option (see below) to specify what `this` is within your callback method, which is particularly useful if you're invoking a method inside of an object. You can therefore specify the `scope` as your object to maintain context!

All arguments are relayed onto the callback (`invoke`) method as the second (and subsequent) argument(s).

<h3>Levels</h3>

By default Myriad will only delve 3 levels deep into your `model`, which means that `getByNameAndSexAndLocation` would be created, but `getByNameAndSexAndLocationAndEmployed` would not because that's 4 properties. To change the default behaviour to include the latter, you can specify the `levels` option to set it to 4 or above (or less).

Options
------

Sometimes wild beasts need to be tamed! Myriad has a set of options for modifying and restricting the behaviour.

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Required</th>
    </tr>
    <tr>
        <td><code>model</code></td>
        <td><code>Object</code></td>
        <td>Yep</td>
    </tr>
    <tr>
        <td><code>invoke</code></td>
        <td><code>Function</code></td>
        <td>Yep</td>
    </tr>
    <tr>
        <td><code>scope</code></td>
        <td><em>Any</em></td>
        <td>Nope</td>
    </tr>
    <tr>
        <td><code>prefix</code></td>
        <td><code>String</code></td>
        <td>Nope</td>
    </tr>
    <tr>
        <td><code>levels</code></td>
        <td><code>Number</code></td>
        <td>Nope</td>
    </tr>
    <tr>
        <td><code>blacklist</code></td>
        <td><code>Array</code></td>
        <td>Nope</td>
    </tr>
</table>

<h3>Prefix</h3>

Default prefix for method names is `getBy`, which can be changed with the `prefix` option by specifying a string.

<h3>Blacklist</h3>

Allows to exclude certain property types in an array. Therefore any properties that are of type `number` could be excluded from being considered as a method name by adding `number` to the `blacklist` array.