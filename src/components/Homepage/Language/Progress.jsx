import {connect} from 'react-redux';

function Progress(props){
    let percentage = parseInt((props.rating / 10) * 100);

    function randomColor(){
        let r = getRndInteger(100,255);
        let g = getRndInteger(100,255);
        let b = getRndInteger(100,255);
        return `rgb(${r},${g},${b})`;
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }

    return (
        <div className="progress-bar-container">
            <div className="progress-bar-fill" style = {{"backgroundColor" : randomColor(),"width" : `${percentage}%`}}>
                <center>{percentage}%</center>
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

export default connect(mapStateToProps,mapDispatchToProps)(Progress);