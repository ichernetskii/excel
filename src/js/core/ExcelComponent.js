import { DOMListener } from "@core/DOMListener.js";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  // Настраимаем компонент по init
  prepare() {

  }

  // returns template of component
  toHTML() {
    return ""
  }

  // Формируем событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Инициализация компонента
  // добавление DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем DOM слушателей
  // Чистим слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
    // this.emitter.listeners = [];
  }
}
