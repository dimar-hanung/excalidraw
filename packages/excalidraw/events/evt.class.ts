export class Evt<E extends string> {
  #events: [E, Function, boolean?][] = [];

  on(event: E, callback: Function) {
    this.#events.push([event, callback]);
  }

  once(event: E, callback: Function) {
    this.#events.push([event, callback, true]);
  }

  emit(event: E, ...args: any[]) {
    this.#events.forEach(([eventName, callback, once]) => {
      if (event === eventName || eventName === "*") {
        callback(...args);
        if (once) {
          this.off(event, callback);
        }
      }
    });
  }

  off(event: E, callback: Function) {
    this.#events.forEach(([eventName, eventCall], i) => {
      if (event === eventName && eventCall === callback) {
        this.#events.splice(i, 1);
      }
    });
  }
}
