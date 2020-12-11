# wWorker
Web Worker implementation for executing functions in a separate thread

## Usage

### execute

Any `function` that needed to be handed ower to the worker should use the method `execute`. The execute is method is called with 3 arguments. `function name`, `args` and the `callback`. 

```javascript
execute(method, args, callback);
```
| Parameter   | Type           | Description  |
| ------------- |:-------------:| ----- |
| method      | `string` | Name of the method. Implemented in `scripts/<scriptName>`  |
| args      | `array`  | Arguments for the `method` |
| callback | `function` | Output from the `method` will be the input for the callback |

### detectOffline

`detectOffline` method will ping a given url at given time intervals.

```javascript
detectOffline(url, timeInterval, callback);
```
| Parameter   | Type           | Description  |
| ------------- |:-------------:| ----- |
| url      | `string` | URL to ping  |
| timeInterval      | `number`  | Time interval to ping |
| callback | `function` |  Callback to handle online, offline status change  |


## How It Works
Initially a web worker will be created from the `initWorkers.js`.  

When the `execute` method is called, it will pass the arguments to web worker and the output from the worker results will be the input for the callback function.

When the `detectOffline` method is called, the web worker will start pinging the given url. Only when a connection change happen, the worker will send a message to the main thread. Then the callback function will be called with the output from the worker.

---
 
## execute
<img src="https://github.com/heshanera/wWorker/blob/master/demo/sort.gif" width="600">

## detectOffline
<img src="https://github.com/heshanera/wWorker/blob/master/demo/offline.gif" width="600">
