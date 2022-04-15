import axios from 'axios';

let apiUrl = process.env.REACT_APP_BACKEND_API_URL;

function getProfileAPI(){
    return axios.get(`${apiUrl}/profile`)
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
    return axios.post(`${apiUrl}/profile/update`,formData)
    .then(function(response){
        return response;
    })
    .catch(function(error){
        console.log(error);
    });
}

export {getProfileAPI,updateProfileAPI};