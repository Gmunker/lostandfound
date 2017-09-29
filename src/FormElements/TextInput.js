import React, { Component } from 'react';

const TextInput = (props) => {
    
    return(
        <div className="formRow">
            <label htmlFor={props.textInputProps.id}>{props.textInputProps.label}{props.textInputProps.required ? "*" : null}</label>
            <input
                ref={props.name}
                name={props.textInputProps.name}
                id={props.textInputProps.id} 
                type={props.textInputProps.type}
                onChange={props.textInputProps.onChange}
                required={props.textInputProps.required}
                defaultValue={props.textInputProps.value}             
            />
        </div>
    )
}

export default TextInput