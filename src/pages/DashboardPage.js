import { Page } from "@core/Page.js";
import { $ } from "@core/DOM";
import { createRecordsTable } from "./dashboard.functions.js";

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();

    return $.create("div", "db").html(`
      <div class="db__header">
          <h1>
              Excel dashboard
          </h1>
      </div>
      <div class="db__new">
          <div class="db__view">
              <a href="#excel/${now}" class="db__create">
                  New table
              </a>
          </div>
      </div>
      <div class="db__table">
          ${ createRecordsTable() }
      </div>
    `);
  }
}
