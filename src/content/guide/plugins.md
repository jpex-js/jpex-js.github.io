## Plugins

### Using Plugins
There are a number of plugins available. You can see some of them [here](/plugins). Jpex plugins are very open-ended and allow for a lot of extra features to be added.

Using a plugin is simple - just `require` it and `use` it:
```javascript
var Jpex = require('jpex');
var plugin = require('jpex-folder');

Jpex.use(plugin, { /* plugin options */ });
```
and that's it. You can now use the plugin's functionality in your application:
```javascript
Jpex.register.folder('./path/to/folder');
```

It's also worth noting that you don't *have* to use a plugin on the original Jpex object. You can apply a plugin to only a specific class:
```javascript
var Class = Jpex.extend();

var SubClass = Class.extend();

SubClass.use(plugin);

Jpex.register.folder === undefined;
Class.register.folder === undefined;
SubClass.register.folder !== undefined;
```

### Writing Plugins
A plugin can be extremely simple or highly complex. The basic format for a plugin is as follows:
```javascript
{
  name : 'plugin-name',
  install : function(config){
    // Add something to the Jpex class the plugin was used on
    config.Jpex.someStaticProperty = 'plugged in!';

    // Inspect the plugin's configuration options:
    if (config.options.skipCertainSteps){
      return;
    }

    // Attach event listeners
    config.on('extend', function(evt){

    });
  }
}
```

A plugin *must* have a unique `name` property, and it *must* have an `install` method.

### Install
The install method is where you add event listeners and handle one-time configurations. The single argument contains the Class the plugin was used on, any configuration options passed into the `use` method, and an `on` method that creates an event handler.

### Hooks & Events
Event hooks are the most important part of Jpex plugins. They allow you to intercept Jpex's internal library and enhance or even replace its functionality.

A standard hook looks something like this:
```javascript
on('created', function (evt) {
  // Add something to the Jpex class the plugin was used on
  evt.Jpex.something = true;

  // Add something to the current Class
  evt.Class.instantiated = true;

  // Each event will have some specific properties
  var instance = evt.instance;
  instance.args = evt.args;
});
```

Some hooks will also provide some helper methods:
```javascript
on('getFactory', function (evt) {
  if (evt.factoryName === 'foobah'){
    var value = {
      fn : function () {
        return 'intercepted factory';
      }
    };

    evt.set(value);
  }
});
```
Details on each hook can be found in the [api](/api).

### Jpex Lifecycle
When `Jpex.extend` is called the following process occurs, including the firing of various events:

![Extend Lifecycle](../../assets/extend.png)

When `new Class()` is called, another process occurs. This is slightly more complex because it includes resolving nested dependencies and recursive invocation:

![Instance Creation Lifecycle](../../assets/instance.png)

### Triggering custom events
Internally, events are triggered using the `$trigger` class method. It is therefore possible to trigger custom events from within your plugin:
```javascript
on('extend', function (evt) {
  if (evt.Class.somePropertyCheck){
    var payload = {
      Class : evt.Class,
      customProperty : 'x'
    };
    evt.Class.$trigger('myCustomEvent', payload);
  }
});
```
You can then listen to these custom events like any other:
```javascript
on('myCustomEvent', function (evt) {

});
```

------

### Best Practices
#### Use ES5-safe syntax
It's not always clear in what context a plugin will be used so don't assume the environment will have ES6 features, or use an ES6-capable transpiler.

#### Check for dependent plugins
If you write a plugin that needs another plugin to be installed, you should check if it has been used:
```javascript
if (!Jpex.$$using['some-other-plugin']){
  // ...
}
```
At this point you can either `require` and `use` the dependent plugin, or throw an error.

#### Auto-register safe plugins
If a plugin is not going to affect existing functionality, like registering some default factories, then you may want to automatically install it when included via a `<script>` tag:
```javascript
if (typeof window !== 'undefined' && window.Jpex && window.Jpex.use){
  window.Jpex.use(module.exports);
}
```

#### Provide a dist version
If writing a browser-capable plugin, it is a good idea to provide a precompiled version that can be included with a `<script>` tag or without using *webpack* or *browserify*.  
There are several utilities out there to do this. Internally, Jpex is built using [jpex-build-tools](https://github.com/jpex-js/jpex-build-tools) which is an extremely basic bundler.

#### Test
If you plan on publishing and distributing a plugin, please provide some meaningful unit tests to prove it works!
