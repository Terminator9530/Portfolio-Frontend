import {connect} from 'react-redux';
import {getProfileAPI} from '../../../actions/api/profile';
import {useEffect} from 'react';

function Profile(props){
    console.log(props);

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    useEffect(()=>{
        props.syncProfileArray();
    },[]);

    let profile = props.ProfileReducer.profile;

    return(
        <section id="info">
            <center><p className='homepage-section-header'>Profile</p></center>
            <hr className='customHR' />
            <div>
                <img src="Profile.jpeg" className='profilePic' />
                <p className='homepage-sub-section-header'>Bio</p>
                <p className='homepage-sub-section-content'>
                    <span><b>Name : </b></span>
                    <span>{profile.name}</span>
                </p>
                <p className='homepage-sub-section-content'>
                    <span><b>Age : </b></span>
                    <span>{getAge(profile.dob)}</span>
                </p>
                <p className='homepage-sub-section-content'>
                    <span><b>Location : </b></span>
                    <span>{profile.location}</span>
                </p>
                <p className='homepage-sub-section-content'>
                    <span><b>Designation : </b></span>
                    <span>{profile.designation}</span>
                </p>
                <p className='homepage-sub-section-content'>
                    <span><b>Branch : </b></span>
                    <span>{profile.branch}</span>
                </p>
                <p className='homepage-sub-section-content'>
                    <span><b>College : </b></span>
                    <span>{profile.college}</span>
                </p>
            </div>
            <hr className='customHR' />
            <div>
                <p className='homepage-sub-section-header'>About Me</p>
                <p className='homepage-sub-section-content'>I am a full stack web developer. I basically like to work in a team. I have made many projects and the link for my github account is in contact section. Currently I am pursuing BTech from Pranveer Singh Institute of Technology. Currently I am learning Unity 3D for Game Development which I am learning for my final year project. I also like playing games like Counter Strike Global Offensive, Pubg and many more. I likes cars very much.</p>
            </div>
        </section>
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
        syncProfileArray : ()=>{
            Promise.resolve(getProfileAPI()).then((response)=>{
                dispatch({type : "SYNC_PROFILE_ARRAY",profile : response});
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);