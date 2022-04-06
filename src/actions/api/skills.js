import axios from 'axios';

function getSkillsAPI(){
    return axios.get('http://localhost:4000/skills')
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
    return axios.post('http://localhost:4000/skills/update',formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function addSkillsAPI(formData){
    return axios.post('http://localhost:4000/skills/add',formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

function deleteSkillsAPI(id){
    return axios.post('http://localhost:4000/skills/delete',{id : id})
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getSkillsAPI,updateSkillsAPI,addSkillsAPI,deleteSkillsAPI};