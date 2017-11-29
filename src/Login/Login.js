import React from 'react';
import { Radio, Select, TextInput } from '../FormElements';

const LoginForm = (props) => {
    let usernameProps = props.Props.Username
    let passwordProps = props.Props.Password
    let formProps = props.Props.Methods

    return(
        <div className="topContainer">
            <h2 className="pageHeader">Volunteer Login</h2>
            <form onSubmit={usernameProps.value ? formProps.handleLogin : null}>
                <TextInput textInputProps={usernameProps}/>
                <TextInput textInputProps={passwordProps}/>
                <button type="submit" className="formButton">Login</button>
            </form>
        </div>
    )
}

export default LoginForm