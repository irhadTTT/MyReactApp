import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
}
export const auth = (email, password, isSingUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuSPfnus3B5q1UTy17T_ZL6SXpPce0-fA';
        if(!isSingUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuSPfnus3B5q1UTy17T_ZL6SXpPce0-fA';
        }
        axios.post(url, authData)
        .then((response)=>{
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTime(response.data.expiresIn));
        }).catch((error)=>{
            dispatch(authFail(error.response.data.error));
        })
    }
}
export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const checkLogState = () =>{
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(authLogout());
        }else{
            const expDate = new Date(localStorage.getItem('expirationDate'));
            if(expDate <= new Date()){
                dispatch(authLogout());
            }else{
                const userId = localStorage.getItem('userId');
                authSuccess(token, userId);
                dispatch(checkAuthTime((expDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}