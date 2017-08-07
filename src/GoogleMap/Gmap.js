import React, { Component } from 'react';
import regions from './geojson.json';

const google = window.google;

let Donelson = {
      lat: 36.170295,
      lng: -86.674846
    }

class Gmap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      markers: [{
          position: {
              lat: 36.1571445511326,
              lng: -86.67903900146484
          },
          key: 'Spot',
          defaultAnimation: 2
      }]
    }
  }
<<<<<<< HEAD

  componentDidMount() {  

=======

  componentDidMount() {
>>>>>>> 5c7c9a8dca560c7dce24e94a46609ca7cdeaaf63
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: Donelson
    });

<<<<<<< HEAD
=======
    // Comment out the three lines below to test functionality
    // var outerCoords0 = regions[0].polygon;
    // var outerCoords1 = regions[1].polygon;
    // map.data.add({geometry: new google.maps.Data.Polygon([outerCoords0, outerCoords1])})

>>>>>>> 5c7c9a8dca560c7dce24e94a46609ca7cdeaaf63
    let markers = this.state.markers.map(loc => {
      return new google.maps.Marker({
        position: loc.position,
        map: map
      })
<<<<<<< HEAD
    })

    map.addListener('click', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
    });

    function placeMarkerAndPanTo(latLng, map) {
=======
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
>>>>>>> 5c7c9a8dca560c7dce24e94a46609ca7cdeaaf63
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);
<<<<<<< HEAD
=======
      console.log(name);
>>>>>>> 5c7c9a8dca560c7dce24e94a46609ca7cdeaaf63
    }
  }
  
  render() {
    return (
      <div>
        <div 
          id="map" 
          style={{height: "100vh", width: "100vw"}}
        ></div>        
      </div>
    )
  }
}

export default Gmap;