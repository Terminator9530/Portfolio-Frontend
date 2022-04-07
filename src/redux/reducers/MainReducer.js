import LoginReducer from './LoginReducer';
import SkillReducer from './Dashboard/SkillReducer';
import SkillReducerHomepage from './Homepage/SkillReducer';
import { combineReducers } from 'redux';

const MainReducer = combineReducers({
    LoginReducer,
    SkillReducer,
    SkillReducerHomepage
});

export default MainReducer;