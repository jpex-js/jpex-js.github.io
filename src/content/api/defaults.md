## Default Factories

### $resolve
`Function(name, [namedParameters])`  
Resolves a factory, similar to the static `Jpex.$resolve` method. You can pass in named parameters, however, `$resolve` will also use any named parameters that were passed into the class instantiator.

### $errorHandler
`Function(error)`  
If an error is uncaught during class instantiation, Jpex will use the `$errorHandler` factory to catch the error. By default this will just re-throw the error, but you may want to create an error handler that logs errors or gracefully exits the application.
