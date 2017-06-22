import React from 'react';
import dogOne from './images/DogOne.jpg';
import dogTwo from './images/DogTwo.jpg';
import dogThree from './images/DogThree.jpg';
import dogFour from './images/DogFour.jpg';

const Landing = (props) => {
    return(
        <div className="topContainer">
            <div className="topContainer__dogImages">
                <img className="topContainer__dogImages__imgage1" src={dogOne} alt=""/>
                <img className="topContainer__dogImages__imgage2" src={dogTwo} alt=""/>
                <img className="topContainer__dogImages__imgage3" src={dogThree} alt=""/>
                <img className="topContainer__dogImages__imgage4" src={dogFour} alt=""/>
            </div>
            <button onClick={props.switchPage} value="List">List</button>
            <button onClick={props.switchPage} value="Add">Add</button>
        </div>
    )
}

export default Landing;