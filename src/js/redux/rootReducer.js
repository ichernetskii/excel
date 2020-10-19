import { types } from "@/redux/types.js";

function value(state, field, action) {
    const prevState = state[field] || {};
    prevState[action.data.id] = action.data.value;
    return prevState;
}

export function rootReducer(state, action) {
    let field;
    let val;
    switch (action.type) {
        case types.TABLE_RESIZE:
            field = action.resizeType === "col" ? "colState" : "rowState";
            return { ...state, [field]: value(state, field, action) };
        case types.CHANGE_TEXT:
            field = "dataState";
            return { ...state, [field]: value(state, field, action), currentText: action.data.value };
        case types.CHANGE_STYLES:
            return { ...state, currentStyles: action.data };
        case types.APPLY_STYLE:
            field = "stylesState";
            val = state[field] || {};
            action.data.ids.forEach(id => {
                val[id] = { ...val[id], ...action.data.value };
            })
            return { ...state, [field]: val, currentStyles: { ...state.currentStyles, ...action.data.value } }
        case types.CHANGE_TITLE:
            return { ...state, tableTitle: action.data };
        case types.UPDATE_DATE:
            return { ...state, openedDate: new Date().toJSON() }
        default: return state;
    }
}
