var axios = require('axios');

function uploadImage(image){

    var form = new FormData();
    form.append("image", image);

    var config = {
        url: `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMBB_API_KEY}`,
        method: "POST",
        mimeType: "multipart/form-data",
        headers: {
            'Access-Control-Allow-Origin': ['https://api.imgbb.com/'],
            'Access-Control-Allow-Credentials' : true,
            "Access-Control-Allow-Headers": "*"
        },
        data: form
      };

    return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

export {uploadImage};