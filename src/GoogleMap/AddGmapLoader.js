import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import AddGmap from './AddGmap';

class AddGmapLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: {},
            google: window.google
        }
    }

    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                
                let google = window.google
                
                this.setState({
                    google: google,
                    map: new google.maps.Map(this.refs.map, {
                        zoom: 11,
                        center: {
                            lat: 36.170295,
                            lng: -86.674846
                        }
                    })
                })
            }
        }
    }

    render() {
        return(
            <div ref="map" style={{height: "300px", width:"100%"}}>
                <AddGmap map={this.state.map} google={this.state.google}/>
            </div>
        )
    }
}

export default scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=places,geometry"])(AddGmapLoader);