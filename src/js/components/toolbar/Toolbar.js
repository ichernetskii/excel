import { createToolbar } from "@/components/toolbar/toolbar.template.js";
import { $ } from "@core/DOM.js";
import { ExcelStateComponent } from "@core/ExcelStateComponent.js";
import { defaultStyles } from "@/constants.js";

export class Toolbar extends ExcelStateComponent {
  static className = "toolbar";

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentStyles"],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  toHTML() {
    return this.template;
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles)
  }

  get template() {
    return createToolbar(this.state);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.dataset.type === "button") {
      const value = JSON.parse($target.dataset.value);
      this.$emit("Toolbar:ApplyStyle", value);
    }
  }
}
