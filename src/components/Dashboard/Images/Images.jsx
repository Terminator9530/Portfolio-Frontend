import {connect} from 'react-redux';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import {useState} from 'react';
import { uploadImage } from '../../../actions/api/imageUpload';

const Input = styled('input')({
    display: 'none',
  });

function Images(props){

    let [bannerSrc,setBannerSrc] = useState("");
    let [profilePicSrc,setProfilePicSrc] = useState("");
    
    function handleFileSelected(e){
    
        let target = e.target;
        let imageFile = target.files[0];
        let urlObj = URL.createObjectURL(imageFile);
        let id = target.id;
        if(id === "banner-upload-button"){
            uploadImage(urlObj);
            setBannerSrc(urlObj);
        }
        else{
            setProfilePicSrc(urlObj);
        }
    }

    return (
        <div className = "skills-container box-shadow">
            <p className="section-heading">Images</p>
            <div>
                <h3>Banner Upload</h3>
                <label htmlFor="banner-upload-button">
                    <Input accept="image/*" id="banner-upload-button" type="file" onChange={handleFileSelected} />
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                {bannerSrc !== "" ? <img src={bannerSrc} width="200" height="200" /> : ""}
            </div>
            <div>
                <h3>Profile Pic Upload</h3>
                <label htmlFor="profilePic-upload-button">
                    <Input accept="image/*" id="profilePic-upload-button" type="file" onChange={handleFileSelected} />
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                {profilePicSrc !== "" ? <img src={profilePicSrc} width="200" height="200" /> : ""}
            </div>
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

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Images);