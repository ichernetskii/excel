import { Router } from "./Router.js";
import { Page } from "../page/Page.js";

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement("div");
    root.innerHTML = "dashboard";
    return root;
  }
}
class ExcelPage extends Page {}

describe("Router", () => {
  let router;
  let $el;

  beforeEach(() => {
    $el = document.createElement("div");

    router = new Router($el, {
      dashboard: DashboardPage,
      excel: ExcelPage
    });
  });

  test("should be defined", () => {
    expect(router).toBeDefined();
  });

  test("should render Dashboard Page", () => {
    router.changePageHandler();
    expect($el.innerHTML).toBe("<div>dashboard</div>");
  });
});
