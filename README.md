# wWorker
Web Worker implementation for executing functions in a separate thread

## Usage
Any `function` that needed to be handed ower to the worker should use the method `execute`. The execute is method is called with 3 arguments. `function name`, `args` and the `callback`. 

```javascript
execute(method, args, callback);
```
| Parameter   | Type           | Description  |
| ------------- |:-------------:| ----- |
| method      | `string` | Name of the method. Implemented in `scripts/<scriptName>`  |
| args      | `array`  |   Arguments for the `method` |
| callback | `function` |    Output from the `method` will be the input for the callback |


## How It Works
Initially a web worker will be created from the `initWorker.js`.  When the `execute` method is called, it will pass the arguments to web worker and the output from the worker results will be the input for the callback function.
  

