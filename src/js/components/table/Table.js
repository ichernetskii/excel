import { ExcelComponent } from "@core/ExcelComponent.js";

export class Table extends ExcelComponent {
  static className = "table";

  toHTML() {
    return `
        <div class="table__row">
            <div class="table__row-info"></div>
            <div class="table__row-data">
                <div class="table__column">
                    A
                </div>
                <div class="table__column">
                    B
                </div>
                <div class="table__column">
                    C
                </div>
            </div>
        </div>
        <div class="table__row">
            <div class="table__row-info">
                1
            </div>
            <div class="table__row-data">
                <div class="table__cell table__cell_selected" contenteditable="true">a1</div>
                <div class="table__cell" contenteditable="true">b1</div>
                <div class="table__cell" contenteditable="true">c1</div>
            </div>
        </div>
        <div class="table__row">
            <div class="table__row-info">
                2
            </div>
            <div class="table__row-data">
                <div class="table__cell" contenteditable="true">a2</div>
                <div class="table__cell" contenteditable="true">b2</div>
                <div class="table__cell" contenteditable="true">c2</div>
            </div>
        </div>
    `;
  }
}
