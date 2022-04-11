import axios from 'axios';

function getProfileAPI(){
    return axios.get('http://localhost:4000/profile')
    .then(function (response) {
        let profile = response.data;
        let results = {
                name : profile.name,
                location : profile.location,
                designation : profile.designation,
                branch : profile.branch,
                college : profile.college,
                about : profile.about,
                dob : profile.dob,
                id : profile._id
            };
        return results;
    })
    .catch(function (error) {
        console.log(error);
    });
};

function updateProfileAPI(formData){
    return axios.post('http://localhost:4000/profile/update',formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getProfileAPI,updateProfileAPI};