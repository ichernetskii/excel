import { ExcelComponent } from "@core/ExcelComponent.js";
import { createTable } from "@/components/table/table.template.js";
import { resizeHandler } from "@/components/table/table.resize.js";
import { TableSelection } from "@/components/table/TableSelection.js";
import {
  shouldResize,
  isCell,
  shiftPressed
} from "@/components/table/table.functions.js";
import { $ } from "@core/DOM";

export class Table extends ExcelComponent {
  static className = "table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown"]
    });
  }

  toHTML() {
    return createTable(15);
  }

  prepare() {
    this.selection = new TableSelection("table__cell_selected");
  }

  init() {
    super.init();
    const $cell = this.$root.querySelector("[data-id='0:0']");
    this.selection.select($cell);
    window.s = this;
  }

  getCell(col, row) {
    return this.$root.querySelector(`[data-id='${row}:${col}']`);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event) && shiftPressed(event)) {
      const $from = this.selection.group[0];
      const $to = $(event.target);

      this.selection.select($from);
      this.selection.selectGroup(this, $from, $to);
    } else if (isCell(event) && !shiftPressed(event)) {
      const $cell = $(event.target);
      this.selection.select($cell);
    }
  }
}
