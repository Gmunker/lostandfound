import React from 'react';
import { Radio, Select, TextInput } from '../FormElements';

const AddAnimalForm = (props) => {
    let statusProps = props.Props.Status
    let nameProps = props.Props.Name
    let sexProps = props.Props.Sex
    let typeProps = props.Props.Type
    let colorProps = props.Props.Color
    let breedProps = props.Props.Breed
    let mapProps = props.Props.Map
    let submitProps = props.Props.Submit
    return(
        <div className="topContainer">
            <h2 className="pageHeader">Add New Animal</h2>
            <form onSubmit={submitProps.handleSubmit}>
                <Select options={statusProps.options} selectProps={statusProps.selectProps}/>
                <Radio radioProps={typeProps}/>
                <div className="mapRow" style={statusProps.value === "transferred" ? {display:"none"} : null}>
                    <label>Location{mapProps.regionName ? <span>: {mapProps.regionName}</span> : null}
                        <p>Click on the map to mark the location where the {mapProps.typeText} was {mapProps.statusText}.</p>
                    </label>
                    <div ref={mapProps.map} id="map" style={{height: "250px", width:"100%"}}></div>
                </div>
                <TextInput textInputProps={nameProps}/>
                <Select options={sexProps.options} selectProps={sexProps.selectProps}/>
                <TextInput textInputProps={colorProps}/>
                <TextInput textInputProps={breedProps}/>
                <button type="submit" className="formButton">Save</button>
                <span className="formIndicia">* Required Field</span>
            </form>
        </div>
    )
}

export default AddAnimalForm