const initState = {
    languages : [],
    loading : false
};

function LanguageReducer(state = initState,action){

    if(action.type === "SYNC_LANGUAGES_ARRAY"){

        return {
            ...state,
            languages : action.languages
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

export default LanguageReducer;