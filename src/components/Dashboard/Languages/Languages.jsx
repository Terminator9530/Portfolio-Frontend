import {connect} from 'react-redux';
import AddOrEditLanguage from './AddOrEditLanguage';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import {getLanguagesAPI,deleteLanguagesAPI} from '../../../actions/api/languages';

function Languages(props){

    let [hiddenForm,setHiddenForm] = useState(undefined);

    function handleLanguageDelete(e){
        let id = e.target.parentElement.id.split(" ")[1];

        Promise.resolve(deleteLanguagesAPI(id)).then((response)=>{
            if(response.data.status === 200){
                props.syncLanguagesArray();
            }
        });
    }

    function showAddForm(flag){
        setHiddenForm(!flag);
    }

    function handleChipClick(e){
        let id = e.target.id.split(" ")[1];
        props.LanguageReducer.languages.forEach(language => {
            if(language.id === id){
                setHiddenForm(language);
                return;
            }
        });
    }

    useEffect(()=>{
        props.syncLanguagesArray();
    },[props.LanguageReducer.loading]);

    return (
        <div className = "skills-container box-shadow">
            <p className="section-heading">Languages</p>
            <AddOrEditLanguage hiddenForm = {hiddenForm} showAddForm = {showAddForm} />
            <Stack className = "container" justifyContent="center" alignItems="center" direction = {{ xs: 'column', sm: 'row' }} spacing={1}>
            {
                props.LanguageReducer.languages.map((language,index)=>{
                    return (
                        <Chip 
                            avatar={<Avatar>{language.rating}</Avatar>} 
                            label={language.name} 
                            deleteIcon={<DeleteIcon id={"deleteIcon " + language.id} />} 
                            onDelete={handleLanguageDelete} 
                            onClick = {handleChipClick}
                            id = {"chip " + language.id}
                            key = {language.id}
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
        syncLanguagesArray : ()=>{
            Promise.resolve(getLanguagesAPI()).then((response)=>{
                dispatch({type : "SYNC_LANGUAGES_ARRAY",languages : response});
            });
        },
        changeLoadingState : ()=>{
            dispatch({type : "CHANGE_LOADING_STATE"});
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Languages);