import React, { Component } from 'react';
import { connect } from 'react-redux';
import regions from './geojson.json';
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
      console.log(regionName)
    } else {
      console.log('Outside defined regions')
    }
  }
	
	componentWillReceiveProps(props) {
		let map = props.map
		map.addListener('click', function(e) {
    	this.findRegion(e.latLng);
			this.placeMarkerAndPanTo(e.latLng, map);
		}.bind(this));
	}
	
	// componentWillReceiveProps(props) {
	// 	let map = new props.google.maps.Map(this.refs.map, {
	// 		zoom: 11,
	// 		center: {
	// 			lat: 36.170295,
	// 			lng: -86.674846
	// 		}
	// 	});
	// }

  // componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
  //   if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
  //     if (isScriptLoadSucceed) {
  //       let google = window.google
        
  //       let map = new google.maps.Map(this.refs.map, {
  //         zoom: 11,
  //         center: {
  //           lat: 36.170295,
  //           lng: -86.674846
  //         }
  //       });

  //     let markers = this.state.dummyData.map(animal => {
  //       animal.Location.position.map((position, index) => {
  //         return new google.maps.Marker({
  //           position: position,
  //           map: map,
  //           icon: pullIcon(animal, index)
  //         })
  //       })
  //     });

  //     map.addListener('click', function(e) {
  //       findRegion(e.latLng);
  //       placeMarkerAndPanTo(e.latLng, map);
  //     });

  //     function findRegion(latLng) {
  //       var regionName;
  //       for(var i=0; i<regions.length;i++) {
  //         var currentPoly = new google.maps.Polygon({paths: regions[i].polygon});
  //         if(google.maps.geometry.poly.containsLocation(latLng, currentPoly)) {
  //           regionName = regions[i].name;
  //         }
  //       }
  //       if(regionName) {
  //         map.region = regionName
  //       } else {
  //         sessionStorage.setItem('regionName', 'Outside defined regions');
  //       }
  //     }

  //     function placeMarkerAndPanTo(latLng, map) {
  //       var marker = new google.maps.Marker({
  //         position: latLng,
  //         map,
  //       });
  //       map.panTo(latLng);
  //     }

  //     function pullIcon(animal, index) {
  //       var status = animal.Status[index] === "Found" ? "found" : "lost";
  //       var type = animal.Type === "Cat" ? "Cat" : "Dog";
  //       return  baseUrl + status + type + "Icon.png"
  //     }
  //   }
  // }
  // // else this.props.onError()
  // }
  
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