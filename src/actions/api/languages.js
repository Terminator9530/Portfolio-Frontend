import axios from 'axios';

let apiUrl = process.env.REACT_APP_BACKEND_API_URL;

function getLanguagesAPI(){
    return axios.get(`${apiUrl}/languages`)
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
    return axios.post(`${apiUrl}/languages/update`,formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function addLanguagesAPI(formData){
    return axios.post(`${apiUrl}/languages/add`,formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function deleteLanguagesAPI(id){
    return axios.post(`${apiUrl}/languages/delete`,{id : id})
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getLanguagesAPI,updateLanguagesAPI,addLanguagesAPI,deleteLanguagesAPI};