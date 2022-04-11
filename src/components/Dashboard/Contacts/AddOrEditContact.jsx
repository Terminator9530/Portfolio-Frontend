import {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {connect} from 'react-redux';
import {updateContactsAPI,addContactsAPI} from '../../../actions/api/contacts';
import { Stack } from '@mui/material';

function AddOrEditContact(props){

    let loading = props.ContactReducer.loading;
    let [nameTextField,setNameTextField] = useState(props.hiddenForm ? props.hiddenForm.name : "");
    let [linkTextField,setLinkTextField] = useState(props.hiddenForm ? props.hiddenForm.link : "");
    let [saveStatus,setSaveStatus] = useState("normal");

    useEffect(()=>{
        if(props.hiddenForm){
            setNameTextField(props.hiddenForm.name);
            setLinkTextField(props.hiddenForm.link);
        } else {
            setNameTextField("");
            setLinkTextField("");
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
                name : data.get("dashboard-contact-name"),
                link : data.get("dashboard-contact-link"),
                id : data.get("dashboard-contact-id")
            };
            Promise.resolve(updateContactsAPI(formData)).then((response)=>{
                setLoading(false);
                simulateDoneButton(response.status === 200 ? "success" : "error");
                setNameTextField("");
                setLinkTextField("");
            });
        } else {
            let formData = {
                name : data.get("dashboard-contact-name"),
                link : data.get("dashboard-contact-link")
            };
            Promise.resolve(addContactsAPI(formData)).then((response)=>{
                setLoading(false);
                simulateDoneButton(response.status === 200 ? "success" : "error");
                setNameTextField("");
                setLinkTextField("");
            });
        }
    }

    function handleNameChange(e){
        setNameTextField(e.target.value);
    }

    function handleLinkChange(e){
        setLinkTextField(e.target.value);
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
                <TextField name="dashboard-contact-name" label="Contact Name" variant="outlined" value = {nameTextField} onChange = {handleNameChange} />
                <TextField name="dashboard-contact-link" label="Contact Link" variant="outlined" value = {linkTextField} onChange = {handleLinkChange} />
                {props.hiddenForm ? <input type="hidden" name="dashboard-contact-id" value = {props.hiddenForm.id} /> : ""}
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

export default connect(mapStateToProps,mapDispatchToProps)(AddOrEditContact);