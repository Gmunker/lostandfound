import React, { Component } from 'react';

export class TextInput extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="formRow">
                <label htmlFor={this.props.textInputProps.id}>{this.props.textInputProps.label}{this.props.textInputProps.required ? "*" : null}</label>
                <input
                    ref={this.props.name}
                    name={this.props.textInputProps.name}
                    id={this.props.textInputProps.id} 
                    type={this.props.textInputProps.type}
                    onChange={this.props.textInputProps.onChange}
                    required={this.props.textInputProps.required}
                    value={this.props.textInputProps.value}                  
                />
            </div>
        )
    }
}
