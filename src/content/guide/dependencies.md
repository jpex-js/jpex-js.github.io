## Dependencies

### Resolving Dependencies
There are a number of ways you can request dependencies:  
- In a new Jpex class's constructor function: `Jpex.extend(function(myService){});`  
- In a new Jpex class's `dependencies` option: `Jpex.extend({dependencies : ['myService']})`  
- Using Jpex's `$resolve` method: `Jpex.$resolve('myService');`  
- In a factory or service: `Jpex.register.factory('myService', ['myOtherService'], function(myOtherService){});`  

Aside from the `$resolve` option, all of these methods are lazy: they won't actually request their dependencies until they have been instantiated themselves.

Once a dependency has been requested, Jpex will look in the following locations:  
- Named Parameters  
- Registered Factories  
- *Inherited* Factories  
- node_modules *(in node only)*

### Named Parameters
Named parameters are a way to pass in a specific value when instantiating a class or requesting a factory.
```javascript
var Class = Jpex.extend(function (custom) {

});

new Class({custom : 'foo'});
```
If you pass in a named parameter that has the same name as an existing factory, Jpex will use the named parameter instead.
```javascript
new Class({
  path : { /*some fake implementation of path*/ }
});
```
This is especially useful when unit testing as you can quickly replace a dependency with a fake implementation.

As well as when instantiating classes, you can also pass named parameters into the `$resolve` method:
```javascript
Jpex.register.constant('myConstant', 'real');

Jpex.register.factory('myFactory', function (myConstant) {
  return 'i am ' + myConstant;
});

Jpex.$resolve('myFactory'); // 'i am real'

Jpex.$resolve('myFactory', {myConstant : 'fake'}); // 'i am fake'
```

### Node Modules
If you request a factory that doesn't exist, Jpex will attempt to load it from your project's `node_modules` folder.
```javascript
Jpex.$resolve('fs');
```
Once Jpex has found a node module, it will register it as a constant for future use.

*This feature only works within node. In a browser or bundler, this feature will not be avaialble.*

### Optional Dependencies
Dependencies can be made optional by wrapping them in underscores. Normally if a dependency cannot be resolved, an error is thrown. If an optional dependency cannot be found, it will fail silently and return `undefined`.  
```javascript
// Although failsToResolve is registered, it depends on a non-existent factory and will throw an error when trying to resolve.
Class.register.factory('failsToResolve', function(doesNotExist){
  return {};
});

Class.register.factory('doesExist', function(){
  return {};
});

Class.$resolve('_doesNotExist_'); // undefined
Class.$resolve('_failsToResolve_'); // undefined
Class.$resolve('_doesExist_'); // {}
```

### Object Dependencies
One advanced feature is the ability to pass properties into a factory from your class declaration.

In your factory you can add a dependency to the special `$options` key. You can then access the `$options` object from your factory.

This means you can use a single factory for multiple  purposes, or accept configuration options.
```javascript
var Class = Jpex.extend({
  dependencies : [{myFactory : 'bob'}, {myFactory : 'steve'}, 'myFactory'],
  constructor(a, b, c){
    a.sayHello();
    b.sayHello();
    c.sayHello();
  }
});

Class.register.factory('myFactory', function($options){
  return {
    sayHello : function(){
      return 'hello ' + ($options || 'unknown');
    }
  };
});

new Class();

// 'hello bob'
// 'hello steve'
// 'hello unknown'
```
