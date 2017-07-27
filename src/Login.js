import React, {Component} from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

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
    this.props.user.uid ? console.log(this.props.user) : "";
  }

  handleLogout() {
    this.props.dispatch(logout())
    console.log(this.props.user)
  }

  render() {
    return (
      <div>
        <div>
          <p>Username:</p>
          <input 
            type="text"
            ref="email" 
            minLength="7" 
            onChange={this.handleChange}
            style={this.state.email ? {background: "green"} : null}
          />
        </div>
        <div>
          <p>Password:</p>
          <input 
            type="password" 
            ref="password" 
            minLength="7" 
            onChange={this.handleChange}
            style={this.state.password ? {background: "green"} : null}
          />
        </div>
        <button onClick={this.state.email ? this.handleLogin : null}>Login</button>
        <button onClick={this.props.user.uid ? this.handleLogout : null}>Logout</button>
      </div>
    )
  }
}

export default connect(state => {
  return {
    user: state.user
  }
})(Login);