import LoginReducer from './LoginReducer';
import SkillReducer from './SkillReducer';
import LanguageReducer from './LanguageReducer';
import ContactReducer from './ContactReducer';
import ProfileReducer from './ProfileReducer';
import { combineReducers } from 'redux';

const MainReducer = combineReducers({
    LoginReducer,
    SkillReducer,
    LanguageReducer,
    ContactReducer,
    ProfileReducer
});

export default MainReducer;