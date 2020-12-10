const callbackMap = {};
let worker;
// check if the worker is supported by the browser and initialzing a worker
if (window.Worker) {
    // creating a new worker
    worker = new Worker('./worker.js', { type: 'module' });
}

/**
 * Execute the given function with given args in a seperate thread
 * 
 * @param {String} callable funcion name 
 * @param {Array} args arguments for the function
 */
const execute = (callable, args = [], callback) => {

    // generate a key to map callback and the response
    const callbackId = new Date().getTime() + Math.random();
    callbackMap[callbackId] = callback;

    // sending data to the worker
    worker.postMessage({ callable, args, callbackId });

    // recieve the processed output
    worker.onmessage = (e) => {
        const { callbackId, result } = e.data;
        typeof callbackMap[callbackId] === 'function' && callbackMap[callbackId].apply(null, [ result ]);
    }

    // handle worker errors
    worker.onerror = (e) => {
        throw new Error(e.message);
    }
}
