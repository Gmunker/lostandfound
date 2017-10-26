import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import EventList from './EventList';
import AboutAnimal from './AboutAnimal';
import Gallery from '../ImageElements/Gallery';
import { connect } from 'react-redux';

class DetailContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="detail">
                <AboutAnimal animalProps={this.props.Props.animal}/>
                <Gallery animalProps={this.props.Props.animal}/>
                <div className="mapRow">
                    <div ref={this.props.Props.map} id="map" style={{height: "250px", width:"100%"}}></div> 
                </div>
                <EventList handleClick={this.props.Props.handleClick} animalHistory={this.props.Props.animal.history} activeRegion={this.props.Props.activeRegion} activeIndex={this.props.Props.activeIndex}/>
                {
                this.props.user.uid !== undefined ?
                <Link className="formButton" to={this.props.Props.animal.type === "dog" ? `/dog/update/${this.props.Props.animal.id}` : `/cat/update/${this.props.Props.animal.id}`}>Update</Link> :
                null
                }
            </div>
        )
    }
}

export default connect(state => {
	return {
		user: state.user
	}
})(DetailContent);