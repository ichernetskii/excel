import { ExcelComponent } from "@core/ExcelComponent.js";
import { createTable } from "@/components/table/table.template.js";
import { resizeHandler } from "@/components/table/table.resize.js";

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

  onMousedown(event) {
    resizeHandler(event, this.$root);
  }
}
