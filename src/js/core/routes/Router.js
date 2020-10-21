import { $ } from "@core/DOM.js";
import { ActiveRoute } from "@core/routes/ActiveRoute.js";
import { Loader } from "../../components/loader/Loader.js";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error("Selector isn't provided in router.");
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.loader = new Loader();

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener("hashchange", this.changePageHandler);
    this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) this.page.destroy();

    this.$placeholder.clear().append(this.loader);

    const Page = this.routes[ActiveRoute.action] || this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();
    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener("hashchange", this.changePageHandler);
  }
}
