import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dogOne from './images/DogOne.jpg';
import dogTwo from './images/DogTwo.jpg';
import dogThree from './images/DogThree.jpg';
import dogFour from './images/DogFour.jpg';
import logo from './images/logo.jpg';

class Landing extends Component {
    
    render() {
        return(
            <div className="landingContent">
                <div className="topContainer">
                    <img className="logo" src={logo} alt=""/>
                    <div className="dogImages">
                        <Link className="dogImages__image1" to="/detail" onClick={() => {this.props.getDetails(this.props.Animals[0])}}>
                            <img className="dogImages__image1" src={dogOne} alt=""/>
                        </Link>
                        <Link className="dogImages__image2" to="/detail" onClick={() => {this.props.getDetails(this.props.Animals[1])}}>
                            <img className="dogImages__image2" src={dogTwo} alt=""/>
                        </Link>
                        <Link className="dogImages__image3" to="/detail" onClick={() => {this.props.getDetails(this.props.Animals[2])}}>
                            <img className="dogImages__image3" src={dogThree} alt=""/>
                        </Link>
                        <Link className="dogImages__image4" to="/detail" onClick={() => {this.props.getDetails(this.props.Animals[3])}}>
                            <img className="dogImages__image4" src={dogFour} alt=""/>
                        </Link>
                    </div>
                </div>
                <nav className="pageNavigation">
                    <Link className="Button" to="/list">View Full List</Link>
                    <Link className="Button" to="/add">Add New Animal</Link>
                </nav>
            </div>
        )
    }
}

export default Landing;
