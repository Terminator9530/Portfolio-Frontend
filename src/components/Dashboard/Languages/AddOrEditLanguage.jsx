import {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {connect} from 'react-redux';
import {updateLanguagesAPI,addLanguagesAPI} from '../../../actions/api/languages';
import { Stack } from '@mui/material';

function AddOrEditLanguage(props){

    let loading = props.LanguageReducer.loading;
    let [nameTextField,setNameTextField] = useState(props.hiddenForm ? props.hiddenForm.name : "");
    let [ratingTextField,setRatingTextField] = useState(props.hiddenForm ? props.hiddenForm.rating : "");
    let [saveStatus,setSaveStatus] = useState("normal");

    useEffect(()=>{
        if(props.hiddenForm){
            setNameTextField(props.hiddenForm.name);
            setRatingTextField(props.hiddenForm.rating);
        } else {
            setNameTextField("");
            setRatingTextField("");
        }
    },[props.hiddenForm]);

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
        if(props.hiddenForm){
            let formData = {
                name : data.get("dashboard-language-name"),
                rating : data.get("dashboard-language-rating"),
                id : data.get("dashboard-language-id")
            };
            Promise.resolve(updateLanguagesAPI(formData)).then((response)=>{
                setLoading(false);
                simulateDoneButton(response.status === 200 ? "success" : "error");
                setNameTextField("");
                setRatingTextField("");
            });
        } else {
            let formData = {
                name : data.get("dashboard-language-name"),
                rating : data.get("dashboard-language-rating")
            };
            Promise.resolve(addLanguagesAPI(formData)).then((response)=>{
                setLoading(false);
                simulateDoneButton(response.status === 200 ? "success" : "error");
                setNameTextField("");
                setRatingTextField("");
            });
        }
    }

    function handleNameChange(e){
        setNameTextField(e.target.value);
    }

    function handleRatingChange(e){
        setRatingTextField(e.target.value);
    }

    function showAddForm(){
        props.showAddForm(true);
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
        <Box component="form" onSubmit = {handleSubmit} className = "container">
            {props.hiddenForm ? <h3>Edit Form</h3> : <h3>Add Form</h3>}
            <Stack justifyContent="center" alignItems="center" direction = {{ xs: 'column', sm: 'row' }} spacing={1}>
                <TextField name="dashboard-language-name" label="Language Name" variant="outlined" value = {nameTextField} onChange = {handleNameChange} />
                <TextField name="dashboard-language-rating" label="Language Rating" variant="outlined" value = {ratingTextField} onChange = {handleRatingChange} />
                {props.hiddenForm ? <input type="hidden" name="dashboard-language-id" value = {props.hiddenForm.id} /> : ""}
            </Stack>
            <br />
            <Stack justifyContent="center" alignItems="center" direction = {{ xs: 'column', sm: 'row' }} spacing={1}>
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
                {props.hiddenForm ? <Button variant="contained" size="small" onClick = {showAddForm}>
                    Add Form
                </Button> : ""}
            </Stack>

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

export default connect(mapStateToProps,mapDispatchToProps)(AddOrEditLanguage);