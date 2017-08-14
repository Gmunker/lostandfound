import React, { Component } from 'react';
import { connect } from 'react-redux';
import regions from './geojson.json';
import { animalInfo } from '../actions/animalActions';
const baseUrl = 'https://raw.githubusercontent.com/m-madden/lostandfound/master/';

var marker

class AddGmap extends Component {
    constructor(props) {
    super(props);
		this.placeMarkerAndPanTo = this.placeMarkerAndPanTo.bind(this)
    this.findRegion = this.findRegion.bind(this)
  }

	// Update the existing marker when status or type is changed
	updateMarker(latLng, map) {
		// clear all markers
		// marker.setMap(null);
	}

	placeMarkerAndPanTo(latLng, map) {
    if(marker !== undefined) {
      marker.setMap(null)
    }
		marker = new this.props.google.maps.Marker({
		position: latLng,
		map,
		icon: baseUrl + this.props.newAnimal.Status + this.props.newAnimal.Type + "Icon.png"
		});
    map.panTo(latLng);
    let regionName = this.findRegion(latLng);
    let location = {
      lat: latLng.lat(),
      lng: latLng.lng(),
      region: regionName
    }
    this.props.dispatch(animalInfo({
      ...this.props.newAnimal,
      location
    }))
  }
  
  findRegion(latLng) {
    var regionName;
    for(var i=0; i<regions.length;i++) {
      var currentPoly = new this.props.google.maps.Polygon({paths: regions[i].polygon});
      if(this.props.google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
        regionName = regions[i].name;
      }
    }
    if(regionName) {
      
    } else {
      regionName = "Outside defined area"
    }
    return regionName
  }
	
	componentWillReceiveProps(props) {
		let map = props.map
		map.addListener('click', function(e) {
    	this.findRegion(e.latLng);
			this.placeMarkerAndPanTo(e.latLng, map);
		}.bind(this));
	}
  
  render() {
    return (
      <div className="mapContainer" onClick={this.placeMarkerAndPanTo}>
        <div id="map"></div>
      </div>
    )
  }
}

export default connect(state => {
    return {
        newAnimal: state.animal
    }
})(AddGmap);