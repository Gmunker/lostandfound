import React from 'react';

const Filter = (props) => {
	return (
		<div>

		</div>
	)
}

const DogTable = (props) => {
	const Animals = props.Animals;
	return (
		<table>
		 

			<thead>

				<tr>
					<th>Location</th>
					<th>Color</th>
					<th>Breed</th>
				</tr>
			</thead>
			<tbody>
				{Animals.map((Animal) => {
					return(
						<tr key={Animal.key}>
							<td className="loctd">{Animal.Location}</td>
							<td className="colortd">{Animal.Color}</td>
							<td className="breedtd">{Animal.Breed}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

class List extends React.Component {
	

	
   	render() {
		return(
			<div className="listContent">
				<Filter />
				<DogTable Animals={this.props.Animals} />
				<button onClick={this.props.switchPage} value="Add">Add New Animal</button>
			</div>
		)
   }
}



export default List;



