const CODES = {
  A: "A".charCodeAt(0),
  Z: "Z".charCodeAt(0)
}

function createCell(row) {
  return (_, col) =>`
    <div
        class="table__cell"
        contenteditable="true"
        data-column="${String.fromCharCode(col + CODES.A)}"
        data-id="${row}:${col}"
        data-type="cell">
    </div>
  `;
}

function createCol(elem) {
  return `
    <div class="table__column" data-type="resizable" data-column="${elem}">
        ${elem}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, rowNumber = "") {
  return `
    <div class="table__row" data-type="resizable" data-row="${rowNumber}">
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(createCol)
    .join("")
    .concat(createDelimeterRow());

  rows.push(createDelimeterCol());
  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(createCell(row))
      .join("");
    rows.push(createRow(cells, row + 1));
  }

  return rows.join("");
}
