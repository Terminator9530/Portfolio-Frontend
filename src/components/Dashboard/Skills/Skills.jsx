import {connect} from 'react-redux';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddOrEditForm from './AddOrEditForm';
import {getSkillsAPI,deleteSkillsAPI} from '../../../actions/api/skills';

function Skills(props){
    let [hiddenForm,setHiddenForm] = useState(undefined);

    function handleSkillDelete(e){
        let id = e.target.parentElement.id.split(" ")[1];

        Promise.resolve(deleteSkillsAPI(id)).then((response)=>{
            if(response.data.status == 200){
                props.syncSkillsArray();
            }
        });
    }

    function showAddForm(flag){
        setHiddenForm(!flag);
    }

    function handleChipClick(e){
        let id = e.target.id.split(" ")[1];
        props.SkillReducer.skills.forEach(skill => {
            if(skill.id === id){
                setHiddenForm(skill);
                return;
            }
        });
    }

    useEffect(()=>{
        props.syncSkillsArray();
    },[props.SkillReducer.loading]);

    return (
        <div className = "container">
            <AddOrEditForm hiddenForm = {hiddenForm} showAddForm = {showAddForm} />
            <Stack direction="row" spacing={1}>
            {
                props.SkillReducer.skills.map((skill,index)=>{
                    return (
                        <Chip 
                            avatar={<Avatar>{skill.rating}</Avatar>} 
                            label={skill.name} 
                            deleteIcon={<DeleteIcon id={"deleteIcon " + skill.id} />} 
                            onDelete={handleSkillDelete} 
                            onClick = {handleChipClick}
                            id = {"chip " + skill.id}
                        />           
                    )
                })
            }
            </Stack>
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
        },
        changeLoadingState : ()=>{
            dispatch({type : "CHANGE_LOADING_STATE"});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Skills);