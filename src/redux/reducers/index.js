import * as actionTypes from '../actionTypes';

const initialState = {
    taskDatas:[]
}

const reducers = (state = initialState, { type, payload }) => {
    switch (type) {

    case actionTypes.ADD_TASK:
        return {...state,
            taskDatas: [...state.taskDatas, payload]}
    case actionTypes.EDIT_TASK:
        console.log("edit",payload)
        return {...state,
            taskDatas: payload}
    default:
        return state
    }
}

export default reducers;
