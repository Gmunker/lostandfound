import React, { Component } from 'react';
import Navigation from './Navigation';

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
            Type: this.props.Animal.Type
        }
        this.writeCurrentTime = this.writeCurrentTime.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    writeCurrentTime(event) {
        var d = new Date(event.target.value);
        var Year = d.getFullYear();
        var Month = (d.getMonth() + 1);
        var Day = d.getDate();
        var Hours = d.getHours();
        var Minutes = d.getMinutes();
        var Seconds = d.getSeconds();
        this.setState({Date: Year + "-" + Month + "-" + Day + " " + Hours + ":" + Minutes + ":" + Seconds}, () => { 
            this.props.updateAnimal(this.state);
        });
    }

    handleChange(event) {
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
        console.log(this.props.Animal);
        return(
            <div className="addContent content">
                <Navigation navSwitch={this.props.navSwitch} ActivePage="Detail"/>
                <div className="topContainer">
                    <h2 className="pageHeader">Update Animal</h2>
                    <form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input name="name" id="name" type="text" onChange={this.handleChange} value={this.state.Name}/>
                        </div>
                        <div>
                            <label htmlFor="location">Location*</label>
                            <input name="location" id="location" type="text" onChange={this.handleChange} value={this.state.Location} required/>
                        </div>
                        <div>
                            <label htmlFor="sex">Sex</label>
                            <select name="sex" id="sex" onChange={this.handleChange} value={this.state.Gender}>
                                <option value={"m"}>Male</option>
                                <option value={"f"}>Female</option>
                            </select>
                        </div>
                        <div className="formRow">
                            <div className="formSpanOne">
                                <label htmlFor="color">Color*</label>
                                <input name="color" id="color" type="text" onChange={this.handleChange} value={this.state.Color} required/>
                            </div>
                            <div className="formSpanOne">
                                <label htmlFor="breed">Breed</label>
                                <input name="breed" id="breed" type="text" onChange={this.handleChange} value={this.state.Breed}/>
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
                        <button value={Date()} onClick={this.writeCurrentTime}>Update</button>
                        <button onClick={this.props.deleteAnimal}>Delete</button>
                        <span className="formIndicia">* Required Field</span>
                    </form>
                </div>
            </div>
        )
    }
}

export default Update;