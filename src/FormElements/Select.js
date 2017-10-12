import React, { Component } from 'react';

export class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen(e) {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        
        // function jsUcfirst(string) {
        //     return string.replace(/\b[a-z]|\B[A-Z]/g, function(x) {
        //         return String.fromCharCode(x.charCodeAt(0)^32);
        //     });
        // }
        let options = this.props.options.map((option, i) => {
            return(
                <span key={i} onClick={() => {this.props.selectProps.onChange(option)}}>{option}</span>
            )
        })
        return(
            
            <div className="formRow">
                <label htmlFor={this.props.selectProps.id}>{this.props.selectProps.label}</label>
                <section
                    className="select"
                    name={this.props.selectProps.name}
                    ref={this.props.selectProps.ref} 
                    id={this.props.selectProps.id}
                    value={this.props.selectProps.value}
                    onClick={this.handleOpen}
                >
                    <span>{this.props.selectProps.value}</span>
                    <div className={this.state.open ? "show" : "hide"}>
                        {options}
                    </div>
                </section>
            </div>
        )
    }
}
