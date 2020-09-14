import { ExcelComponent } from "@core/ExcelComponent.js";
import { $ } from "@core/DOM";

export class Formula extends ExcelComponent {
  static className = "formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options
    });
  }

  init() {
    super.init();

    this.$formula = this.$root.querySelector("[data-type='formulaInput']");

    this.$on("Table:CellSelect", $el => {
      this.$formula.text($el.text());
    });

    this.$on("Table:Input", text => {
      this.$formula.text(text);
    });
  }

  toHTML() {
    return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable="true" spellcheck="false" data-type="formulaInput"></div>
    `;
  }

  onInput(event) {
    this.$emit("Formula:Input", $(event.target).text());
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      this.$emit("Formula:Enter", null);
    }
  }
}
