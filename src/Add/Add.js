import React from "react"
import PropTypes from "prop-types"
import { Radio, Select, TextInput } from "../FormElements"
import ImageUploader from "../ImageElements/Uploader"
import ImagePreview from "../ImageElements/ImagePreview"

const AddAnimalForm = props => {
	let statusProps = props.Props.Status
	let nameProps = props.Props.Name
	let sexProps = props.Props.Sex
	let typeProps = props.Props.Type
	let colorProps = props.Props.Color
	let breedProps = props.Props.Breed
	let mapProps = props.Props.Map
	let submitProps = props.Props.Submit
	let imageProps = props.Props.Image
	console.log(mapProps)
	console.log(imageProps)

	return (
		<div className="topContainer">
			<h2 className="pageHeader">Add New Animal</h2>
			<form onSubmit={submitProps.handleSubmit}>
				<Select
					options={statusProps.options}
					selectProps={statusProps.selectProps}
				/>
				<Radio radioProps={typeProps} />
				<div onClick={imageProps.onClick} className="formButton">
					Upload Images
				</div>
				<ImageUploader imageProps={imageProps} />
				<ImagePreview imageProps={imageProps} animalProps={imageProps} />
				<div
					className="mapRow"
					style={
						statusProps.value === "transferred" ? { display: "none" } : null
					}
				>
					<label>
						Location{mapProps.regionName ? (
							<span>: {mapProps.regionName}</span>
						) : null}
						<p>
							Click on the map to mark the location where the{" "}
							{mapProps.typeText} was {mapProps.statusText}.
						</p>
					</label>
					<div
						ref={mapProps.map}
						id="map"
						style={{ height: "250px", width: "100%" }}
					/>
				</div>
				<TextInput textInputProps={nameProps} />
				<Select options={sexProps.options} selectProps={sexProps.selectProps} />
				<TextInput textInputProps={colorProps} />
				<TextInput textInputProps={breedProps} />
				<button id="Submit" type="submit" className="formButton">
					Save
				</button>
				<span className="formIndicia">* Required Field</span>
			</form>
		</div>
	)
}

AddAnimalForm.propTypes = {
	Status: PropTypes.string,
	Name: PropTypes.string,
	Sex: PropTypes.string,
	Type: PropTypes.string,
	Color: PropTypes.string,
	Breed: PropTypes.string,
	Submit: PropTypes.func,
	Map: PropTypes.object,
	Map: PropTypes.shape({
		statusText: PropTypes.string.isRequired,
		typeText: PropTypes.string.isRequired,
		regionName: PropTypes.string.isRequired,
		findRegion: PropTypes.func.isRequired,
		map: PropTypes.func.isRequired,
		placeMarkerAndPanTo: PropTypes.func.isRequired,
		replaceMarkerIcon: PropTypes.func.isRequired
	}),
	Image: PropTypes.object,
	Image: PropTypes.shape({
		images: PropTypes.array.isRequired,
		cancel: PropTypes.func.isRequired,
		makeFeatured: PropTypes.func.isRequired,
		onDrop: PropTypes.func.isRequired,
		removeImage: PropTypes.func.isRequired
	})
}

export default AddAnimalForm
