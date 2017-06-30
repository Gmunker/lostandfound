import React from 'react';

const Filter = (props) => {

	
	
	return (
	
	
		<div>
			<div className="formRow">
                            <div className="radio">
                                <span>Lost</span>
                                <input type="radio" id="statusLost" name="status"  value="lost" onChange={props.handleChange} checked={props.status==="lost"}  />
                                <label htmlFor="statusLost"></label>
                            </div>
                            <div className="radio">
                                <span>Found</span>
                                <input type="radio" id="statusFound" name="status" onChange={props.handleChange}  value="found" checked={props.status==="found"}/>
                                <label htmlFor="statusFound"></label>
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="radio">
                                <span>Dog</span>
                                <input type="radio" id="typeDog" name="type" value="dog" onChange={props.handleChange}   checked={props.type==="dog" }/>
                                <label htmlFor="typeDog"></label>
                            </div>
                            <div className="radio">
                                <span>Cat</span>
                                <input type="radio" id="typeCat" name="type" value="cat" onChange={props.handleChange}   checked={props.type==="cat"}/>
                                <label htmlFor="typeCat"></label>
                            </div>
		    </div>
		</div>
	)
	
}






const DogTable = (props) => {
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
				{props.Animals.map((Animal) => {
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
	constructor(props) {
		super(props);
		this.state = {
			status : 'lost',
			type: 'dog',
			animals: this.props.Animals.filter(this.listFilter() )
		

	}
		
		        this.handleChange = this.handleChange.bind(this);
				this.listFilter = this.listFilter.bind(this);


	}

	listFilter(row){
    return row.Status === this.state.status
	}
handleChange(event) {
	    console.log(event.target.value)
	    event.target.name === "status" ?
        this.setState({status: event.target.value}) :
        this.setState({type: event.target.value})
		
    
}
	 
     

   	render() {
		  console.log(this.state.animals)
	//	   console.log(this.state.status)
	//	   console.log(this.state.type)

		return(
			<div className="listContent">
				<Filter handleChange={this.handleChange}/>
				<DogTable Animals={this.props.Animals}  />
				<button onClick={this.props.switchPage} value="Add">Add New Animal</button>
			</div>
		)
   }



}
export default List;



