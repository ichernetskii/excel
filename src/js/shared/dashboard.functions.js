import { storage } from "@core/../core/utils";

function toHTML(key) {
  const model = storage(key);
  const id = key.split(":")[1];
  const date = new Date(model.openedDate);
  return `
    <li class="db__record">
        <a href="#excel/${id}">Table "${model.tableTitle}"</a>
        <strong>${date.toLocaleString("ru-RU")}</strong>
    </li>
  `
}

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes("excel")) {
      keys.push(key);
    }
  }

  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) return "<p>No tables to display</p>";

  return `
    <div class="db__list-header">
        <span>Caption</span>
        <span>Last opened</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join("")}
    </ul>
  `;
}
