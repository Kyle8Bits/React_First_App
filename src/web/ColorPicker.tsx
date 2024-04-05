import { useState } from "react";

function ColorPicker(){
   const [color, pickColor] = useState("#FFFFFFF"); 

   function handleChangeColor(event:any){
        pickColor(event.target.value)
        document.body.style.backgroundColor = event.target.value;
   }
   

   return(
    <div className="color-picker-container">
        <h1>Color Picker</h1>
        <div className="color-display" style={{backgroundColor : color}}>
            <p>Selected color: {color}</p>
        </div>
        <label>Select color </label>
        <input type="color" value={color} onChange={handleChangeColor}></input>
    </div>
   );

}

export default ColorPicker;