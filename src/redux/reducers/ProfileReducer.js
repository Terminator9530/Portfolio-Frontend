const initState = {
    profile : {},
    loading : false
};

function ProfileReducer(state = initState,action){

    if(action.type === "SYNC_PROFILE_ARRAY"){

        return {
            ...state,
            profile : action.profile
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

export default ProfileReducer;