import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dreamReducer from './dreamReducer';
import allDreamsReducer from './allDreamsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    myDreams: dreamReducer,
    allDreams: allDreamsReducer
})

export default rootReducer;