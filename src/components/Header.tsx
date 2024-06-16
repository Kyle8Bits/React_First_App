import React from "react";
import '../css/style.css'
import avatar from '../assets/avatar.jpg'


function Header(){
    return(
        <header className="header_container">
            <div className="content">
                <span className="blur"></span>
                <span className="blur"></span>
                <h4>SOPHOMORE FROM RMIT UNIVERSITY</h4>
                <h1>Hi, I'm <span>Kyle</span>, Software Engineering</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis, quod? Tenetur quasi harum impedit, corrupti quas libero pariatur, ducimus repellendus nam consequuntur quidem est molestias distinctio? Expedita culpa quasi id.
                </p>
            </div>
            <div className="avatar">
                    <img src = {avatar} alt = "avatar" className = "avatar"></img>
            </div>
        </header>
    );
}

export default Header;
