import axios from 'axios';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    CLEAR_ERRORS,
    DELETE_USER_SUCCESS,

} from '../constants/userConstants'


// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data'
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/auth/register', userData, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error?.response?.data?.message || error.message
        })
    }
}


// get user
export const loadUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        // const config = {
        //     headers: {
        //         "email": userData.email,
        //         "password": userData.password
        //     }
        // }
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post('/api/auth/login', userData, config);


        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error?.response?.data?.error || error.message,
        })
    }
}

// Get all user
export const allUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/auth/user');

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/auth/update/${id}`);


        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/auth/update/${id}`, userData, config);


        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}



//Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}