import {connect} from 'react-redux';

function Dashboard(props){
    return (
        <div>Dashboard</div>
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