import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import dateFormat from 'dateformat';

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
    console.log(props.Animal);
    return(
        <div className="detail">
            <div className="detail__main">
                <h2 className="detail__main__status">{props.Animal.Status} {dateFormat(props.Animal.Date, "ddd, mmm dS, yyyy")}</h2>
                <div>Near</div>
                <p className="detail__main__location">{props.Animal.Location}</p>
                <img className="detail__main__image" src={props.Animal.Image} alt=""></img>
            </div>
            <div className="detail__sub">
                <div className="detail__sub__name">{props.Animal.Name}</div>
                <div className="detail__sub__color">{props.Animal.Color}</div>
                <div className="detail__sub__gender">{FormatGender(props.Animal.Gender)}</div>
                <div className="detail__sub__breed">{props.Animal.Breed}</div>
                <Link to="/update"><button>Update</button></Link>
                {/* <button onClick={() => props.navSwitch("Update")} value="Update">Update</button> */}
            </div>
        </div>
    )
}

class Detail extends Component {

   	render() {
        return(
            <div className="content">
                <Navigation/>
                <CurrentAnimal Animal={this.props.Animal}/>
            </div>
        )
    }
}

export default Detail;