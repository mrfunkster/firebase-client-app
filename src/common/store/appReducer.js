import { REGISTER, SHOW_LOADER, HIDE_LOADER, SET_USER_ID, CLEAR_USER_ID, SET_USER_DATA, CLEAR_USER_DATA, ENTER_EDIT_MODE, EXIT_EDIT_MODE, UPDATE_USER_DATA } from "./types";

const initialState = {
    userID: "",
    userData: {},
    showLoader: false,
    editMode: false,
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case ENTER_EDIT_MODE:
            return {...state, editMode: true};
        case EXIT_EDIT_MODE:
            return {...state, editMode: false};
        case SET_USER_ID:
            return {...state, userID: action.payload};
        case CLEAR_USER_ID:
            return {...state, userID: ""};
        case SET_USER_DATA: 
            return {...state, userData: action.payload};
        case CLEAR_USER_DATA:
            return {...state, userData: {}};
        case REGISTER: 
            return {...state, registerData: action.payload};
        case SHOW_LOADER:
            return {...state, showLoader: true};
        case HIDE_LOADER:
            return {...state, showLoader: false};
        default: return state;
    };
}

export default appReducer