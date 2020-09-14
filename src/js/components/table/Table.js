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

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options
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
    this.selectCell($cell);

    this.$on("Formula:Input", text => {
      this.selection.group[0].text(text);
    });

    this.$on("Formula:Enter", () => {
      this.selection.group[0].focus();
    });

    window.s = this;
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("Table:CellSelect", $cell);
  }

  getCell(col, row) {
    return this.$root.querySelector(`[data-id='${row}:${col}']`);
  }

  get rowsCount() {
    return this.$root.querySelectorAll("[data-row]").length - 1;
  }

  get columnsCount() {
    return this.$root.querySelector("[data-row]").querySelectorAll("[data-column]").length;
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event) && shiftPressed(event)) {
      // multiple selection
      const $from = this.selection.group[0];
      const $to = $(event.target);

      this.selection.select($from);
      this.selection.selectGroup(this, $from, $to);
    } else if (isCell(event) && !shiftPressed(event)) {
      // single selection
      const $cell = $(event.target);
      this.selectCell($cell);
    }
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab", "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
    const key = event.key;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      let { col, row } = this.selection.group[0].id(true);
      switch (key) {
        case "Enter":
        case "ArrowDown":
          row += row === this.rowsCount - 1 ? 0 : 1;
          break;
        case "ArrowUp":
          row -= row === 0 ? 0 : 1;
          break;
        case "ArrowRight":
        case "Tab":
          col += col === this.columnsCount - 1 ? 0 : 1;
          break;
        case "ArrowLeft":
          col -= col === 0 ? 0 : 1;
          break;
      }

      const $cell = this.getCell(col, row);
      this.selectCell($cell);
    }
  }

  onInput(event) {
    if (!event.shiftKey) {
      this.$emit("Table:Input", $(event.target).text());
    }
  }
}
