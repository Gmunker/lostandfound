import React, { Component } from 'react';

export const Radio = (props) => {
    return(
        <div className="formRow">
            <div className="radio">
                <span>{props.radioProps.one.label}</span>
                <input 
                    type="radio"
                    value={props.radioProps.one.value}
                    id={props.radioProps.one.id}
                    name="type"
                    checked={props.radioProps.one.checked}
                    onChange={props.radioProps.one.onChange}
                />
                <label htmlFor="typeDog"></label>
            </div>
            <div className="radio">
                <span>{props.radioProps.two.label}</span>
                <input 
                    type="radio"
                    value={props.radioProps.two.value}
                    id={props.radioProps.two.id}
                    name="type"
                    checked={props.radioProps.two.checked}
                    onChange={props.radioProps.two.onChange}
                />
                <label htmlFor="typeCat"></label>
            </div>
            {
            props.radioProps.three ?
            <div>Three</div> :
            null
            }
        </div>
    )
}
