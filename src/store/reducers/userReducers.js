import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    RESET_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    CLEAR_ERRORS
} from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                user: action.payload.user,
                message: action.payload.message,
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                user: null,
                error: action.payload

            }
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload

            }

        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }

        case RESET_SUCCESS:
            return {
                ...state,
                success: false,
            };

        default:
            return state

    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const updateUserReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.isUpdated,
                success: action.payload.success,
                message: action.payload.message
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.isDeleted,
                success: action.payload.success,
                message: action.payload.message
            }

        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
                message: false
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
                message: false
            }

        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isDeleted: false,
                isUpdated: false,
                message: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
