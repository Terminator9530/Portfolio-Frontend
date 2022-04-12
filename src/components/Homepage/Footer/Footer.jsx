import { useEffect } from 'react';
import {connect} from 'react-redux';
import {getContactsAPI} from '../../../actions/api/contacts';
import Grid from '@mui/material/Grid';

function Footer(props){

    useEffect(()=>{
        props.syncContactsArray();
    },[]);

    console.log(props.ContactReducer.contacts);

    function getIcon(name){
        if(name === "twitter"){
            return "twitter-square";
        }
        else if(name === "facebook"){
            return "facebook-square";
        }
        else if(name === "linkedin"){
            return "linkedin"
        }
        else if(name === "instagram"){
            return "instagram";
        }
        else if(name === "github"){
            return "github-square";
        }
        else if(name === "gmail"){
            return "google";
        }
        else{
            return "link";
        }
    }

    return (
        <footer id="contact">
            <center><p className='homepage-section-header' style={{"color":"white"}}>Contact</p></center>
            <hr style={{"width":"70%","borderColor":"rgba(213,218,218,.267)"}}></hr>
            <div className="social">
            <Grid container spacing={2}>
                {
                    props.ContactReducer.contacts.map((contact,index) => {
                        let nameLowerCase = contact.name.toLowerCase();
                        let icon = getIcon(nameLowerCase);
                        return (
                            <Grid style = {index % 2 == 1 ? {"textAlign" : "end"} : {}} item xs={6}>
                                <span className='contactLink'>
                                    <i className={`fa fa-${icon}`}></i>
                                    <a href={contact.link}>{contact.name}</a>
                                </span>
                            </Grid>
                        )
                    })
                }
            </Grid>
            </div>
            <hr style={{"width":"70%","borderColor":"rgba(213,218,218,.267)"}}></hr>
            <center><p style={{"color":"#cfcbcb","marginTop":"130px"}}>Copyright © {props.ProfileReducer.profile.name} 2020</p></center>
        </footer>
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
        syncContactsArray : ()=>{
            Promise.resolve(getContactsAPI()).then((response)=>{
                dispatch({type : "SYNC_CONTACTS_ARRAY",contacts : response});
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Footer);