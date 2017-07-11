import React, { Component } from 'react';
import Navigation from './Navigation';

function FormatDate(date) {
    var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = date.slice(0,4);
    let month = monthName[date.slice(5,7) - 1];
    let day = date.slice(8,10);
    return (
        <div>{month} {day}, {year}</div>
    )
}

// Formats the gender info from f/m to Female/Male
function FormatGender(gender) {
    return (
        <div>
            {gender === "f" ?
                    "Female" :
                    "Male"}
        </div>
    )
}

const CurrentAnimal = (props) => {
    return(
        <div className="detail">
            <div className="detail__main">
                <h2 className="detail__main__status">{props.Animal.Status} {FormatDate(props.Animal.Date)}</h2>
                <div>Near</div>
                <p className="detail__main__location">{props.Animal.Location}</p>
                <img className="detail__main__image" src={props.Animal.Image} alt=""></img>
            </div>
            <div className="detail__sub">
                <div className="detail__sub__name">{props.Animal.Name}</div>
                <div className="detail__sub__color">{props.Animal.Color}</div>
                <div className="detail__sub__gender">{FormatGender(props.Animal.Gender)}</div>
                <div className="detail__sub__breed">{props.Animal.Breed}</div>
                <button onClick={() => props.navSwitch("Update")} value="Update">Update</button>
            </div>
        </div>
    )
}

class Detail extends Component {

   	render() {
        return(
            <div className="content">
                <Navigation navSwitch={this.props.navSwitch} ActivePage="Detail"/>
                <CurrentAnimal navSwitch={this.props.navSwitch} Animal={this.props.Animal}/>
            </div>
        )
    }
}

export default Detail;