import React, { Component } from 'react';
import { Radio, Select, TextInput } from '../FormElements';
import { connect } from 'react-redux';

let google
let map
let marker
let currentPoly

class AddAnimalForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let newAnimal = this.props.currentAnimal
        let newHistory = this.props.newHistory
        let statusText;
        newHistory.status === "found" ?
        statusText = "found" :
        statusText = "last seen";
        return(
            <div className="topContainer">
                <h2 className="pageHeader">Add New Animal</h2>
                <form onSubmit={this.props.handleSubmit}>
                <Select 
                    options={[
                        "lost",
                        "found",
                        "transferred"
                    ]}
                    selectProps={{
                        label: "Status",
                        onChange: this.props.handleStatus,
                        value: newHistory.status,
                        name: "status",
                        ref: "status",
                        id: "status"
                    }}
                />
                <Radio 
                    radioProps={{
                        one: {
                            label: "Dog",
                            value: "dog",
                            id: "typeDog",
                            name: "type",
                            checked: this.props.currentAnimal.type === "dog",
                            onChange: this.props.handleType
                        },
                        two: {
                            label: "Cat",
                            value: "cat",
                            id: "typeCat",
                            name: "type",
                            checked: this.props.currentAnimal.type === "cat",
                            onChange: this.props.handleType
                        }
                    }}
                />
                <div className="mapRow" style={newHistory.status === "transferred" ? {display:"none"} : null}>
                    <label>Location{newHistory.region ? <span>: {newHistory.region}</span> : null}
                        <p>Click on the map to mark the location where the {newAnimal.type} was {statusText}.</p>
                    </label>
                    <div ref={this.props.map} id="map" style={{height: "250px", width:"100%"}}></div>
                </div>
                <TextInput 
                    textInputProps={{
                        label: "Name",
                        name: "name",
                        ref: "name",
                        required: true,
                        id: "name",
                        onChange: this.props.handleName,
                        value: this.props.currentAnimal.name
                    }}
                />
                <Select 
                    options={[
                        "male",
                        "female",
                        "neutered male",
                        "spayed female"
                    ]}
                    selectProps={{
                        label: "Sex",
                        onChange: this.props.handleSex,
                        value: newHistory.sex,
                        name: "sex",
                        ref: "sex",
                        id: "sex"
                    }}
                />
                <TextInput 
                    textInputProps={{
                        label: "Color",
                        name: "color",
                        ref: "color",
                        required: true,
                        id: "color",
                        onChange: this.props.handleColor,
                        value: this.props.currentAnimal.color
                    }}
                    name={input => this.color = input}
                />
                <TextInput 
                    textInputProps={{
                        label: "Breed",
                        name: "breed",
                        ref: "breed",
                        required: true,
                        id: "breed",
                        onChange: this.propshandleBreed,
                        value: this.props.currentAnimal.breed
                    }}
                />
                <button type="submit" className="formButton">Save</button>
                <span className="formIndicia">* Required Field</span>
                </form>
            </div>
        )
    }
}

const LoadConnector = connect(state => {
    return {
        currentAnimal: state.animal.currentAnimal,
        newHistory: state.animal.newHistory
    }
})(AddAnimalForm)

export default LoadConnector