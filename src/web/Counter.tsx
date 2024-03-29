import React, {useState} from "react";
function Counter(){

    const [count, setCount] = useState(0);

    const addOne = () => {
        setCount(count+1);
    }

    const reset = () => {
        setCount(0);
    }

    const minusOne = () => {
        setCount(count-1);
    }
    return (

        <div className="counter-container"> 
            <p className="number" >{count}</p>
            <button className = "counter-button"  onClick= {minusOne} >Decrease</button>
            <button className = "counter-button"  onClick={reset}>Reset</button>
            <button className = "counter-button" onClick={addOne}>Increase</button>
        </div>
    );


    return
}

export default Counter;