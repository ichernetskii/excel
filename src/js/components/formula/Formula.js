import { ExcelComponent } from "@core/ExcelComponent.js";

export class Formula extends ExcelComponent {
  static className = "formula";

  constructor($root) {
    super($root, {
      name: "Formula",
      listeners: ["input", "click"]
    });
  }

  toHTML() {
    return `
        <div class="formula__info">fx</div>
        <div class="formula__input" contenteditable="true" spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(this.$root);
    console.log("Event onInput: ", event);
  }

  onClick(event) {
    console.log("Event onClick: ", event);
  }
}
