import React from "react";
function Avatar(){

    const imageURL = './src/assets/profile.jpg';

    const handleClick = (e:any) => e.target.style.display = "none";

    return (
        <img onClick={(e) => handleClick(e)} src={imageURL} alt="Profile" className="profile-img"/>
    );

}

export default Avatar