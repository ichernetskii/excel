import "../scss/index.scss";
import { Excel } from "@/components/excel/excel.js";
import { Header } from "@/components/header/Header.js";
import { Toolbar } from "@/components/toolbar/Toolbar.js";
import { Formula } from "@/components/formula/Formula.js";
import { Table } from "@/components/table/Table.js";
import { createStore } from "@core/createStore.js";
import { rootReducer } from "@/redux/rootReducer.js";
import { storage, debounce } from "@core/utils.js";
import { initialState } from "@/redux/initialState.js";

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
  storage("excel-state", state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store: store
});

excel.render();
