const assert = require('assert');

const promiseEvent = require('../index');

describe('test to promise to event', () => {
    it('should call the callback with event', async() => {
        const [ promise ] = promiseEvent((event) => event.emit('resolve', 'data'));
        const res = await promise;
        assert(res === 'data');
    });

    it('should call the callback with event and return a wrap to promise', async() => {
        const res = await promiseEvent((event) => event.emit('resolve', 'data'));
        assert(res === 'data');
    });

    it('should call the callback with event and return a wrap to promise', async() => {
        const { error } = await promiseEvent((event) => event.emit('error', 'error'))
            .catch((error) => ({ error }));
        assert(error === 'error');
    });

    it('should call the callback with error ', async() => {
        const [ promise ] = promiseEvent((event) => event.emit('reject', 'error'));
        const { error } = await promise.catch((error) => ({ error }));
        assert(error === 'error');
    });

    it('should call the callback with data from event outside ', (done) => {
        const [ promise, event ] = promiseEvent((eventIn) => setTimeout(() => eventIn.emit('reject', 'error'), 50000));
        promise.then((res) => {
            assert(res === 'data');
            done();
        });

        event.emit('resolve', 'data');
    });

    it('should call the callback with error from event outside ', (done) => {
        const [ promise, event ] = promiseEvent((eventIn) => setTimeout(() => eventIn.emit('reject', 'error'), 50000));
        promise.catch((error) => {
            assert(error === 'error');
            done();
        });

        event.emit('error', 'error');
    });
});
