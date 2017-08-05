import React, { Component } from 'react';

const google = window.google;


  

class Gmap extends Component {

  componentDidMount() {
    let Donelson = {
      lat: 36.170295,
      lng: -86.674846
    };
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: Donelson
    });
  }

  handleClick(event) {
    event.persist()
    // let marker = new google.maps.Marker({
    //   position: {
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng()
    //   }
    // })
    console.log(event)
  }
  
  render() {
    console.log(this.map)
    return (
      <div>
        <div 
          id="map" 
          style={{height: "100vh", width: "100vw"}}
          onClick={this.handleClick.bind(this)}
        ></div>        
      </div>
    )
  }
}

export default Gmap;