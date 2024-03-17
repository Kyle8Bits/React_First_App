import React from 'react';
import profilePic from './assets/profile.jpg';

function Card(){
    return(
        <div className ="card"> 
            <img src = {profilePic} alt = "profile picture" className = "profile-img"></img>
            <h2 className = "name">Mai Dang Khoa</h2>
            <p className = "card-text">Software Engineering Student Major</p>
        </div>
    );
}


export default Card;