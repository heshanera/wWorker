let offline = false;

onmessage = (e) => {
    // extract request message data 
    const { url, interval, callbackId } = e.data;
    // ping the given url at given intervals
    setInterval(() => { ping(url, callbackId); }, interval);
};

const handleDisconnect = (callbackId) => {
    // only sending a message to main script when status change happens
    // if the previous status was online
    if (!offline) {
        const workerResult = {
            callbackId,
            result: {
                offline: true,
                message: 'Offline',
            },
        };
        offline = true; // update the current status to online
        postMessage(workerResult); // posting results back to main script
    }
}

const handleReconnect = (callbackId) => {
    // only sending a message to main script when status change happens
    // if the previous status was offline
    if (offline) {
        const workerResult = {
            callbackId,
            result: {
                offline: false,
                message: 'Online',
            },
        };
        offline = false; // update the current status to online
        postMessage(workerResult); // posting results back to main script
    }
}

const ping = (url, callbackId) => {
    const http = new XMLHttpRequest();
    http.open('HEAD', url);
    http.onreadystatechange = () => {
        if (http.readyState === http.HEADERS_RECEIVED) {
            if (http.status) {
                handleReconnect(callbackId);
            } else { 
                handleDisconnect(callbackId);
            }
        }
    };
    http.onerror = () => {
        // only sending a message to main script when status change happens
        // if the previous status was online
        if (!offline) {
            handleDisconnect(callbackId);
        }
    };
    http.send();
}
