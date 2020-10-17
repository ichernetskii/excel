import { storage } from "@core/utils";
import { defaultStyles } from "@/constants.js";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: "",
  tableTitle: ""
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ""
});

export const initialState = storage("excel-state") ? normalize(storage("excel-state")) : defaultState;
