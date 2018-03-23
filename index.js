const Event = require('events');

module.exports = (callback) => {
    const event = new Event();
    const response = [
        new Promise((resolve, reject) => {
            event.on('resolve', resolve);
            event.on('response', resolve);
            event.on('error', reject);
            event.on('reject', reject);
            callback(event);
        }),
        event
    ];
    const promise = response[0];
    response.then = promise.then.bind(promise);
    response.catch = promise.catch.bind(promise);

    return response;
};
