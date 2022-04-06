import {connect} from 'react-redux';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddForm from './AddForm';
import EditForm from './EditForm';

function Skills(props){
    console.log(props);
    let [hiddenForm,setHiddenForm] = useState(undefined);

    function handleSkillDelete(e){
        let id = e.target.parentElement.id.split(" ")[1];

        axios.post('http://localhost:4000/skills/delete',{id : id})
        .then(function(response){
            if(response.data.status == 200){
                props.syncSkillsArray();
            }
        })
        .catch(function(error){
            console.log(error);
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
            {
                hiddenForm ? <EditForm hiddenForm = {hiddenForm} showAddForm = {showAddForm} /> : <AddForm />
            }
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
            axios.get('http://localhost:4000/skills')
            .then(function (response) {
                let skills = response.data;
                let results = [];
                skills.forEach(skill => {
                    results.push({name : skill.name,rating : skill.rating,id : skill._id});
                });
                dispatch({type : "SYNC_SKILLS_ARRAY",skills : results});
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        changeLoadingState : ()=>{
            dispatch({type : "CHANGE_LOADING_STATE"});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Skills);