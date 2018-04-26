// JavaScript source code
import React from 'react';
import {Link} from 'react-router-dom';
import Search from './Search';
import logo from './logo.png';
import './Header.css';


/*
const containerStyle = {
    fontSize: '40px'
}


const Header = () => {
    return (
        //could also do inline: style ={{fontSize: '40px'}}
        <div style={containerStyle} className="Header">Header</div>
    );
}
*/

const Header = () => {
    return (
        <div className="Header">
            <Link to="/">
                <img src={logo} alt="logo" className="Header-logo" />

            </Link>

            <Search />
        </div>
    );
}

export default Header;