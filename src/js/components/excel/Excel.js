import { $ } from "@core/DOM.js";
import { Emitter } from "@core/Emitter.js";
import { StoreSubscriber } from "@core/StoreSubscriber.js";
import { updateDate } from "@/redux/actions.js";
import { preventDefault } from "@core/utils.js";

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create("div", "excel");

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);

      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  init() {
    if (process.env.NODE_ENV === "production") {
      document.addEventListener("contextmenu", preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    if (process.env.NODE_ENV === "production") {
      document.removeEventListener("contextmenu", preventDefault);
    }
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}
