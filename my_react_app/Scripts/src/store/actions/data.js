import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-instance';


export const fetchDataStart = () => {
    return {
        type: actionTypes.FETCH_DATA_START
    }
};
export const fetchDataSuccess = (fetchedData) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        data: fetchedData
    }
};
export const fetchDataFail = (error) => {
    return {
        type: actionTypes.FETCH_DATA_FAIL,
        error: error
    }
};
export const fetchData = () => {
    return dispatch => {
        dispatch(fetchDataStart());
        axios.get('Persons/GetAllPersons')
        .then(res=>{
            const fetchedData = [];
            for (let key in res.data) {
                fetchedData.push({
                    ...res.data[key],
                    id: key
                }); 
            }
            dispatch(fetchDataSuccess(fetchedData))
        })
        .catch((error)=>{
            dispatch(fetchDataFail(error));
        });
    }
}

export const deleteDataStart = () => {
    return {
        type: actionTypes.DELETE_DATA_START
    }
};
export const deleteDataSuccess = (personId) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        id: personId
    }
};
export const deleteDataFail = (error) => {
    return {
        type: actionTypes.DELETE_DATA_FAIL,
        error: error
    }
};
export const deletePersonData = (personId) => {
    return dispatch => {
        dispatch(deleteDataStart());
        axios.delete('Persons/DeletePerson', {
            params: {
              personId: personId
            }})
        .then(res => {
            if(res.data.success){             
                dispatch(deleteDataSuccess(personId))
            }
        })
        .catch((error)=>{
            dispatch(deleteDataFail(error));
        });
    }
}

export const updateDataStart = () => {
    return {
        type: actionTypes.UPDATE_DATA_START
    }
};
export const updateDataSuccess = (personToUpdate) => {
    return {
        type: actionTypes.UPDATE_DATA_SUCCESS,
        person: personToUpdate
    }
};
export const updateDataFail = (error) => {
    return {
        type: actionTypes.UPDATE_DATA_FAIL,
        error: error
    }
};
export const updatePersonData = (personToUpdate) => {
    return dispatch => {
        dispatch((updateDataStart()));
        axios.get('Persons/AddUpdatePerson', {
            params: personToUpdate})
        .then(res => {
            if(res.data.success){   
                personToUpdate.id = res.data.personId;    
                personToUpdate.personId = res.data.personId;           
                dispatch(updateDataSuccess(personToUpdate))
            }
        })
        .catch((error)=>{
            dispatch(updateDataFail(error));
        });
    }
}

export const exportDataStart = () => {
    return {
        type: actionTypes.EXPORT_DATA_START
    }
};
export const exportDataSuccess = () => {
    return {
        type: actionTypes.EXPORT_DATA_SUCCESS,
    }
};
export const exportDataFail = (error) => {
    return {
        type: actionTypes.EXPORT_DATA_FAIL,
        error: error
    }
};
export const exportPersonData = () => {
    return dispatch => {
        dispatch((exportDataStart()));
        axios.get('Persons/ExportData')
        .then(res => {
            if(res.data.success){               
                dispatch(exportDataSuccess())
            }
        })
        .catch((error)=>{
            dispatch(exportDataFail(error));
        });
    }
}