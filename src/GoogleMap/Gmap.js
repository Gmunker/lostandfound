import React, { Component } from 'react';
import regions from './geojson.json';

const google = window.google;

let Donelson = {
      lat: 36.170295,
      lng: -86.674846
    }

let dummyData = [
  {
    Name: "Spot",
    Color: "White",
    Breed: "Great Dame",
    Date: new Date().toString(),
    Location: {
      position: [{
        lat: 36.5571445511326,
        lng: -86.17903900146484
      }],
      key: this.name,
      defaultAnimation: 2
    }
  },
  {
    Name: "Whiskers",
    Color: "Orange",
    Breed: "Evil",
    Date: new Date().toString(),
    Location: {
      position: [{
        lat: 36.0571445511326,
        lng: -86.97903900146484
      }],
      key: this.name,
      defaultAnimation: 2
    }
  },
  {
    Name: "Rusty",
    Color: "White with Black",
    Breed: "Jack Russel",
    Date: new Date().toString(),
    Location: {
      position: [{
        lat: 36.9121445511326,
        lng: -85.17903900146484
      },
      {
        lat: 36.9121445511396,
        lng: -85.77903900141484
      }],
      key: this.name,
      defaultAnimation: 2
      }
  }
]

class Gmap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animals: dummyData
    }
  }

  componentDidMount() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      center: Donelson
    });

    // Comment out the three lines below to test functionality
    // var outerCoords0 = regions[0].polygon;
    // var outerCoords1 = regions[1].polygon;
    // map.data.add({geometry: new google.maps.Data.Polygon([outerCoords0, outerCoords1])})

    let markers = this.state.animals.map(animal => {
      animal.Location.position.map(position => {
        return new google.maps.Marker({
          position: position,
          map: map
        })
      })
    });

    map.addListener('click', function(e) {
      var regionName;
      for(var i=0; i<regions.length;i++) {
        var currentPoly = new google.maps.Polygon({paths: regions[i].polygon});
        if(google.maps.geometry.poly.containsLocation(e.latLng, currentPoly)) {
          regionName = regions[i].name;
        }
      }
      if(regionName) {
        placeMarkerAndPanTo(e.latLng, map, regionName)
      } else {
        placeMarkerAndPanTo(e.latLng, map, "Outside defined regions")
      }
    });

    function placeMarkerAndPanTo(latLng, map, name) {
      console.log(name)
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);
    }
  }
  
  render() {
    return (
      <div>
        {google ? <div id="map" style={{height: "100vh", width: "100vw"}}></div> : <p>Loading...</p>}        
      </div>
    )
  }
}

export default Gmap;