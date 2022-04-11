import {connect} from 'react-redux';
import Language from './Language/Language';
import Skills from './Skills/Skills';

function Homepage(props){
    return(
        <div className="skills-section">
            <center><p className='homepage-section-header'>Profile</p></center>
            <hr style={{"width":"70%","borderColor":"rgba(0,0,0,0.267)"}} />
            <Skills />
            <hr style={{"width":"70%","borderColor":"rgba(0,0,0,0.267)"}} />
            <Language />
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

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);