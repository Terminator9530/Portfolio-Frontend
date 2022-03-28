const initState = {
    isLoggedIn : false
};

function LoginReducer(state = initState,action){
    if(action.type == "CHANGE_LOGIN_STATUS"){
        return {
            ...state,
            isLoggedIn : !state.isLoggedIn
        }
    }
    return state;
}

export default LoginReducer;