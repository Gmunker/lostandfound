import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import Navigation from './Navigation';
import { TextInput } from './FormElements';

import { login, logout } from './actions/userActions';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
	this.handleUsername = this.handleUsername.bind(this);
	this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleUsername(e) {
    let email = validator.isEmail(e.target.value) ? e.target.value : null;
    this.setState((state, props) => {
      return {
        ...state,
        email
      }
    })
  }

  handlePassword(e) {
    let password = e.target.value.length > 5 ? e.target.value : null;
    this.setState((state, props) => {
      return {
        ...state,
        password
      }
    })
  }

  handleLogin() {
    this.props.dispatch(login(this.state.email, this.state.password))
  }

  handleLogout() {
    this.props.dispatch(logout())
  }

  render() {
    return (
      <div className="content">
        <Navigation navSwitch={this.props.navSwitch} ActivePage="Login"/>
        <div className="topContainer">
          <h2 className="pageHeader">Volunteer Login</h2>
          <div>
            <TextInput
              textInputProps={{
                label: "Username",
                name: "email",
                id: "email",
                ref: "email",
                minLength: "7",
                onChange: this.handleUsername
              }}
            />
            <TextInput
              textInputProps={{
                label: "Password",
                name: "password",
                id: "password",
                ref: "password",
                type: "password",
                minLength: "7",
                onChange: this.handlePassword
              }}
            />
            <button className="formButton" onClick={this.state.email ? this.handleLogin : null}>Login</button>
          </div>
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