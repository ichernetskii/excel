import { Page } from "@core/page/Page.js";
import { createStore } from "@core/store/createStore.js";
import { rootReducer } from "@/redux/rootReducer.js";
import { normalizeInitialState } from "@/redux/initialState.js";
import { Excel } from "@/components/excel/Excel.js";
import { Header } from "@/components/header/Header.js";
import { Toolbar } from "@/components/toolbar/Toolbar.js";
import { Formula } from "@/components/formula/Formula.js";
import { Table } from "@/components/table/Table.js";
import { StateProcessor } from "@core/page/StateProcessor.js";
import { LocalStorageClient } from "@/shared/LocalStorageClient.js";

export class ExcelPage extends Page {
  constructor(param) {
    super(param);

    this.storeSub = null;
    this.processor = new StateProcessor(
      new LocalStorageClient(this.params)
    );
  }

  async getRoot() {
    const state = await this.processor.get();
    const store = createStore(rootReducer, normalizeInitialState(state));

    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
  }
}
