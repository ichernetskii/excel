import { ExcelComponent } from "@core/ExcelComponent.js";
import * as actions from "@/redux/actions.js";
import { debounce, deleteFromStorage } from "@core/utils.js";
import { ActiveRoute } from "@core/routes/ActiveRoute.js";
import { $ } from "@core/DOM.js";

export class Header extends ExcelComponent {
  static className = "header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "keydown", "click"],
      subscribe: ["tableTitle"],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput.bind(this), 300);
  }

  toHTML() {
    const store = this.store.getState();
    document.title = `Excel: ${store.tableTitle}`;
    return `
        <input class="header__input" type="text" value="${store.tableTitle}" data-type="header-input">
        <div>
          <div class="button" data-type="delete">
            <i class="material-icons" data-type="delete">delete</i>
          </div>
          <div class="button" data-type="exit">
            <i class="material-icons" data-type="exit">exit_to_app</i>
          </div>
        </div>
    `;
  }

  init() {
    super.init();
    this.$header = this.$root.querySelector("[data-type='header-input']");
  }

  storeChanged({ tableTitle }) {
    const title = this.$header.text();
    document.title = `Excel: ${title}`;
  }

  onInput(event) {
    this.$dispatch(actions.changeTitle(this.$header.text()));
  }

  onKeydown(event) {
    if (["Tab", "Enter"].includes(event.key)) {
      event.preventDefault();
      this.$emit("Header:Input", null);
    }
  }

  onClick(event) {
    const target = $(event.target);
    let decision;
    switch (target.dataset.type) {
      case "delete":
        decision = window.confirm(`Are you sure you want to delete table "${this.$header.text()}"?`);
        if (decision) {
          deleteFromStorage(`excel:${ActiveRoute.param}`);
          ActiveRoute.navigate("");
        }
        break;
      case "exit":
        ActiveRoute.navigate("");
        break;
    }
  }
}
