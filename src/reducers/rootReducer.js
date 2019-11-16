import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dreamReducer from './dreamReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    myDreams: dreamReducer
})

export default rootReducer;