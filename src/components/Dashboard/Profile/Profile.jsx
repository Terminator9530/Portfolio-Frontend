import {connect} from 'react-redux';
import AddOrEditProfile from './AddOrEditProfile';
import {useEffect} from 'react';
import {getProfileAPI} from '../../../actions/api/profile';

function Profiles(props){

    useEffect(()=>{
        props.syncProfilesArray();
    },[props.ProfileReducer.loading]);

    return (
        <div className = "skills-container box-shadow">
            <p className="section-heading">Profiles</p>
            <AddOrEditProfile />
        </div>
    )
}

function mapStateToProps(state,ownProps){
    return {
        ...state,
        ...ownProps
    }
}

function mapDispatchToProps(dispatch){
    return {
        syncProfilesArray : ()=>{
            Promise.resolve(getProfileAPI()).then((response)=>{
                dispatch({type : "SYNC_PROFILE_ARRAY",profile : response});
            });
        },
        changeLoadingState : ()=>{
            dispatch({type : "CHANGE_LOADING_STATE"});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profiles);