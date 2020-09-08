export class Emitter {
  constructor() {
    this.listeners = {};
    // {
    //   "event1": [fn1, fn2, fn3],
    //   "event2": [fn1, fn4],
    // }
  }

  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return () => {
      this.unsubscribe(eventName, fn);
    };
  }

  unsubscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName].filter(item => item !== fn);
    return () => {
      this.subscribe(eventName, fn);
    }
  }

  emit(eventName, ...args) {
    if (Array.isArray(this.listeners[eventName])) {
      this.listeners[eventName].forEach(fn => {
        fn(...args);
      });
      return true;
    } else {
      return false;
    }
  }
}
