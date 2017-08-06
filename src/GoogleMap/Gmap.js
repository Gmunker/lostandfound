import React, { Component } from 'react';

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

  componentDidMount() {  

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: Donelson
    });

    let markers = this.state.markers.map(loc => {
      return new google.maps.Marker({
        position: loc.position,
        map: map
      })
    });

    map.addListener('click', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
      console.log(e.latLng.lat())
      console.log(e.latLng.lng())
    });

    function placeMarkerAndPanTo(latLng, map) {
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
        <div 
          id="map" 
          style={{height: "100vh", width: "100vw"}}
        ></div>        
      </div>
    )
  }
}

export default Gmap;