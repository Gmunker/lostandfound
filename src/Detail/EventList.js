import React from "react"
import PropTypes from "prop-types"

const EventList = props => {
	let options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}

	let Event = props.animalHistory
		? props.animalHistory.map((event, i) => {
				let number = props.animalHistory.length - i
				let latLng =
					event.lat && event.lng
						? {
								lat: event.lat,
								lng: event.lng
							}
						: null

				return (
					<tr
						key={i}
						onClick={() => {
							props.handleClick(i + 1, latLng, event.region)
						}}
					>
						<td className="detailList__item__id">{number}</td>
						<td className="detailList__item__status">{event.status}</td>
						<td className="detailList__item__date">
							{new Date(event.date).toLocaleTimeString("en-us", options)}
						</td>
					</tr>
				)
			})
		: null

	return (
		<div>
			<div className="detailList__region">
				<span>Area: &nbsp;{props.activeRegion}</span>
			</div>
			<table className="detailList">
				<tbody>{Event}</tbody>
			</table>
		</div>
	)
}

EventList.propTypes = {
	animalHistory: PropTypes.array.isRequired,
	animalHistory: PropTypes.arrayOf(PropTypes.object)
}

export default EventList
