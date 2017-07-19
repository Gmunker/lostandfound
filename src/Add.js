import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import dateFormat from 'dateformat';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Location: "",
            Gender: "m",
            Color: "",
            Breed: "",
            Status: "lost",
            Type: "dog",
            Date: "",
            fireRedirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
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

    submitForm() {
        // validation
        if(this.state.Location !== "" || this.state.Color !== "" || this.state.Breed !== "") {
            this.props.addAnimal(this.state)
            this.setState({ fireRedirect: true })
        }
    }

    render() {
        const { fireRedirect } = this.state;
        return(
            <div className="addContent content">
                <Navigation/>
                <div className="topContainer">
                    <h2 className="pageHeader">Add New Animal</h2>
                    <form onSubmit={this.submitForm}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" type="text" onChange={this.handleChange} value={this.state.name}/>
                        </div>
                        <div>
                            <label htmlFor="location">Location*</label>
                            <input name="location" id="location" type="text" onChange={this.handleChange} value={this.state.location}/>
                        </div>
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <select name="sex" id="sex" onChange={this.handleChange} value={this.state.sex}>
                                <option value={"m"}>Male</option>
                                <option value={"f"}>Female</option>
                            </select>
                        </div>
                        <div className="formRow">
                            <div className="formSpanOne">
                                <label htmlFor="color">Color*</label>
                                <input name="color" id="color" type="text" onChange={this.handleChange} value={this.state.color}/>
                            </div>
                            <div className="formSpanOne">
                                <label htmlFor="breed">Breed*</label>
                                <input name="breed" id="breed" type="text" onChange={this.handleChange} value={this.state.breed}/>
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="radio">
                                <span>Lost</span>
                                <input type="radio" id="statusLost" name="status" onChange={this.handleChange} value="lost" checked={this.state.Status==="lost"}/>
                                <label htmlFor="statusLost"></label>
                            </div>
                            <div className="radio">
                                <span>Found</span>
                                <input type="radio" id="statusFound" name="status" onChange={this.handleChange} value="found" checked={this.state.Status==="found"}/>
                                <label htmlFor="statusFound"></label>
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="radio">
                                <span>Dog</span>
                                <input type="radio" id="typeDog" name="type" value="dog" onChange={this.handleChange} checked={this.state.Type==="dog"} />
                                <label htmlFor="typeDog"></label>
                            </div>
                            <div className="radio">
                                <span>Cat</span>
                                <input type="radio" id="typeCat" name="type" value="cat" onChange={this.handleChange} checked={this.state.Type==="cat"}/>
                                <label htmlFor="typeCat"></label>
                            </div>
                        </div>
                        <button type="submit" className="formButton">Save</button>
                        <span className="formIndicia">* Required Field</span>
                    </form>
                    {fireRedirect && (
                        <Redirect to="/list"/>
                    )}
                </div>
            </div>
        )
    }
}

export default Add;