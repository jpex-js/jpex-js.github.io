## Introduction

### What is Jpex
Jpex is a comprehensive *Dependency Injection* library that allows you to register services or values against a common container and then inject them at a later point in your application.
It also provides an intelligent way to organise your code into inheritable classes for a more Object-Orientated style of application.

### What is Dependency Injection
Dependency Injection is, simply, the process of injecting dependencies into a module. In a normal *commonJs*-style application, you would use `require()` to load your dependencies from within your module:
```javascript
module.exports = function(){
  var path = require('path');
  var fs = require('fs');
  var MyService = require('../services/myService');
  var myService = new MyService('arg1', 'arg2', 'arg3');
  // do some stuff
};
```
However, this means that your code is *tightly-coupled*. In order to use anything from outside your module you need to know *where* it lives in the file system and exactly *how* to use it and set it up.

If the parameters for the `MyService` class change in the future, you must find every place in your application that you instantiate it to update the parameter list.

It also means **unit testing** becomes very difficult as your dependencies are *hard-coded* into the module. The only way you can create a mock version of `MyService` is to use something like [Rewire](https://www.npmjs.com/package/rewire) or [inject-loader](https://www.npmjs.com/package/inject-loader) to forcibly intercept the `require` calls.

Dependency Injection is a way to abstract this part of the application into a separate process. Your calling code shouldn't care what dependencies another module uses. But similarly, your module shouldn't care where its dependencies come from, or how they're constructed.

### Dependency Injection with Jpex
Using Jpex, dependencies are registered with instructions on how to construct them. You can then request dependencies without having to worry about where they come from:
```javascript
module.exports = Jpex.extend(function(path, fs, myService){
  // do some stuff
});
```
This function now has access to `path`, `fs`, and a pre-constructed `myService` instance without having to do any more work.

At some earlier part of your application, you can register `myService`:
```javascript
Jpex.register.service('myService', function(arg1, arg2, arg3){
  // ...
});
```
`myService` is now available throughout the application and the construction of the service is handled by Jpex.

------

### Javascript Classes
Classes in javascript have always been awkward due to its prototypical nature. A class is essentially just a function that can be constructed:
```javascript
function MyClass(){
  this.method = function(){};
}
var instance = new MyClass();
```
other than sticking to a strict naming convention, it's not clear what is a function and what is a class as they both use the same syntax. This leads to other confusing bugs:
```javascript
MyClass();
// calling MyClass without new has attached method to the global context
window.method();
```
Inheritance is also an awkward construct to implement in javascript:
```javascript
function InheritedClass(){

}
// Create a new prototype object that uses the parent class's prototype as its prototype!
InheritedClass.prototype = Object.create(MyClass.prototype);
InheritedClass.prototype.constructor = InheritedClass;
// We may want to inherit static properties?
Object.keys(MyClass).forEach(key => InheritedClass[key] = MyClass[key]);
```

### Jpex Classes
Jpex's class system allows you to easily create a new class:
```javascript
var Class = Jpex.extend(function(){
  /// constructor function
});
```
inherit another class:
```javascript
var SubClass = Class.extend();
```
and configure all sorts of additional options:
```javascript
var SubSubClass = SubClass.extend({
  dependencies : ['myFactory', '$log'],
  bindToInstance : true,
  constructor : function(){},
  invokeParent : true,
  methods : {
    method : function(){}
  },
  properties : {
    property : 1234
  },
  static : {
    staticValue : 'foo'
  },
  defaultLifecycle : 1
});
```
and of course, Jpex classes can have dependency injection and unordered parameters:
```javascript
var Class = Jpex.extend(function (myService, width, height) {

});

var instance = new Class({width : 100, height : 150}); // myService is injected automatically
```

------

### History
Jpex (or *Javascript Prototype Extension*) was originally written as a simple inheritance wrapper to quickly create new and extendable classes.

It soon became something much more comprehensive, introducing inheritable static properties and configurable prototypes.

Eventually dependency injection was added and the usefulness of this feature quickly became Jpex's main focus.
