import { defaultStyles } from "@/constants.js";
import { clone } from "@core/utils.js";

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: "",
  tableTitle: "New table",
  openedDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ""
});

export const normalizeInitialState = state => state ? normalize(state) : clone(defaultState);
