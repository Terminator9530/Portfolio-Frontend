import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import {connect} from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

function App(props) {
  let isLoggedIn = Cookies.get("jwt");
  return (
    <div className="App">
      <Routes>
        <Route path = "/admin" element = {isLoggedIn ? <Dashboard /> : <Login />} />
      </Routes>
    </div>
  );
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

export default connect(mapStateToProps,mapDispatchToProps)(App);