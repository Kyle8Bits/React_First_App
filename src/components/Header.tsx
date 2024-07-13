import React from 'react';
import '../css/style.css'
import logo from '../assets/logo.png'
import avatar from '../assets/avatar.jpg'
import App from '../App';

interface HeaderProps {
    scrollToSkills: () => void;
    scrollToPortfolio: () => void;
    scrollToContact: () => void;
  }
  

const Header:React.FC<HeaderProps> = ({scrollToSkills, scrollToPortfolio, scrollToContact }) =>{
    return (
        <div className='top'>
            <nav> 
                <div>
                    <a href = '#'>
                        <img src = {logo} alt = "logo" className = "nav-logo"></img>
                    </a>
                </div>
                <ul className='nav-links'>
                    <li className='link'><a href="#">Home</a></li>
                    <li className='link' onClick={scrollToSkills}><a href="#">Skills</a></li>
                    <li className='link' onClick={scrollToPortfolio}><a href="#">Portfolio</a></li>
                    <li className='link' onClick={scrollToContact}><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
        
    );
}

export default Header;