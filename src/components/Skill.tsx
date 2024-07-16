import React from "react";
import '../css/style.css'

const Skill = (props:any) =>{
    return(
        <header className="skill_container">

            <div className="skill">
                <img className="skill_photo" src ={props.photo} ></img>
                
                <div className="text_area">
                    <h2 className="skill_title">{props.skill}</h2>
                    <p className="description"> {props.description}</p>
                </div>

            </div>

        </header>
    );
}

export default Skill;