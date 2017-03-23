## Jpex.register

### factory
`Function(name, [dependencies], function)`

See [factories](/guide/factories#factories)

### service
`Function(name, [dependencies], function)`  

See [services](/guide/factories#services)

### constant
`Function(name, [dependencies], function)`  

See [constants](/guide/factories#constants)

### decorator
`Function(name, function)`  

See [decorators](/guide/factories#decorators)

## factoryWrapper
`Object`  
Registering a factory service or constant returns a *factoryWrapper*. An object that allows additional setup to be configured:

### lifecycle
Sets the lifecycle of a factory. This determines how long the value of a resolved factory is cached for until it is calculated again.  

*note a factory can always be forced to recalculate by calling `Jpex.$clearCache()`*

```javascript
Jpex.register.factory('myFactory', function(){}).lifecycle.application();
```
#### application
The first time the factory is resolved, its value is cached for the entire application.

#### class
Once per class. Every instance of that class will use the same factory instance, but any parent or child classes will create a new instance.

#### instance
Once per instance. Every class instance will recalculate the factory, but its value is passed on to its dependencies.

#### none
The factory is calculated every time it is requested, even within the same instance.
