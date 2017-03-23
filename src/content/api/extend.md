## Jpex.extend
`extend([options])`  
Creates a new class that inherits the parent.

The returned class will also have all of the same static methods available, including `extend`.

Options can either be a configuration object, a constructor function, or completely omitted.

## extend options
`Object | Function`  
If options is a function, it will be treated as the constructor function while all other options are defaulted.

### constructor
`Function(dep1, dep2, ...)`  
The constructor function. This is called when a new class is instantiated.
### dependencies
`Array | String | Object`  
Dependencies for the class. When instantiated, the dependencies are resolved and passed into the constructor function.
### bindToInstance
`Boolean | String`  
If true, when the dependencies have been resolved, they will be attached to the instance as properties.  
If `bindToInstance` is a string, it will attach the dependencies to a property with the same name. If the string contains *.* dots, it will assume that each dot indicates a sub property:
```javascript
var Class = Jpex.extend({
  dependencies : 'foo',
  bindToInstance : 'props.deps'
});
var instance = new Class();
instance.props.deps.foo;
```
### methods
`Object`  
An object containing methods that will be applied to the class's prototype. These methods will then be available on every instance of the class and inherited classes.
```javascript
Jpex.extend({
  methods : {
    myMethod : function () {
      return this.someProperty;
    }
  }
});
```

### properties
`Object | Array | String`  
An object containing property definitions for the class. These properties will be attached to each instance of the class.  
If a property is a primitive, it will be set as the default value for that property. If it is an object containing any of the below properties, it will be treated as a configuration object.
#### get
`Function(savedValue)`  
Receives the stored value as its argument. The return value is then returned to the caller.
#### set
`Function(newValue, oldValue)`  
Receives the new and old values as its arguments. The returned value will be stored for future *get* requests.
#### watch
`Function(newValue, oldValue)`  
Similar to the set property, except it doesn't affect the stored value. If you provide a function for a property instead of a configuration option, it will be assumed it is a watcher function.
#### value
`Any`  
The initial value for the property. If `value` is not a primitive type, be aware that multiple instances will end up with the same *object reference*. If you want to provide a complex initial value, consider using the `default` option instead...
#### default
`Function()`  
A function that returns a default value to be used for the property.
#### writable
`Boolean`  
Whether the property is writable, defaults to true.
#### configurable
`Boolean`  
Whether the property is configurable, defaults to true.
#### enumerable
`Boolean`  
Whether the property is enumerable, defaults to true.

### static
`Object`  
An object containing static properties and methods. These are available directly on the class.
```javascript
var Class = Jpex.extend({
  static : {
    method : function(){},
    prop : 'foo'
  }
});

Class.method();
Class.prop;
```
### invokeParent
`Boolean | String`  
Determines whether the parent constructor will be called.  
If `constructor` is not defined, this will default to true, otherwise it will be false.  
If set, the parent's constructor will be invoked *before* the current class's constructor. If you want the parent to be invoked *after*, you can set this property to `'after'`.
### config
`Object`  
The `config` option allows you to override the default options. This means that any class that inherits this one will be based on the config object rather than Jpex's original defaults.
```javascript
var Parent = Jpex.extend({
  config : {
    bindToInstance : 'deps'
  }
});

// Child will inherit the bindToInstance option of Parent
var Child = Parent.extend({
  dependencies : ['dep1', 'dep2']
});

new Child().deps.dep1;

// The bindToInstance can still be overridden
var Sibling = Parent.extend({
  dependencies : ['dep1'],
  bindToInstance : false
});

new Sibling().deps.dep1 // does not exist
```
### defaultLifecycle
`Number`  
Sets the default lifecycle for all factories registered on this class. Normally, all factories by default have an `instance` lifecycle, so in order to change this you need to set the lifecycle on every factory:
```javascript
Class.register.factory('foo', () => {}).lifecycle.application();
```
If you have a lot of singleton factories, the `defaultLifecycle` option can be useful:
```javascript
Jpex.extend({
  defaultLifecycle : 1
});
```
The numeric values correspond to values in Jpex's `constants` file. Using this file makes it easier to see at a glance the lifecycle:
```javascript
var constants = require('jpex/src/constants');

Jpex.extend({
  defaultLifecycle : constants.APPLICATION
});
```
