## Factories

### Registering Factories
Jpex's Dependency Injection functionality is based around *factories*. These are small modules that are *registered* against a Jpex-based class. Whenever that module is requested, Jpex *resolves* it and returns its value.

There are 3 core types of factories that can be registered: Factories, Services, and Constants. There are also Decorators, although these are technically not factories.

------

### Factories
A factory is a function that returns a value and is the basis of all other types of factories. A simple factory takes a *name* and a *function*:
```javascript
Container.register.factory('urls', function () {
  return {
    users : '/api/users'
  };
});
```
When you request the `urls` factory, it will return `{users:'/api/users'}`.

A factory can also depend on other factories:
```javascript
Container.register.factory('urls', function (api_url) {
  return {
    users : api_url + '/users'
  };
});
```
When the `urls` factory is requested, it will first resolve the `api_url` factory and make it available to the `urls` factory.  

If you are writing web-facing code, chances are your code will be minified for production. In this case you will need to provide string literals for your dependencies:
```javascript
Container.register.factory('urls', ['api_url'], function (api_url) {
  return {
    users : api_url + '/users'
  };
});
```
This will work just like the previous example, except that it doesn't rely on the argument name to determine the dependency.

### Services
Services are similar to factories except that instead of using the function's return value, the function is treated like a constructor:
```javascript
Container.register.service('urls', ['api_url'], function (api_url) {
  this.users = api_url + '/users';
});
```
When the `urls` service is requested, it is instantiated with the `new` keyword.

### Jpex As A Service
Because services are class constructors, it is possible to register another Jpex class as a service:
```javascript
var Urls = Jpex.extend({
  dependencies : 'api_url',
  constructor(api_url){
    this.users = api_url + '/users';
  }
});

MainClass.register.service('urls', Urls);
```
Obviously this example service would be too simple to warrant creating a new Jpex class, but shows how you can create a deep and rich hierarchy of Jpex classes.  
Also note that you don't need to declare the string dependencies twice.

### Constants
Constants are the simplest factories as they just return a static value whenever they are requested:
```javascript
Container.register.constant('urls', {users : '/api/users'});
```
(Note that a constant can't request any dependencies)

### Decorators
Decorators allow you to intercept an existing factory and *decorate* it before it is passed to the requester.
```javascript
Container.register.decorator('urls', function (urls) {
  urls.user += '/test';
  return urls;
});
```
The decorator function takes the resolved factory as its only argument and its return value is then returned.

If your decorator requires additional dependencies you can use the Class's `$resolve` method to request them:
```javascript
Container.register.decorator('urls', function (urls) {
  var suffix = this.$resolve('suffix');
  urls.user += '/' + suffix;
  return urls;
});
```
You can register multiple decorators and they will be chained up accordingly.

------

### Lifecycles
The lifecycle of a factory determines how often a new instance is created.

There are four options: `application`, `instance`, `class`, `none`.  
The default lifecycle for a factory is `instance`, meaning it is recalcated for every new instance of a class.

You can set the lifecycle of a factory after registering it:
```javascript
Container.register.factory('urls', function(){}).lifecycle.application();
```
You can set the *default* lifecycle when setting your *extenion options*:
```javascript
var constants = require('jpex/src/constants');
var Container = Jpex.extend({
  defaultLifecycle : constants.APPLICATION // 1
});
```
More information on what each lifecycle does can be found in the [api](/api/factories/lifecycles).
