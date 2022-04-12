import {connect} from 'react-redux';
import { getSkillsAPI } from '../../../actions/api/skills';
import {useEffect} from 'react';
import Progress from './Progress';

function Skills(props){

    useEffect(()=>{
        props.syncSkillsArray();
    },[]);

    return (
        <div>
            <p className='homepage-sub-section-header' style={{"margin":"10px 20%"}}>Coding</p>
            {
                props.SkillReducer.skills.map((skill,index)=>{
                    return (
                        <div className='skill'>
                            <center><span>{skill.name}</span></center>
                            <Progress rating={skill.rating} /> 
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
        syncSkillsArray : ()=>{
            Promise.resolve(getSkillsAPI()).then((response)=>{
                dispatch({type : "SYNC_SKILLS_ARRAY",skills : response});
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Skills);