import React  from "react";
function Button(){
    
    const handleCLick = (e:any) => e.target.textContent = "OUCH!";


    return(
        <button onClick= { (e) => handleCLick(e)}> CLick me </button>
    );
}

export default Button