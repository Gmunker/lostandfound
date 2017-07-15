import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dogOne from './images/DogOne.jpg';
import dogTwo from './images/DogTwo.jpg';
import dogThree from './images/DogThree.jpg';
import dogFour from './images/DogFour.jpg';
import logo from './images/logo.jpg';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.imageLink = this.imageLink.bind(this);
    }

    imageLink(num) {
        this.props.getDetails(this.props.Animals[num]);
    }
    
    render() {
        return(
            <div className="landingContent">
                <div className="topContainer">
                    <img className="logo" src={logo} alt=""/>
                    <div className="dogImages">
                        <div className="dogImages__image1">
                            <Link to="/detail" onClick={() => {this.imageLink(0)}}><img className="dogImages__image1" src={dogOne} alt=""/></Link>
                        </div>
                        <div className="dogImages__image2">
                            <Link to="/detail" onClick={() => {this.imageLink(1)}}><img onClick={this.imageLink} data-animal={1} className="dogImages__image2" src={dogTwo} alt=""/></Link>
                        </div>
                        <div className="dogImages__image3">
                            <Link to="/detail" onClick={() => {this.imageLink(2)}}><img onClick={this.imageLink} data-animal={2} className="dogImages__image3" src={dogThree} alt=""/></Link>
                        </div>
                        <div className="dogImages__image4">
                            <Link to="/detail" onClick={() => {this.imageLink(3)}}><img onClick={this.imageLink} data-animal={3} className="dogImages__image4" src={dogFour} alt=""/></Link>
                        </div>
                    </div>
                </div>
                <nav className="pageNavigation">
                    <Link to="/list"><button>View Full List</button></Link>
                    <Link to="/add"><button>Add New Animal</button></Link>
                </nav>
            </div>
        )
    }
}

export default Landing;
