import LoginReducer from './LoginReducer';
import SkillReducer from './SkillReducer';
import { combineReducers } from 'redux';

const MainReducer = combineReducers({
    LoginReducer,
    SkillReducer
});

export default MainReducer;