import {useEffect, useState} from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import {connect} from 'react-redux';
import {updateProfileAPI} from '../../../actions/api/profile';
import { Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

function AddOrEditProfile(props){

    let loading = props.ProfileReducer.loading;
    let [nameTextField,setNameTextField] = useState("");
    let [locationTextField,setLocationTextField] = useState("");
    let [collegeTextField,setCollegeTextField] = useState("");
    let [branchTextField,setBranchTextField] = useState("");
    let [aboutTextField,setAboutTextField] = useState("");
    let [designationTextField,setDesignationTextField] = useState("");
    let [dobDatePicker,setDOBDatePicker] = useState(new Date());
    let [saveStatus,setSaveStatus] = useState("normal");

    useEffect(()=>{
        if(props.ProfileReducer.profile.id){
            setNameTextField(props.ProfileReducer.profile.name);
            setLocationTextField(props.ProfileReducer.profile.location);
            setCollegeTextField(props.ProfileReducer.profile.college);
            setBranchTextField(props.ProfileReducer.profile.branch);
            setDesignationTextField(props.ProfileReducer.profile.designation);
            setAboutTextField(props.ProfileReducer.profile.about);
            setDOBDatePicker(props.ProfileReducer.profile.dob);
            console.log("changed");
        }
    },[props.ProfileReducer.profile])

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
            name : data.get("dashboard-profile-name"),
            location : data.get("dashboard-profile-location"),
            designation : data.get("dashboard-profile-designation"),
            college : data.get("dashboard-profile-college"),
            branch : data.get("dashboard-profile-branch"),
            about : data.get("dashboard-profile-about"),
            dob : dobDatePicker,
            id : props.ProfileReducer.profile.id
        };
        Promise.resolve(updateProfileAPI(formData)).then((response)=>{
            setLoading(false);
            simulateDoneButton(response.status === 200 ? "success" : "error");
            setNameTextField("");
            setLocationTextField("");
            setCollegeTextField("");
            setBranchTextField("");
            setDesignationTextField("");
            setAboutTextField("");
        });
    }

    function handleNameChange(e){
        setNameTextField(e.target.value);
    }

    function handleLocationChange(e){
        setLocationTextField(e.target.value);
    }
    
    function handleDesignationChange(e){
        setDesignationTextField(e.target.value);
    }

    function handleBranchChange(e){
        setBranchTextField(e.target.value);
    }

    function handleCollegeChange(e){
        setCollegeTextField(e.target.value);
    }

    function handleAboutChange(e){
        setAboutTextField(e.target.value);
    }

    function handleDOBChange(date){
        console.log(date);
        setDOBDatePicker(date);
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
            <h3>Edit Form</h3>
            <TextField fullWidth margin="dense" name="dashboard-profile-name" label="Name" variant="outlined" value = {nameTextField} onChange = {handleNameChange} />
            <TextField fullWidth margin="dense" name="dashboard-profile-location" label="Location" variant="outlined" value = {locationTextField} onChange = {handleLocationChange} />
            <TextField fullWidth margin="dense" name="dashboard-profile-designation" label="Designation" variant="outlined" value = {designationTextField} onChange = {handleDesignationChange} />
            <TextField fullWidth margin="dense" name="dashboard-profile-college" label="College" variant="outlined" value = {collegeTextField} onChange = {handleCollegeChange} />
            <TextField fullWidth margin="dense" name="dashboard-profile-branch" label="Branch" variant="outlined" value = {branchTextField} onChange = {handleBranchChange} />
            <TextField
                    name="dashboard-profile-about"
                    label="About Me"
                    multiline
                    fullWidth
                    margin="dense"
                    maxRows={4}
                    value={aboutTextField}
                    onChange={handleAboutChange}
                    variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker 
                    label="Date of Birth"
                    inputFormat="yyyy/MM/dd"
                    value={dobDatePicker}
                    onChange={handleDOBChange}
                    renderInput={(params) => <TextField margin='dense' {...params} />}
                />
            </LocalizationProvider>
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

export default connect(mapStateToProps,mapDispatchToProps)(AddOrEditProfile);