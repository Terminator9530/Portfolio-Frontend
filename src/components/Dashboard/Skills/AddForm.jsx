import {connect} from 'react-redux';
import {useState} from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import {addSkillsAPI} from '../../../actions/api/skills';

function AddForm(props){

    let loading = props.SkillReducer.loading;
    let [nameTextField,setNameTextField] = useState("");
    let [ratingTextField,setRatingTextField] = useState("");
    let [saveStatus,setSaveStatus] = useState("normal");

    function setLoading(){
        props.changeLoadingState();
    }

    function simulateDoneButton(status){
        setSaveStatus(status);
        setTimeout(()=>{
            setSaveStatus("normal");
        },2000);
    }

    function handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setLoading(true);
        let formData = {
            name : data.get("dashboard-skill-name"),
            rating : data.get("dashboard-skill-rating")
        };
        Promise.resolve(addSkillsAPI(formData)).then((response)=>{
            setLoading(false);
            simulateDoneButton(response.status === 200 ? "success" : "error");
            setNameTextField("");
            setRatingTextField("");
        });
    }

    function handleNameChange(e){
        setNameTextField(e.target.value);
    }

    function handleRatingChange(e){
        setRatingTextField(e.target.value);
    }

    function findButtonColor(){
        if(saveStatus === "success"){
            return "success";
        }
        else if(saveStatus === "error"){
            return "error";
        }
        else{
            return "secondary";
        }
    }

    function findButtonIcon(){
        if(saveStatus === "success"){
            return <DoneIcon />;
        }
        else if(saveStatus === "error"){
            return <CloseIcon />;
        }
        else{
            return <SaveIcon />;
        }
    }

    return (
        <Box component="form" onSubmit = {handleSubmit}>
            <TextField name="dashboard-skill-name" label="Skill Name" variant="outlined" margin="dense" value = {nameTextField} onChange = {handleNameChange} />
            <TextField name="dashboard-skill-rating" label="Skill Rating" variant="outlined" margin="dense" value = {ratingTextField} onChange = {handleRatingChange} />
            <br />
            <LoadingButton
                size="small"
                color={findButtonColor()}
                type="submit"
                loading={loading}
                loadingPosition="start"
                startIcon={findButtonIcon()}
                variant="contained"
            >
                Save
            </LoadingButton>
        </Box>
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
        changeLoadingState : ()=>{
            dispatch({type : "CHANGE_LOADING_STATE"});
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddForm);