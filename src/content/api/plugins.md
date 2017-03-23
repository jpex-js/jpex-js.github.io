## Plugins

### name
`String`  
The name of the plugin. This is a required property and should be unique.

### reuse
`Boolean`  
Whether the plugin can be used more than once on a class that already uses it, or inherits a class that uses it.

### silent
`Boolean`  
Whether to display a console warning when the plugin is used multiple times.

### install
`Function(options)`
This function is called when the plugin is `use`d on a Jpex class. It takes an options object with the following properties:

### install options
#### Jpex
`Class`  
The original Jpex class the plugin was used on.

#### on
`Function(eventName, function)`
Attaches an event listener to one of the below hooks. The function receives a `payload` object that contains properties from the event

## Event Hooks
### extend
Called after a new class has been created by extending another. The listener receives the following object:
```javascript
{
  Jpex : 'the original class the plugin was registered on',
  Class : 'the newly-created class',
  options : 'the options used to create the class'
}
```
### options
Called when determining the `options` object before creating a new class. The listener receives the following object:
```javascript
{
  Jpex : 'the original class the plugin was registered on',
  options : 'the options used to create the class',
  merge : 'a function that merges an object into the current options object i.e. merge({someOption : true})'
}
```
### privateProperties
Called when setting private properties on a newly-created class. i.e. the `$resolve` property and internals like `$$factories` etc. The listener receives the following object:
```javascript
{
  Jpex : 'the original class the plugin was registered on',
  Class : 'the newly-created class',
  options : 'the options used to create the class',
  apply : 'a function that takes an Object containing new properties to attach to the instance. i.e. apply({someProp : "bob", someGetter : {get : function(){}}})'
}
```
### factories
Called when setting factories on a newly-created class. i.e. the `register.factory` method etc. The listener receives the following object:
```javascript
{
  Jpex : 'the original class the plugin was registered on',
  Class : 'the newly-created class',
  options : 'the options used to create the class',
  register : 'a function that takes the name of a factory type, and a function that constructs it, and attaches it to the class\'s register property'
}
```
### beforeCreate
Called when a class is instantiated with the `new` keyword. The event is fired *after* dependencies have been resolved, but *before* the constructor or parent have been invoked. The listener receives the following object:
```javascript
{
  Jpex : 'the original class the plugin was registered on',
  Class : 'the class being instantiated',
  options : 'the options used to create the class',
  instance : 'the new instance',
  args : 'the arguments about to be passed into the constructor function. i.e. an array of resolved dependencies'
}
```
### created
Called when a class is instantiated with the `new` keyword. The event is fired *after* the constructor and parent have been invoked. The listener receives the following object:
```javascript
{
  Jpex : 'the original class the plugin was registered on',
  Class : 'the class being instantiated',
  options : 'the options used to create the class',
  instance : 'the new instance',
  args : 'the arguments about to be passed into the constructor function. i.e. an array of resolved dependencies'
}
```
### getFactory
Called before Jpex tries to resolve a factory. If the set method is used, it will use this to resolve the factory instead of looking elsewhere.
```javascript
{
  Jpex : 'the original class the plugin was registered on',
  Class : 'the class being instantiated',
  factoryName : 'the name of the factory being resolved',
  set : 'a function that accepts any value to be used as the factory. It should be in a valid format, i.e. an object containing either a function, or a value and constant=true properties'
}
```
