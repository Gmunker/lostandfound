import React, { Component } from 'react';
import regions from './geojson.json';
import scriptLoader from 'react-async-script-loader';
import DispatchAddGmap from './DispatchAddGmap';
const baseUrl = 'https://raw.githubusercontent.com/m-madden/lostandfound/master/';

let dummyData = [{
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
        },
        Type: "Dog",
        Status: ["Found"]
      },{
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
        },
        Type: "Cat",
        Status: ["Lost"]
      },{
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
        },
        Type: "Dog",
        Status: ["Lost", "Found"]
      }
    ]

class AddGmap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      googleLoaded: false,
      googleMap: {},
      dummyData: dummyData,
    }
  }


  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        let google = window.google
        
        let map = new google.maps.Map(this.refs.map, {
          zoom: 11,
          center: {
            lat: 36.170295,
            lng: -86.674846
          }
        });

      let markers = this.state.dummyData.map(animal => {
        animal.Location.position.map((position, index) => {
          return new google.maps.Marker({
            position: position,
            map: map,
            icon: pullIcon(animal, index)
          })
        })
      });

      map.addListener('click', function(e) {
        findRegion(e.latLng);
        placeMarkerAndPanTo(e.latLng, map);
      });

      function findRegion(latLng) {
        var regionName;
        for(var i=0; i<regions.length;i++) {
          var currentPoly = new google.maps.Polygon({paths: regions[i].polygon});
          if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
            regionName = regions[i].name;
          }
        }
        if(regionName) {
          map.region = regionName
        } else {
          sessionStorage.setItem('regionName', 'Outside defined regions');
        }
      }

      function placeMarkerAndPanTo(latLng, map) {
        var marker = new google.maps.Marker({
          position: latLng,
          map,
        });
        map.panTo(latLng);
      }

      function pullIcon(animal, index) {
        var status = animal.Status[index] === "Found" ? "found" : "lost";
        var type = animal.Type === "Cat" ? "Cat" : "Dog";
        return  baseUrl + status + type + "Icon.png"
      }
    }
  }
  // else this.props.onError()
  }
  
  render() {
    
    return (
      
      <div className="mapContainer">
        {}
        <div ref="map" id="map"></div>
        <DispatchAddGmap />
      </div>
    )
  }
}

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=places,geometry"])(AddGmap);