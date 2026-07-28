import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../common/common';

const initialState = {
    data: [],
    loading: false,
    error: false
};
const fetchDataStart = (state, action) => {
    return updatedObject(state, { loading: true });
}
const fetchDataSuccess = (state, action) => {
    return updatedObject(state, { data: action.data, loading: false });
}
const fetchDataFail = (state, action) => {
    return updatedObject(state, { loading: false });
}
const deleteDataStart = (state, action) => {
    return updatedObject(state, { loading: true });
}
const deleteDataSuccess = (state, action) => {
    const items = state.data.filter((i) => i.personId !== action.id);
    return updatedObject(state, { data: items, loading: false });
}
const deleteDataFail = (state, action) => {
    return updatedObject(state, { loading: false });
}
const updateDataStart = (state, action) => {
    return updatedObject(state, { loading: true });
}
const updateDataSuccess = (state, action) => {
    let item = action.person;
    let items = state.data;
    if(action.person.id != undefined){
        items = state.data.filter((i) => i.id !== action.person.id);
        items.push(item);
    }
    return updatedObject(state, { data: items, loading: false});
}
const updateDataFail = (state, action) => {
    return updatedObject(state, { loading: false });
}

const exportDataStart = (state, action) => {
    return updatedObject(state, { loading: true });
}
const exportDataSuccess = (state, action) => {
    return updatedObject(state, { loading: false });
}
const exportDataFail = (state, action) => {
    return updatedObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
            case actionTypes.FETCH_DATA_START:
                return fetchDataStart(state, action);
            case actionTypes.FETCH_DATA_SUCCESS:
                return fetchDataSuccess(state, action);
            case actionTypes.FETCH_DATA_FAIL:
                return fetchDataFail(state, action);
            case actionTypes.DELETE_DATA_START:
                return deleteDataStart(state, action);
            case actionTypes.DELETE_DATA_SUCCESS:
                return deleteDataSuccess(state, action);
            case actionTypes.DELETE_DATA_FAIL:
                return deleteDataFail(state, action);
            case actionTypes.UPDATE_DATA_START:
                return updateDataStart(state, action);
            case actionTypes.UPDATE_DATA_SUCCESS:
                return updateDataSuccess(state, action);
            case actionTypes.UPDATE_DATA_FAIL:
                return updateDataFail(state, action);
            case actionTypes.EXPORT_DATA_START:
                return exportDataStart(state, action);
            case actionTypes.EXPORT_DATA_SUCCESS:
                return exportDataSuccess(state, action);
            case actionTypes.EXPORT_DATA_FAIL:
                return exportDataFail(state, action);
        default:
            return state;
        }
    };

export default reducer;