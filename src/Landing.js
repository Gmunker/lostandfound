import React from 'react';
import dogOne from './images/DogOne.jpg';
import dogTwo from './images/DogTwo.jpg';
import dogThree from './images/DogThree.jpg';
import dogFour from './images/DogFour.jpg';

const Landing = (props) => {
    return(
        <div className="landingContent">
            <div className="topContainer">
                <div className="dogImages">
                    <img className="dogImages__image1" src={dogOne} alt=""/>
                    <img className="dogImages__image2" src={dogTwo} alt=""/>
                    <img className="dogImages__image3" src={dogThree} alt=""/>
                    <img className="dogImages__image4" src={dogFour} alt=""/>
                </div>
            </div>
            <nav className="pageNavigation">
                <button onClick={props.switchPage} value="List">View list of Animals</button>
                <button onClick={props.switchPage} value="Add">Add New Animal</button>
            </nav>
        </div>
    )
}

export default Landing;
