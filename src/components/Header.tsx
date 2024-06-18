import React from 'react';
import '../css/style.css'
import logo from '../assets/logo.png'
import avatar from '../assets/avatar.jpg'

function Header(){
    return (
        <body className='top'>
            <nav> 
                <div>
                    <a href = '#'>
                        <img src = {logo} alt = "logo" className = "nav-logo"></img>
                    </a>
                </div>
                <ul className='nav-links'>
                    <li className='link'><a href="#">Home</a></li>
                    <li className='link'><a href="#">Skills</a></li>
                    <li className='link'><a href="#">Portfolio</a></li>
                    <li className='link'><a href="#">Contact</a></li>
                </ul>
            </nav>
        </body>
        
    );
}

export default Header;