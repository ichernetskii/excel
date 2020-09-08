import { ExcelComponent } from "@core/ExcelComponent.js";

export class Formula extends ExcelComponent {
  static className = "formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input"],
      ...options
    });
    this.emitter.subscribe("TableCellSelect", text => {
      this.$root.querySelector("[data-type='formulaInput']").text(text);
    });
  }

  toHTML() {
    return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable="true" spellcheck="false" data-type="formulaInput"></div>
    `;
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.emitter.emit("FormulaEnter", text);
  }
}
