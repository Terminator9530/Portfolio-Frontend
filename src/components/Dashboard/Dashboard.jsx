import {connect} from 'react-redux';
import Skills from './Skills/Skills.jsx';
import Languages from './Languages/Languages.jsx';
import { Container } from '@mui/material';
import "./Dashboard.css";

function Dashboard(props){
    return (
        <Container>
            <Skills />
            <Languages />
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