import {connect} from 'react-redux';
import AddOrEditContact from './AddOrEditContact';
import {useEffect, useState} from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import {getContactsAPI,deleteContactsAPI} from '../../../actions/api/contacts';

function Contacts(props){

    console.log(props);

    let [hiddenForm,setHiddenForm] = useState(undefined);

    function handleContactDelete(e){
        let id = e.target.parentElement.id.split(" ")[1];

        Promise.resolve(deleteContactsAPI(id)).then((response)=>{
            if(response.data.status === 200){
                props.syncContactsArray();
            }
        });
    }

    function showAddForm(flag){
        setHiddenForm(!flag);
    }

    function handleChipClick(e){
        let id = e.target.id.split(" ")[1];
        props.ContactReducer.contacts.forEach(contact => {
            if(contact.id === id){
                setHiddenForm(contact);
                return;
            }
        });
    }

    useEffect(()=>{
        props.syncContactsArray();
    },[props.ContactReducer.loading]);

    return (
        <div className = "skills-container box-shadow">
            <p className="section-heading">Contacts</p>
            <AddOrEditContact hiddenForm = {hiddenForm} showAddForm = {showAddForm} />
            <Stack className = "container" justifyContent="center" alignItems="center" direction = {{ xs: 'column', sm: 'row' }} spacing={1}>
            {
                props.ContactReducer.contacts.map((contact,index)=>{
                    return (
                        <Chip 
                            label={contact.name} 
                            deleteIcon={<DeleteIcon id={"deleteIcon " + contact.id} />} 
                            onDelete={handleContactDelete} 
                            onClick = {handleChipClick}
                            id = {"chip " + contact.id}
                            key = {contact.id}
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
        syncContactsArray : ()=>{
            Promise.resolve(getContactsAPI()).then((response)=>{
                dispatch({type : "SYNC_CONTACTS_ARRAY",contacts : response});
            });
        },
        changeLoadingState : ()=>{
            dispatch({type : "CHANGE_LOADING_STATE"});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Contacts);