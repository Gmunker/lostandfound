import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import geojson from "./geojson";

let defaultcoords = {
    lat: 36.170295,
    lng: -86.674846
};

const googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=places,geometry"

const AsyncGettingStartedExampleGoogleMap = withScriptjs(

    withGoogleMap(
        
        props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={15}
                defaultCenter={defaultcoords}
                onClick={props.onMapClick}
            >
                {
                props.markers.map(marker => (
                    <Marker
                        {...marker}
                    />
                ))
                }
                <Polygon path={geojson.Donelson_Hills} onClick={props.handlePolyClick} options={{fillColor:'red',strokeWeight:1,strokeOpacity:0.5,fillOpacity: 0.25}}/>
                <Polygon path={geojson.Maplecrest} onClick={props.handlePolyClick} options={{fillColor:'blue',strokeWeight:1,strokeOpacity:0.5,fillOpacity: 0.25}}/>
            </GoogleMap>
        )
    )
)

class TheMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [{
                position: {},
                key: 'Donelson',
                defaultAnimation: 2
            }]
        }
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handlePolyClick = this.handlePolyClick.bind(this);
    }
    
    handleMapClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                },
                defaultAnimation: 2,
                key: Date.now()
            },
        ];
        this.setState({markers: nextMarkers});
    }

    handlePolyClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                },
                defaultAnimation: 2,
                key: Date.now()
            },
        ];
        this.setState({markers: nextMarkers});
    }
    
    render() {
        return(
            <AsyncGettingStartedExampleGoogleMap
                googleMapURL={googleMapURL}
                loadingElement={
                <div style={{ height: `100vh` }}>
                    
                </div>
                }
                containerElement={
                <div style={{ height: `100vh` }} />
                }
                mapElement={
                <div style={{ height: `100vh` }} />
                }
                onMapClick={this.handleMapClick}
                markers={this.state.markers}
                handlePolyClick={this.handlePolyClick}
            />
        );
    }
}

export default TheMap;
















// import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap, Marker, Polygon } from "react-google-maps";
// import withScriptjs from "react-google-maps/lib/async/withScriptjs";
// // import geojson from "./geojson";

// let defaultcoords = {
//     lat: 36.170295,
//     lng: -86.674846
// };

// var triangleCoords = [
//     {lat: 25.774, lng: -80.190},
//     {lat: 18.466, lng: -66.118},
//     {lat: 32.321, lng: -64.757},
//     {lat: 25.774, lng: -80.190}
// ];

// var squareCoords = [
//     {lat: 36.15014175925152, lng: -88.012265625},
//     {lat: 28.825794347564677, lng: -87.919625},
//     {lat: 29.024415011106732, lng: -79.8728828125},
//     {lat: 36.382792212060046, lng: -80.313640625},
//     {lat: 36.15014175925152, lng: -88.012265625}
// ];

// const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw"
// const AsyncGettingStartedExampleGoogleMap = withScriptjs(

//     withGoogleMap(
//         props => (
//             <GoogleMap
//                 ref={props.onMapLoad}
//                 defaultZoom={13}
//                 defaultCenter={defaultcoords}
//                 onClick={props.onMapClick}
//             >
//                 {
//                 props.markers.map(marker => (
//                     <Marker
//                         {...marker}
//                     />
//                 ))
//                 }
//                 <Polygon path={squareCoords}/>
//                 <Polygon path={triangleCoords} options={{fillColor:'#FFFFFF'}}/>
//             </GoogleMap>
//         )
//     )
// )

// class TheMap extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             markers: [{
//                 position: {},
//                 key: 'Donelson',
//                 defaultAnimation: 2
//             }]
//         }
//         this.handleMapClick = this.handleMapClick.bind(this);
//     }

//     handleMapClick(event) {
//         console.log(event.latLng.lat());
//         const nextMarkers = [
//             ...this.state.markers,
//             {
//                 position: {
//                     lat: event.latLng.lat(),
//                     lng: event.latLng.lng()
//                 },
//                 defaultAnimation: 2,
//                 key: Date.now()
//             },
//         ];
//         this.setState({markers: nextMarkers});
//     }
    
//     render() {
//         console.log(this.state.polygon);
//         return(
//             <AsyncGettingStartedExampleGoogleMap
//                 googleMapURL={googleMapURL}
//                 loadingElement={
//                 <div style={{ height: `100%` }}>
                    
//                 </div>
//                 }
//                 containerElement={
//                 <div style={{ height: `100%` }} />
//                 }
//                 mapElement={
//                 <div style={{ height: `300px` }} />
//                 }
//                 onMapClick={this.handleMapClick}
//                 markers={this.state.markers}
//             />

//         );
//     }
// }
// export default TheMap;

// import React, { Component } from 'react';
// import { withGoogleMap, GoogleMap, Marker, Polygon, InfoWindow } from "react-google-maps";
// import withScriptjs from "react-google-maps/lib/async/withScriptjs";
// // import geojson from "./geojson";

// let defaultcoords = {
//     lat: 36.170295,
//     lng: -86.674846
// };

// const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw"
// const AsyncGettingStartedExampleGoogleMap = withScriptjs(
    
//     withGoogleMap(
//         props => (
//             <GoogleMap
//                 ref={props.onMapLoad}
//                 defaultZoom={13}
//                 defaultCenter={defaultcoords}
//                 onClick={props.onMapClick}
//             >
//             {
//             props.markers.map(marker => (
//                 <Marker
//                     {...marker}
//                     onClick={() => console.log(marker)}
//                 />
//             ))
//             }            
//             </GoogleMap>
//         )
//     )
// )

// class Gmap extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             markers: [{
//                 position: {
//                     lat: 36.1571445511326,
//                     lng: -86.67903900146484
//                 },
//                 key: 'Spot',
//                 defaultAnimation: 2
//             }, {
//                 position: {},
//                 key: 'Donelson',
//                 defaultAnimation: 2 
//             }]
//         }
//         this.handleMapClick = this.handleMapClick.bind(this);
//     }

//     handleMapClick(event) {
//         console.log(event.latLng.lat());
//         const nextMarkers = [
//             ...this.state.markers,
//             {
//                 position: {
//                     lat: event.latLng.lat(),
//                     lng: event.latLng.lng()
//                 },
//                 defaultAnimation: 2,
//                 key: Date.now()
//             },
//         ];
//         this.setState({markers: nextMarkers});
//     }
    
//     render() {
//         console.log(this.state.polygon);
//         return(
//             <AsyncGettingStartedExampleGoogleMap
//                 googleMapURL={googleMapURL}
//                 loadingElement={
//                 <div style={{ height: `100%` }}>
                    
//                 </div>
//                 }
//                 containerElement={
//                 <div style={{ height: `100%`, width: '50%' }} />
//                 }
//                 mapElement={
//                 <div style={{ height: `300px` }} />
//                 }
//                 onMapClick={this.handleMapClick}
//                 markers={this.state.markers}
//             />

//         );
//     }
// }
// export default Gmap;