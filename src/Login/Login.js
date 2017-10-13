import React from 'react';
import { Radio, Select, TextInput } from '../FormElements';

const LoginForm = (props) => {
    let usernameProps = props.Props.Username
    let passwordProps = props.Props.Password
    let formProps = props.Props.Methods

    return(
        <div className="topContainer">
            <h2 className="pageHeader">Volunteer Login</h2>
            <div>
                <TextInput textInputProps={usernameProps}/>
                <TextInput textInputProps={passwordProps}/>
                <button className="formButton" onClick={usernameProps.value ? formProps.handleLogin : null}>Login</button>
            </div>
        </div>
    )
}

export default LoginForm