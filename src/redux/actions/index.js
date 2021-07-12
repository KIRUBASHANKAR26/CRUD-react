import { ADD_TASK, EDIT_TASK} from '../actionTypes/index'

export const getTask = (payload) => ({
    type: ADD_TASK,
    payload:payload
})
export const editTask = (payload) => ({
    type: EDIT_TASK,
    payload:payload
})
