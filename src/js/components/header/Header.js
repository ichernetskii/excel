import { ExcelComponent } from "@core/ExcelComponent.js";

export class Header extends ExcelComponent {
  static className = "header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      ...options
    });
  }

  toHTML() {
    return `
        <input class="header__input" type="text" value="New table">
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
}
