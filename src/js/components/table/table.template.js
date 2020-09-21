import { toInlineStyles } from "@core/utils.js";
import { defaultStyles } from "@/constants.js";

const CODES = {
  A: "A".charCodeAt(0),
  Z: "Z".charCodeAt(0)
}

function createCell(row, col, width, content, state) {
  const widthStr = width ? `width: ${width}px; ` : "";
  const dataColumn = String.fromCharCode(col + CODES.A);
  const id = `${row}:${col}`;
  const styles = toInlineStyles({
    ...defaultStyles,
    ...state.stylesState[id]
  });
  return `
    <div
        class="table__cell"
        contenteditable="true"
        data-column="${dataColumn}"
        data-id=${id}
        data-type="cell"
        style="${widthStr}${styles}">
        ${content || ""}
    </div>`
}

function createCol(colNumber, width) {
  const widthStr = width ? `style="width: ${width}px"` : "";
  return `
    <div class="table__column" data-type="resizable" data-column="${colNumber}" ${widthStr}>
        ${colNumber}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, rowNumber = "", height) {
  const heightStr = height ? `style="height: ${height}px"` : "";
  return `
    <div class="table__row" data-type="resizable" data-row="${rowNumber}" ${heightStr}>
        <div class="table__row-info">
            ${rowNumber}
            ${rowNumber ? "<div class='row-resize' data-resize='row'></div>" : ""}
        </div>
        <div class="table__row-data">${content}</div>
    </div>
  `;
}

function createDelimeterCol() {
  return `
    <div class='table__col-delimeter' data-type="delimeterCol"></div>
  `;
}

function createDelimeterRow() {
  return `
    <div class='table__row-delimeter' data-type="delimeterRow"></div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, columnLetter) {
  return state.colState[columnLetter];
}

function getHeight(state, rowNumber) {
  return state.rowState[rowNumber];
}

export function createTable(state = {}, rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(dataColumn => {
      const width = getWidth(state, dataColumn);
      return createCol(dataColumn, width);
    })
    .join("")
    .concat(createDelimeterRow());

  rows.push(createDelimeterCol());
  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map((_, col) => {
        const dataColumn = String.fromCharCode(col + CODES.A);
        const width = getWidth(state, dataColumn);
        const text = state["dataState"][`${row}:${col}`];
        return createCell(row, col, width, text, state);
      })
      .join("");
    rows.push(createRow(cells, row + 1, getHeight(state, row + 1)));
  }

  return rows.join("");
}
