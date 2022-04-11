const initState = {
    contacts : [],
    loading : false
};

function ContactReducer(state = initState,action){

    if(action.type === "SYNC_CONTACTS_ARRAY"){

        return {
            ...state,
            contacts : action.contacts
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

export default ContactReducer;