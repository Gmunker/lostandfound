import React, { Component } from 'react';
import { connect } from 'react-redux';

class DispatchAddGmap extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(next) {
        // console.log(next);
    }

    render() {
        // console.log(this.state.region);
        return(
            <div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        newAnimal: state.animal
    }
})(DispatchAddGmap);