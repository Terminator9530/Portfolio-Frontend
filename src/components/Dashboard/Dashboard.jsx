import {connect} from 'react-redux';
import Skills from './Skills/Skills.jsx';
import Languages from './Languages/Languages.jsx';
import Contacts from './Contacts/Contacts.jsx';
import Profile from './Profile/Profile.jsx';
import { Container } from '@mui/material';
import "./Dashboard.css";

function Dashboard(props){
    return (
        <Container>
            <Skills />
            <Languages />
            <Contacts />
            <Profile />
        </Container>
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

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);