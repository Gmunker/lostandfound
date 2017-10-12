import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Select, TextInput } from '../FormElements';
import ImageUploader from '../ImageElements/Uploader';
import ImagePreview from '../ImageElements/ImagePreview';

const UpdateContent = (props) => {

    let animal = props.Props.animal
    let newHistory = props.Props.newHistory
    let mapRef = props.Props.Map.ref
    let statusProps = props.Props.Status
    let nameProps = props.Props.Name
    let colorProps = props.Props.Color
    let breedProps = props.Props.Breed
    let mapProps = props.Props.Map
    let sexProps = props.Props.Sex
    let submitProps = props.Props.Submit
    let deleteProps = props.Props.Delete
    let imageProps = props.Props.Image

    return(
        <div className="topContainer">
            <h2 className="pageHeader">Update Animal</h2>
            <form>
                <Select options={statusProps.options} selectProps={statusProps.selectProps}/>
                <div onClick={imageProps.onClick} className="formButton">Upload Images</div>
                <ImageUploader imageProps={imageProps}/>
                <ImagePreview imageProps={imageProps} animalProps={imageProps}/>
                <div className="mapRow">
                    <div ref={mapProps.ref} id="map" style={{height: "250px", width:"100%"}}></div>
                </div>
                <TextInput textInputProps={nameProps}/>
                <Select options={sexProps.options} selectProps={sexProps.selectProps}/>
                <TextInput textInputProps={colorProps}/>
                <TextInput textInputProps={breedProps}/>
                <Link to="/list" className="formButton" id="Submit" onClick={submitProps.handleSubmit}>Submit</Link>
                <Link to="/list" className="formButton" onClick={deleteProps.handleDelete}>Delete</Link>
                <span className="formIndicia">* Required Field</span>
            </form>
        </div>
    )
}

export default UpdateContent