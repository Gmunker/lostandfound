import React from 'react';
import { Link } from 'react-router-dom';
import icon from './images/icon.png';

const Navigation = (props) => {

    return(
        <nav className="mainNavigation">
            <ul>
                <Link to="/"><img src={icon} alt="hipdlostandfoundpets"/></Link>
                <Link to="/add"><li>Add New Animal</li></Link>
                <Link to="/list"><li>View Full List</li></Link>
            </ul>
        </nav>
    )
}

export default Navigation;