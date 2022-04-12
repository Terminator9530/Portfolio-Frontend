import {connect} from 'react-redux';
import Language from './Language/Language';
import Skills from './Skills/Skills';
import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Profile from './Profile/Profile';

function Homepage(props){
    return(
        <div id="content" style={{"display": "block"}}>
            <img src="background.jpg" id="headerImg" />
            <Header />
            <Profile />
            <section id="skills">
                <center><p className='homepage-section-header'>Skills</p></center>
                <hr className='customHR' />
                <Skills />
                <hr className='customHR' />
                <Language />
            </section>
            <Footer />
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