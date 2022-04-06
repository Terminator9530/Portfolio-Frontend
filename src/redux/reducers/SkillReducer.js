const initState = {
    skills : [],
    loading : false
};

function SkillReducer(state = initState,action){

    if(action.type === "SYNC_SKILLS_ARRAY"){

        return {
            ...state,
            skills : action.skills
        };
    }

    if(action.type === "CHANGE_LOADING_STATE"){
        return {
            ...state,
            loading : !state.loading
        }
    }

    return state;
}

export default SkillReducer;