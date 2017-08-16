import React, {Component} from 'react';
import EnhanceComponent from './EnhanceComponent';

class Map extends Component {
    render() {
        return(
            <div>
                I am the Map Component
            </div>
        )
    }
}

export default EnhanceComponent(Map);