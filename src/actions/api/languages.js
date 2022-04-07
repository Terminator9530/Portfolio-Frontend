import axios from 'axios';

function getLanguagesAPI(){
    return axios.get('http://localhost:4000/languages')
    .then(function (response) {
        let languages = response.data;
        let results = [];
        languages.forEach(language => {
            results.push({name : language.name,rating : language.rating,id : language._id});
        });
        return results;
    })
    .catch(function (error) {
        console.log(error);
    });
};

function updateLanguagesAPI(formData){
    return axios.post('http://localhost:4000/languages/update',formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function addLanguagesAPI(formData){
    return axios.post('http://localhost:4000/languages/add',formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function deleteLanguagesAPI(id){
    return axios.post('http://localhost:4000/languages/delete',{id : id})
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getLanguagesAPI,updateLanguagesAPI,addLanguagesAPI,deleteLanguagesAPI};