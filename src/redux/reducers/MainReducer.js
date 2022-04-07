import LoginReducer from './LoginReducer';
import SkillReducer from './Dashboard/SkillReducer';
import LanguageReducer from './Dashboard/LanguageReducer';
import SkillReducerHomepage from './Homepage/SkillReducer';
import { combineReducers } from 'redux';

const MainReducer = combineReducers({
    LoginReducer,
    SkillReducer,
    SkillReducerHomepage,
    LanguageReducer
});

export default MainReducer;