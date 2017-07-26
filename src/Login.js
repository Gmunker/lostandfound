import React, {Component} from 'react';
import { connect } from 'react-redux';

import { login, logout } from './actions/userActions';

class Login extends Component {
  constructor(props){
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.dispatch(login("gmunker@gmail.com", "Testingpassword1"))
    this.props.user.uid ? console.log(this.props.user) : null  
  }

  handleLogout() {
    this.props.dispatch(logout())
    console.log(this.props.user)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

export default connect(state => {
  return {
    user: state.user
  }
})(Login);