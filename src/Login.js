import React, { Component } from 'react';
import Navigation from './Navigation';

class Login extends Component {
    render() {
        return(
            <div className="content">
                <Navigation navSwitch={this.props.navSwitch} ActivePage="Login"/>
            </div>
        )
    }
}

export default Login;