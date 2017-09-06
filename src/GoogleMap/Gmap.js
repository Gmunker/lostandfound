import React, { Component } from 'react';
import { connect } from 'react-redux';


const baseUrl = 'https://raw.githubusercontent.com/m-madden/lostandfound/master/';

// This is the guide for all of it. 


class Gmap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      googleLoaded: false,
      googleMap: {}
    }
  }

  componentDidUpdate() {

    let mapData = this.props.mapData

    if (window.google.maps) {

    let map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: {
        lat: 36.170295,
        lng: -86.674846
      }
    });

    let markers = mapData.dummyData.map(animal => {
        animal.Location.position.map((position, index) => {
          return new window.google.maps.Marker({
            position: position,
            map: map,
            // icon: pullIcon(animal, index)
          })
        })
      });

      map.addListener('click', function(e) {
        findRegion(e.latLng);
        placeMarkerAndPanTo(e.latLng, map);
        
      });

      function findRegion(latLng) {
        let regionName;
        for(let i=0; i<mapData.geoJson.length;i++) {
          let currentPoly = new window.google.maps.Polygon({paths: mapData.geoJson[i].polygon});
          if(window.google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
            regionName = mapData.geoJson[i].name;
          }
        }
        if(regionName) {
          console.log(regionName);
        } else {
          console.log("Outside defined regions");
        }
      }

      function placeMarkerAndPanTo(latLng, map) {
        let marker = new window.google.maps.Marker({
          position: latLng,
          map,
        });
        map.panTo(latLng);
      }
    }
    

      function pullIcon(animal, index) {
        let status = animal.Status[index] === "Found" ? "found" : "lost";
        let type = animal.Type === "Cat" ? "Cat" : "Dog";
        return  baseUrl + status + type + "Icon.png"
      }
  }
  
  render() {
    return (

      <div className="mapContainer">
        {window.google ? <div ref="map" id="map" style={{height: "100vh", width:"100vw"}}></div> : <h1>Loading...</h1>}
      </div>
    )
  }
}

export default connect(state => {
  return {
    mapData: state.mapData
  }
})(Gmap);