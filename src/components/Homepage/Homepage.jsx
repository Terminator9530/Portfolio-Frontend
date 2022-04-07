import {connect} from 'react-redux';
import Skills from './Skills/Skills';

function Homepage(props){
    return(
        <div>
            <Skills />
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