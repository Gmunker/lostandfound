import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import Navigation from './Navigation';

import { login, logout } from './actions/userActions';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: null,
      password: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleChange(e) {
    let email = validator.isEmail(this.refs.email.value) ? this.refs.email.value : null;

    let password = this.refs.password.value.length > 5 ? this.refs.password.value : null;

    this.setState((state, props) => { return { ...state, email, password }});
  }

  handleLogin() {
    this.props.dispatch(login(this.state.email, this.state.password))
  }

  handleLogout() {
    this.props.dispatch(logout())
    console.log(this.props.user)
  }

  render() {
    console.log(this.props.user)
    return (
      <div className="content">
        <Navigation navSwitch={this.props.navSwitch} ActivePage="Login"/>
        <div className="topContainer">
          <h2 className="pageHeader">Login</h2>
            <div>
              <label>Username</label>
              <input 
                type="text"
                ref="email" 
                minLength="7" 
                onChange={this.handleChange}
                style={this.state.email ? {background: "green"} : null}
              />
            </div>
            <div>
              <label>Password</label>
              <input 
                type="password" 
                ref="password" 
                minLength="7" 
                onChange={this.handleChange}
                style={this.state.password ? {background: "green"} : null}
              />
            </div>
            <button className="formButton" onClick={this.state.email ? this.handleLogin : null}>Login</button>
            <button className="formButton" onClick={this.props.user.uid ? this.handleLogout : null}>Logout</button>
            
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    user: state.user
  }
})(Login);