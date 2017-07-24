import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import dateFormat from 'dateformat';

import { fetchAnimal } from './actions/animalsActions';
import { connect } from 'react-redux';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Animal.Name,
            Location: this.props.Animal.Location,
            Gender: this.props.Animal.Gender,
            Color: this.props.Animal.Color,
            Breed: this.props.Animal.Breed,
            Status: this.props.Animal.Status,
            Type: this.props.Animal.Type,
            Date: dateFormat(Date(), "yyyy-mm-dd HH:MM:ss")               
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
      let animalID = this.props.match.params.Id;
			this.props.dispatch(fetchAnimal(animalID));
    }

    handleChange(event) {
        this.setState({Date: dateFormat(Date(), "yyyy-mm-dd HH:MM:ss")})
        event.target.name === "name" ?
        this.setState({Name: event.target.value}) :
        event.target.name === "location" ?
        this.setState({Location: event.target.value}) :
        event.target.name === "sex" ?
        this.setState({Gender: event.target.value}) :
        event.target.name === "color" ?
        this.setState({Color: event.target.value}) :
        event.target.name === "breed" ?
        this.setState({Breed: event.target.value}) :
        event.target.name === "status" ?
        this.setState({Status: event.target.value}) :
        this.setState({Type: event.target.value})
    }

    render() {
        // this.props.updateAnimal(this.state, this.props.Animal.key);
				console.log(this.props);
				let Animal = this.props.Animal;
        return(
            <div className="addContent content">
                <Navigation navSwitch={this.props.navSwitch} ActivePage="Detail"/>
                <div className="topContainer">
                    <h2 className="pageHeader">Update Animal</h2>
                    <form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" type="text" onChange={this.handleChange} value={Animal.Name}/>
                        </div>
                        <div>
                            <label htmlFor="location">Location*</label>
                            <input name="location" id="location" type="text" onChange={this.handleChange} value={Animal.Location} required/>
                        </div>
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <select name="sex" id="sex" onChange={this.handleChange} value={Animal.Gender}>
                                <option value={"m"}>Male</option>
                                <option value={"f"}>Female</option>
                            </select>
                        </div>
                        <div className="formRow">
                            <div className="formSpanOne">
                                <label htmlFor="color">Color*</label>
                                <input name="color" id="color" type="text" onChange={this.handleChange} value={Animal.Color} required/>
                            </div>
                            <div className="formSpanOne">
                                <label htmlFor="breed">Breed</label>
                                <input name="breed" id="breed" type="text" onChange={this.handleChange} value={Animal.Breed}/>
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="radio">
                                <span>Lost</span>
                                <input type="radio" id="statusLost" name="status" onChange={this.handleChange} value="lost" checked={Animal.Status==="lost"}/>
                                <label htmlFor="statusLost"></label>
                            </div>
                            <div className="radio">
                                <span>Found</span>
                                <input type="radio" id="statusFound" name="status" onChange={this.handleChange} value="found" checked={Animal.Status==="found"}/>
                                <label htmlFor="statusFound"></label>
                            </div>
                        </div>
                        <Link className="formButton" to="/list" onClick={ () => {this.props.updateAnimal(this.state, this.props.Animal.key)}}>Update</Link>
                        <Link className="formButton" to="/list" onClick={() => {this.props.deleteAnimal(this.props.Animal.key)}}>Delete</Link>
                        <span className="formIndicia">* Required Field</span>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        Animal: state.animals.animal
    }
})(Update);