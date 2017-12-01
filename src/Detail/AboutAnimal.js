import React from "react"
import PropTypes from "prop-types"

const AboutAnimal = props => {
	return (
		<div>
			<header className="detail__main">
				<div className="detail__sub__name">
					{props.animalProps.name ? props.animalProps.name : "No Name Provided"}
				</div>
			</header>
			{props.animalProps.images ? (
				<img src={props.animalProps.images[0]} id="Featured" />
			) : null}
			<table className="detail__sub">
				<tbody>
					<tr>
						<td>Color</td>
						<td className="detail__sub__color">
							{props.animalProps.color
								? props.animalProps.color
								: "No Color Provided"}
						</td>
					</tr>
					<tr>
						<td>Sex</td>
						<td className="detail__sub__gender">
							{props.animalProps.history[0].sex}
						</td>
					</tr>
					<tr>
						<td>Breed</td>
						<td className="detail__sub__breed">
							{props.animalProps.breed
								? props.animalProps.breed
								: "No Breed Provided"}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

AboutAnimal.propTypes = {
	animalProps: PropTypes.object.isRequired,
	animalProps: PropTypes.shape({
		name: PropTypes.string,
		images: PropTypes.array,
		color: PropTypes.string,
		breed: PropTypes.string,
		history: PropTypes.array.isRequired
	})
}

export default AboutAnimal
