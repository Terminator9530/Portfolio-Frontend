import axios from 'axios';

let apiUrl = process.env.REACT_APP_BACKEND_API_URL;

function getContactsAPI(){
    return axios.get(`${apiUrl}/contacts`)
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
    return axios.post(`${apiUrl}/contacts/update`,formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function addContactsAPI(formData){
    return axios.post(`${apiUrl}/contacts/add`,formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function deleteContactsAPI(id){
    return axios.post(`${apiUrl}/contacts/delete`,{id : id})
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getContactsAPI,updateContactsAPI,addContactsAPI,deleteContactsAPI};