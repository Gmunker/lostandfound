import React, { Component } from 'react';

class Header extends Component {
    render() {
        return(
            <div className="mainHeader">
                <nav className="mainNav">
                    <ul>
                        <li>
                            <button>Add a new Animal</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header;