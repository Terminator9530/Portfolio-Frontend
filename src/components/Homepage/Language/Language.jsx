import {connect} from 'react-redux';
import { getLanguagesAPI } from '../../../actions/api/languages';
import {useEffect} from 'react';
import Progress from './Progress';

function Languages(props){

    useEffect(()=>{
        props.syncLanguagesArray();
    },[]);

    return (
        <div>
            <p className='homepage-sub-section-header' style={{"margin":"10px 20%"}}>Languages</p>
            {
                props.LanguageReducer.languages.map((language,index)=>{
                    return (
                        <div className='skill'>
                            <center><span>{language.name}</span></center>
                            <Progress rating={language.rating} /> 
                        </div>        
                    )
                })
            }
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
        syncLanguagesArray : ()=>{
            Promise.resolve(getLanguagesAPI()).then((response)=>{
                dispatch({type : "SYNC_LANGUAGES_ARRAY",languages : response});
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Languages);