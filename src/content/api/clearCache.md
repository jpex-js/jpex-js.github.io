## Jpex.$clearCache
`Function([factoryNames])`  
Reverts the `resolved` state of all factories. This means that factories with an `Application` or `Class` lifecycle are forced to recalculate the next time they are requested. This is especially useful for unit testing.

`factoryNames` is a list of specific factories to clear and can either be a string or an array. If `factoryNames` is omitted, all factories are cleared.

```javascript
Jpex.$clearCache();

Jpex.$clearCache('myFactory');

Jpex.$clearCache(['myFactory', 'myService']);
```
