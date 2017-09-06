import React, { Component } from 'react';
import regions from './geojson.json';
import scriptLoader from 'react-async-script-loader'

class RegionGmap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      googleLoaded: false,
      googleMap: {}
    }
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        let google = window.google
        
        let map = new google.maps.Map(this.refs.map, {
          zoom: 12,
          center: {
            lat: 36.170295,
            lng: -86.674846
          }
        });
        
        // Comment out the three lines below to test functionality
        for(var i=0;i<regions.length;i++) {
          map.data.add({geometry: new google.maps.Data.Polygon([regions[i].polygon])})
        }
      }
    }
  }
  render() { 
    return (

      <div>
        {}
        <div ref="map" style={{width: "100vw", height: "100vh"}}></div>
      </div>
    )
  }
}

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=places,geometry"])(RegionGmap);
// export default RegionGmap