import {connect} from 'react-redux';
import { getSkillsAPI } from '../../../actions/api/skills';
import {useEffect} from 'react';
import Progress from './Progress';

function Skills(props){

    useEffect(()=>{
        props.syncSkillsArray();
    },[]);

    return (
        <div className="skills-section">
            <center><p className='homepage-section-header'>Profile</p></center>
            <hr style={{"width":"70%","borderColor":"rgba(0,0,0,0.267)"}} />
            <div>
                <p className='homepage-sub-section-header'>Coding</p>
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