import { capitalize } from "@core/utils";

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No $root provided for DomListener!");
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const funcName = getMethodName(listener);
      if (!this[funcName]) {
        throw new Error(`Event ${funcName} isn't realised in ${this.name} component.`)
      }

      this.$root.on(listener,
        this[funcName].bind(this)
      );
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const funcName = getMethodName(listener);
      if (!this[funcName]) {
        throw new Error(`Event ${funcName} isn't realised in ${this.name} component.`)
      }

      this.$root.off(listener, this[funcName]);
    });
  }
}

function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
