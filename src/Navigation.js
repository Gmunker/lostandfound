import React from 'react';
import icon from './images/icon.png';

const Navigation = (props) => {

    return(
        <nav className="mainNavigation">
            <ul>
                <img onClick={() => props.navSwitch("Landing")} src={icon} alt=""/>
                <li onClick={() => props.navSwitch("Add")} className={props.ActivePage === "Add" ? "active" : ""}>Add New Animal</li>
                <li onClick={() => props.navSwitch("List")} className={props.ActivePage === "List" ? "active" : ""}>View Full List</li>
            </ul>
        </nav>
    )
}

export default Navigation;