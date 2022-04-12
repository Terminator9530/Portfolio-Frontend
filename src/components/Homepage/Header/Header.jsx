import {connect} from 'react-redux';

function Header(props){
    return (
        <header>
            <div style={{"position":"relative","top":"200px"}}>
                <h1 id="name">Vaibhav Shukla</h1>
                <p id="typewriter">Scroll down to explore further</p>
            </div>
        </header>
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

export default connect(mapStateToProps,mapDispatchToProps)(Header);