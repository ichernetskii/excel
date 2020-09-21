import { ExcelComponent } from "@core/ExcelComponent.js";
import { createTable } from "@/components/table/table.template.js";
import { resizeHandler } from "@/components/table/table.resize.js";
import { TableSelection } from "@/components/table/TableSelection.js";
import {
  shouldResize,
  isCell,
  shiftPressed
} from "@/components/table/table.functions.js";
import { $ } from "@core/DOM.js";
import * as actions from "@/redux/actions.js";
import { defaultStyles } from "@/constants.js";

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
    return createTable(this.store.getState(), 15);
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
      this.updateTextInStore(text);
    });

    this.$on("Formula:Enter", () => {
      this.selection.group[0].focus();
    });

    this.$on("Header:Input", () => {
      this.selection.group[0].focus();
    });

    this.$on("Toolbar:ApplyStyle", value => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }));
    });

    window.s = this;
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("Table:CellSelect", $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
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

  async resizeTable(event) {
    try {
      const $resizer = $(event.target);
      const dataResize = $resizer.dataset.resize;
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(dataResize, data));
    } catch (e) {
      console.warn(e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }));
  }

  onInput(event) {
    if (!event.shiftKey) {
      this.updateTextInStore($(event.target).text())
    }
  }
}
