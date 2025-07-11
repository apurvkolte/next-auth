import { combineReducers } from 'redux';
import { authReducer, allUsersReducer, updateUserReducer } from './reducers/userReducers';

const reducer = combineReducers({
    auth: authReducer,
    allUsers: allUsersReducer,
    updateUser: updateUserReducer,
});

export default reducer;
