import React from 'react';
import { Radio, Select, TextInput } from '../FormElements';

const AddAnimalForm = (props) => {

    let statusText;
    props.Props.newHistory.status === "found" ?
    statusText = "found" :
    statusText = "last seen";
    return(
        <div className="topContainer">
            <h2 className="pageHeader">Add New Animal</h2>
            <form onSubmit={props.Props.handleSubmit}>
            <Select 
                options={[
                    "lost",
                    "found",
                    "transferred"
                ]}
                selectProps={{
                    label: "Status",
                    onChange: props.Props.handleStatus,
                    value: props.Props.newHistory.status,
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
                        checked: props.Props.newAnimal.type === "dog",
                        onChange: props.Props.handleType
                    },
                    two: {
                        label: "Cat",
                        value: "cat",
                        id: "typeCat",
                        name: "type",
                        checked: props.Props.newAnimal.type === "cat",
                        onChange: props.Props.handleType
                    }
                }}
            />
            <div className="mapRow" style={props.Props.newHistory.status === "transferred" ? {display:"none"} : null}>
                <label>Location{props.Props.newHistory.region ? <span>: {props.Props.newHistory.region}</span> : null}
                    <p>Click on the map to mark the location where the {props.Props.newAnimal.type} was {statusText}.</p>
                </label>
                <div ref={props.Props.map} id="map" style={{height: "250px", width:"100%"}}></div>
            </div>
            <TextInput 
                textInputProps={{
                    label: "Name",
                    name: "name",
                    ref: "name",
                    required: true,
                    id: "name",
                    onChange: props.Props.handleName,
                    value: props.Props.newAnimal.name
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
                    onChange: props.Props.handleSex,
                    value: props.Props.newHistory.sex,
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
                    onChange: props.Props.handleColor,
                    value: props.Props.newAnimal.color
                }}
            />
            <TextInput 
                textInputProps={{
                    label: "Breed",
                    name: "breed",
                    ref: "breed",
                    required: true,
                    id: "breed",
                    onChange: props.Props.handleBreed,
                    value: props.Props.newAnimal.breed
                }}
            />
            <button type="submit" className="formButton">Save</button>
            <span className="formIndicia">* Required Field</span>
            </form>
        </div>
    )
}

export default AddAnimalForm