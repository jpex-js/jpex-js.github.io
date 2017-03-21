## Extension & Inheritance

### Extending Jpex
Jpex's `extend` method returns a brand new class or container that inherits from its parent. Classes can be extended any number of times.

Each time you extend a class, the new class inherits its parent's `static` properties, prototype `methods`, registered `factories`, and configuration options.

------

### Invoking Parents
A class can be created with or without a constructor function. If you do not provide a constructor function, the parent's constructor is used:
```javascript
var Parent = Jpex.extend(function ($log) {
  $log('I am parent constructor');
});

var Child = Parent.extend();

new Child();

// 'I am parent constructor'
```
If you provide a constructor function, only the child constructor is used:
```javascript
var Parent = Jpex.extend(function ($log) {
  $log('I am parent constructor');
});

var Child = Parent.extend(function ($log) {
  $log('I am child constructor');
});

new Child();

// 'I am child constructor'
```
However, you can invoke both the child *and* parent constructor using the `invokeParent` option:
```javascript
var Parent = Jpex.extend(function ($log) {
  $log('I am parent constructor');
});

var Child = Parent.extend({
  invokeParent : true,
  constructor($log) {
    $log('I am child constructor');
  }
});

new Child();

// 'I am parent constructor'
// 'I am child constructor'
```

------

### Class Methods
The methods property of a class allows you to attach methods to the prototype that are available to all instances.
```javascript
var Class = Jpex.extend({
  methods : {
    myMethod(){
      ...
    }
  }
});

var instance = new Class();
instance.myMethod();
```
Think of methods as manually attaching properties to the `function.prototype`.

------

### Class Properties
Properties offer a way to define properties that will be set on instantiation. There are many ways a property can be set:
```javascript
var Class = Jpex.extend({
  properties : {
    // Simple properties can have a default primitive value
    // the value can be overwritten on the instance
    simpleProperty : 'foo',


    // Getters and Setters allow you to transform or validate
    // a value before committing it
    transformedProperty : {
      get(v){
        return v.toUpperCase();
      },
      set(v){
        if (typeof v !== 'string'){
          throw new Error('transformedProperty must be a [string]');
        }
        // the returned value will be committed
        return v.toLowerCase();
      }
    },

    // A property can have a watcher that is called
    // whenever the value is set to a different value
    // it is not a deep watcher: if you changed instance.watchedProperty.subProperty,
    // the watcher is not triggered
    watchedProperty : {
      watch(value, oldValue){
        this.dirty = true;
      }
    },

    // this is the shorthand for a watched property
    watchedProperty2(value, oldValue){
      this.dirty = true;
    },

    // A property can have a calculated default value, for non-primitives like Objects
    propertyWithDefaultValue : {
      default(){
        return {};
      }
    },

    // A property with just a getter can still be written to, set writable to false if you
    // want a truly read-only property
    getterProperty : {
      get(){
        return 'read only value';
      },
      writable : false
    }
  }
});
```

### Static Properties
Static properties are values available on the Class itself. They are inherited by child classes when created, but if a parent's property is changed, it does not automatically filter down to its children.  
```javascript
var Class = Jpex.extend({
  static : {
    myStaticMethod(){
      // ...
    }
  }
});

Class.myStaticMethod();
```

### Dependencies
A class's [dependencies](/guide/dependencies) can be declared either in the constructor function, or in the `dependencies` option:
```javascript

var Class = Jpex.extend(function (myService, myFactory) {
  // ...
});

var Class2 = Jpex.extend({
  dependencies : ['myService', 'myFactory'],
  constructor(s, f){
    // ...
  }
});
```
When you create an instance of the class, the dependencies are resolved.

You can attach the dependencies to the class instance using the `bindToInstance` option. This allows you to access the dependencies outside of the constructor function:
```javascript
var Class = Jpex.extend({
  dependencies : ['myService'],
  bindToInstance : true,
  constructor(myService){
    myService === this.myService; // true
    this.myService.doSomething();
  },
  methods : {
    myMethod(){
      this.myService.doSomething();
    }
  }
});
```
you can also set `bindToInstance` to a string and it will attach the dependencies to a property of that name:
```javascript
var Class = Jpex.extend({
  dependencies : ['myService'],
  bindToInstance : 'foo.bah',
  constructor(){
    this.foo.bah.myService.doSomething();
  }
});
```
