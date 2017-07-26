import React, {Component} from 'react';
import { connect } from 'react-redux';

import { login } from './actions/userActions';

class Login extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.dispatch(login("gmunker@gmail.com", "Testingpassword1"))
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Login</button>
      </div>
    )
  }
}

export default connect(state => {
  return {
    user: state.user
  }
})(Login);