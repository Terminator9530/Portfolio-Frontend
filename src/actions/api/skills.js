import axios from 'axios';

let apiUrl = process.env.REACT_APP_BACKEND_API_URL;

function getSkillsAPI(){
    return axios.get(`${apiUrl}/skills`)
    .then(function (response) {
        let skills = response.data;
        let results = [];
        skills.forEach(skill => {
            results.push({name : skill.name,rating : skill.rating,id : skill._id});
        });
        return results;
    })
    .catch(function (error) {
        console.log(error);
    });
};

function updateSkillsAPI(formData){
    return axios.post(`${apiUrl}/skills/update`,formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function addSkillsAPI(formData){
    return axios.post(`${apiUrl}/skills/add`,formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function deleteSkillsAPI(id){
    return axios.post(`${apiUrl}/skills/delete`,{id : id})
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getSkillsAPI,updateSkillsAPI,addSkillsAPI,deleteSkillsAPI};