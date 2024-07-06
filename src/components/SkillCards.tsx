import Reac, {useState} from "react";
import '../css/style.css'
import Skill from "./Skill";
import programming from "../assets/programming.jpg";
import embedded from "../assets/embedded.jpg";
import software from "../assets/software.jpg";

function SkillCards(){

    

    return(
        <div className="skillcard">
            <h3 className="skill_header">MY SKILLS</h3>
            <ul className="skill_list"> 
                <Skill skill = "Programming" photo ={programming} description = "Basic programming language, data strucure and algorithm building." />
                <Skill skill = "Software Developer" photo ={software} description = "Desgin software base on your ideas, serving for any needs" />
                <Skill skill = "Embedded System Building" photo ={embedded} description = "Working with micro-electronics system and embedded system." />
            </ul>
        </div>
    );
}
export default SkillCards;