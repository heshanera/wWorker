const callbackMap = {};
let processExecutor;
let offlineDetector;
// check if the web worker is supported by the browser
if (window.Worker) {
    // creating a worker for script execution
    processExecutor = new Worker('./processExecutor.js', { type: 'module' });

    // creating a worker for offline detection
    offlineDetector = new Worker('./offlineDetector.js', { type: 'module' });
}

/**
 * Execute the given function with given args in a seperate thread
 * 
 * @param {String} callable funcion name 
 * @param {Array} args arguments for the function
 * @param {Function} callback function to be called with the callable output
 */
const execute = (callable, args = [], callback) => {

    // generate a key to map callback and the response
    const callbackId = new Date().getTime() + Math.random();
    callbackMap[callbackId] = callback;

    // sending data to the worker
    processExecutor.postMessage({ callable, args, callbackId });

    // recieve the processed output
    processExecutor.onmessage = (e) => {
        const { callbackId, result } = e.data;
        typeof callbackMap[callbackId] === 'function' && callbackMap[callbackId].apply(null, [ result ]);
        // remove callback from callback map
        delete callbackMap[callbackId];
    }

    // handle worker errors
    processExecutor.onerror = (e) => {
        // remove callback from callback map
        delete callbackMap[callbackId];
        throw new Error(e.message);
    }
};

/**
 * Check if the given url is accessible for given time intervals
 * 
 * @param {String} url the url to be ping
 * @param {Number} interval ping time interval in milliseconds
 * @param {Function} callback function to be called with the callable output
 */
const detectOffline = (url, interval, callback) => {

    // generate a key to map callback and the response
    const callbackId = new Date().getTime() + Math.random();
    callbackMap[callbackId] = callback;

    // sending data to the offline detector worker
    offlineDetector.postMessage({ url, interval, callbackId });

    // recieve the processed output
    offlineDetector.onmessage = (e) => {
        const { callbackId, result } = e.data;
        typeof callbackMap[callbackId] === 'function' && callbackMap[callbackId].apply(null, [ result ]);
        // remove callback from callback map
        delete callbackMap[callbackId];
    }

    // handle offline detector worker errors
    offlineDetector.onerror = (e) => {
        // remove callback from callback map
        delete callbackMap[callbackId];
        throw new Error(e.message);
    }
};
