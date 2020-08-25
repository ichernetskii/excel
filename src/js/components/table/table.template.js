const CODES = {
  A: "A".charCodeAt(0),
  Z: "Z".charCodeAt(0)
}

function createCell(elem) {
  return `
    <div class="table__cell" contenteditable="true">${elem}</div>
  `;
}

function createCol(elem) {
  return `
    <div class="table__column">${elem}</div>
  `;
}

function createRow(content, colNumber = "") {
  return `
    <div class="table__row">
        <div class="table__row-info">${colNumber}</div>
        <div class="table__row-data">${content}</div>
    </div>
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
    .join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill("")
      .map(createCell)
      .join("");
    rows.push(createRow(cells, i + 1));
  }

  return rows.join("");
}
