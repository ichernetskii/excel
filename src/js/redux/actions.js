import { types } from "@/redux/types.js";

// Action creators
export function tableResize(resizeType, data) {
  return {
    type: types.TABLE_RESIZE,
    resizeType,
    data
  }
}

export function changeText(data) {
  return {
    type: types.CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type: types.CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: types.APPLY_STYLE,
    data // {ids = ["0:0", "1:5"], value}
  }
}

export function changeTitle(data) {
  return {
    type: types.CHANGE_TITLE,
    data // new title: string
  }
}

export function updateDate() {
  return {
    type: types.UPDATE_DATE
  }
}
