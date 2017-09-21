import React, { Component } from 'react';

export class Select extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let options = this.props.options.map((option, i) => {
            function jsUcfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            return(
                <option key={i} value={option}>{jsUcfirst(option)}</option>
            )
        })
        return(
            <div className="formRow">
                <label htmlFor="status">{this.props.selectProps.label}</label>
                <select 
                    name={this.props.selectProps.name}
                    ref={this.props.selectProps.ref} 
                    id={this.props.selectProps.id} 
                    onChange={this.props.selectProps.onChange}
                    value={this.props.selectProps.value}
                >
                    {options}
                </select>
            </div>
        )
    }
}
