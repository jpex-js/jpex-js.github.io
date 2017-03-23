## Jpex.$resolve
`Function(factoryName, [namedParameters])`  
Resolves a specific factory.  

`factoryName` can either be a string or an array of strings. If `factoryName` is an array, the return value is an equivalent array of resolved factories.

```javascript
var resolved = Jpex.$resolve('myFactory', {myConstant : 'foo'});
```
