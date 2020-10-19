import { Page } from "@core/Page.js";
import { createStore } from "@core/createStore.js";
import { rootReducer } from "@/redux/rootReducer.js";
import { normalizeInitialState } from "@/redux/initialState.js";
import { debounce, storage } from "@core/utils.js";
import { Excel } from "@/components/excel/Excel.js";
import { Header } from "@/components/header/Header.js";
import { Toolbar } from "@/components/toolbar/Toolbar.js";
import { Formula } from "@/components/formula/Formula.js";
import { Table } from "@/components/table/Table.js";

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(`excel:${params}`);
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce(state => {
      storage(`excel:${params}`, state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store: store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
