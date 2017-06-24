import React from 'react';
import myData from './temp_api/masterList.json'

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
						<tr key={Animal.Id}>
							<td>{Animal.Location}</td>
							<td>{Animal.Color}</td>
							<td>{Animal.Breed}</td>
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
				<DogTable dogs={myData} Animals={this.props.Animals} />
				<button>Add New Animal</button>
			</div>
		)
   }
}



export default List;



