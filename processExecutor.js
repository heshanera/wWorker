import * as scripts from "./scripts/index.js";

onmessage = (e) => {
    // extract request message data 
    const { callable, args, callbackId } = e.data;
    const workerResult = {
        callbackId,
        result: scripts[callable].apply(null, args)
    };

    // posting results back to main script
    postMessage(workerResult);
};
