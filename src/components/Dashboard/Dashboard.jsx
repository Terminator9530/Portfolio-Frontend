import {connect} from 'react-redux';
import Skills from './Skills/Skills.jsx';
import { Container } from '@mui/material';
import "./Dashboard.css";

function Dashboard(props){
    return (
        <Container>
            <Skills />
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