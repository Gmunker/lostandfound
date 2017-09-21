import React, { Component } from 'react';

export class TextInput extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="formRow">
                <label htmlFor="name">{this.props.textInputProps.label}</label>
                <input
                    ref={this.props.name}
                    name={this.props.textInputProps.name}
                    id={this.props.textInputProps.id} 
                    type="text"
                    onChange={this.props.textInputProps.onChange}
                    required={this.props.textInputProps.required}
                    value={this.props.textInputProps.value}                  
                />
            </div>
        )
    }
}
