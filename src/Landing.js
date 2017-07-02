import React, { Component } from 'react';
import dogOne from './images/DogOne.jpg';
import dogTwo from './images/DogTwo.jpg';
import dogThree from './images/DogThree.jpg';
import dogFour from './images/DogFour.jpg';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animal: {}
        }
        this.imageLink = this.imageLink.bind(this);
    }

    imageLink(event) {
        var num;
        event.target.dataset.animal === "0" ?
        num = 0 :
        event.target.dataset.animal === "1" ?
        num = 1 :
        event.target.dataset.animal === "2" ?
        num = 2 :
        num = 3
        this.setState({animal: this.props.Animals[num]}, () => {
            this.props.getDetails(this.state.animal)
        })
    }
    
    render() {
        return(
            <div className="content">
                <div className="topContainer">
                    <div className="dogImages">
                        <img onClick={this.imageLink} data-animal={0} className="dogImages__image1" src={dogOne} alt=""/>
                        <img onClick={this.imageLink} data-animal={1} className="dogImages__image2" src={dogTwo} alt=""/>
                        <img onClick={this.imageLink} data-animal={2} className="dogImages__image3" src={dogThree} alt=""/>
                        <img onClick={this.imageLink} data-animal={3} className="dogImages__image4" src={dogFour} alt=""/>
                    </div>
                </div>
                <nav className="pageNavigation">
                    <button onClick={this.props.switchPage} value="List">View List of Animals</button>
                    <button onClick={this.props.switchPage} value="Add">Add New Animal</button>
                </nav>
            </div>
        )
    }
}

export default Landing;
