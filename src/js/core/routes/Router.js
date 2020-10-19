import { $ } from "@core/DOM.js";
import { ActiveRoute } from "@core/routes/ActiveRoute.js";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("Selector isn't provided in router.");
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) this.page.destroy();
    const Page = this.routes[ActiveRoute.action] || this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.clear();
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener("hashchange", this.changePageHandler);
  }
}
