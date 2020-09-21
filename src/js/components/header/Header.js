import { ExcelComponent } from "@core/ExcelComponent.js";
import * as actions from "@/redux/actions.js";

export class Header extends ExcelComponent {
  static className = "header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "keydown"],
      subscribe: ["tableTitle"],
      ...options
    });
  }

  toHTML() {
    const store = this.store.getState();
    document.title = `Excel: ${store.tableTitle}`;
    return `
        <input class="header__input" type="text" value="${store.tableTitle}" data-type="header-input">
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
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
}
