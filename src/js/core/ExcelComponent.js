import { DOMListener } from "@core/DOMListener.js";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
  }

  // returns template of component
  toHTML() {
    return ""
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
