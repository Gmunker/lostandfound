import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

class Loader  extends (scriptLoader) => Component {
    constructor(props) {
        super(props);
        this.state = {
            google: {}
        }
    }
    
    componentWillReceiveProps() {
        let google = window.google;
        this.setState({
            google: window.google
        })
    }
    render() {
        return <div ref={this.state.google}></div>
    }
}

// export default( {
//     Loader: scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyDiUupl6Z9qBY5J_IKupr44xM542C23Xiw&libraries=places,geometry"])(Loader)
// } )

export default Loader