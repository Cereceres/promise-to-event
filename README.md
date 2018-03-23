# promise-to-event
promise to event emitter

# Usage
```js

const [ promise ] = promiseEvent((event) => event.emit('resolve', 'data'));
const res = await promise;
assert(res === 'data');

const res = await promiseEvent((event) => event.emit('resolve', 'data'));
assert(res === 'data');

const { error } = await promiseEvent((event) => event.emit('error', 'error'))
    .catch((error) => ({ error }));
assert(error === 'error');

const [ promise ] = promiseEvent((event) => event.emit('reject', 'error'));
const { error } = await promise.catch((error) => ({ error }));
assert(error === 'error');

const [ promise, event ] = promiseEvent((eventIn) => setTimeout(() => eventIn.emit('reject', 'error'), 50000));
promise.then((res) => {
    assert(res === 'data');
    done();
});

event.emit('resolve', 'data');

const [ promise, event ] = promiseEvent((eventIn) => setTimeout(() => eventIn.emit('reject', 'error'), 50000));
promise.catch((error) => {
    assert(error === 'error');
    done();
});

event.emit('error', 'error');

```
# API PromiseEvent(handler) -> [promise, eventemitter]

The handler is exec with eventemitter, the eventemitter is listened the events resolve, response, reject and error.

Return a array with promise self and the event.
