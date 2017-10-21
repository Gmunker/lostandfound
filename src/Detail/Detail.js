import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import EventList from './EventList';
import AboutAnimal from './AboutAnimal';
import Gallery from '../ImageElements/Gallery';

const DetailContent = (props) => {

    let animalProps = props.Props.animal
    let activeRegion = props.Props.activeRegion
    let activeIndex = props.Props.activeIndex
    let mapRef = props.Props.map
    let handleClick = props.Props.handleClick

    return(
        <div className="detail">
            <AboutAnimal animalProps={animalProps}/>
            <Gallery animalProps={animalProps}/>
            <div className="mapRow">
                <div ref={mapRef} id="map" style={{height: "250px", width:"100%"}}></div> 
            </div>
            <EventList handleClick={handleClick} animalHistory={animalProps.history} activeRegion={activeRegion} activeIndex={activeIndex}/>
            <Link className="formButton" to={animalProps.type === "dog" ? `/dog/update/${animalProps.id}` : `/cat/update/${animalProps.id}`}>Update</Link>
        </div>
    )
}

export default DetailContent