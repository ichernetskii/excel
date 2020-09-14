import { DOMListener } from "@core/DOMListener.js";

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.prepare();
    this.emitter = options.emitter;
    this.unsubscribers = [];
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
