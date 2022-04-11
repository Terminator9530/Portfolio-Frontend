import axios from 'axios';

function getContactsAPI(){
    return axios.get('http://localhost:4000/contacts')
    .then(function (response) {
        let contacts = response.data;
        let results = [];
        contacts.forEach(contact => {
            results.push({name : contact.name,link : contact.link,id : contact._id});
        });
        return results;
    })
    .catch(function (error) {
        console.log(error);
    });
};

function updateContactsAPI(formData){
    return axios.post('http://localhost:4000/contacts/update',formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function addContactsAPI(formData){
    return axios.post('http://localhost:4000/contacts/add',formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function deleteContactsAPI(id){
    return axios.post('http://localhost:4000/contacts/delete',{id : id})
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getContactsAPI,updateContactsAPI,addContactsAPI,deleteContactsAPI};