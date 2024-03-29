import React, {useState} from "react";

function MyComponent(){
    const [name, setName] = useState("Guest");
    const [quantity, setQuantity] = useState("1");
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("");
    const [shipping, setShiping] = useState("Delivery");

    function handleShipping(event: any){
        setShiping(event.target.value);
    }

    function handlePaymentMethod(event: any){
        setPayment(event.target.value);
    }

    function handleComment(event:any){
        setComment(event.target.value);
    }

    function toHandleQuantityChange(event: any){
        setQuantity(event.target.value);
    }

    function handleNameChange(event:any){
        setName(event.target.value);
    }



    return(
        <div>
            <input value = {name} onChange={handleNameChange}></input>
            <p>Name: {name}</p>

            <input value = {quantity} onChange={toHandleQuantityChange} type ="number"></input>
            <p>Quantity: {quantity}</p>

            <textarea value ={comment} onChange={handleComment} placeholder="Enter delivery instruction"/>
            <p>Comment: {comment}</p>

            <select value={payment} onChange={handlePaymentMethod}>
                <option value=" ">Select an option</option>
                <option value="VISA">VISA</option>
                <option value="MasterCard">Master Card</option>
                <option value="GiftCard">Gift Card</option>
            </select>

            <p>Payment method: {payment}</p>

            <label>
                <input type = "radio" value = "Pick Up" checked = {shipping === "Pick Up"}
                onChange={handleShipping}/>
                Pick Up
            </label><br/>
            <label>
                <input type = "radio" value = "Delivery" checked = {shipping === "Delivery"}
                onChange={handleShipping}/>
                Delivery
            </label>

            <p>Shipping: {shipping}</p>

        </div>
    );
}
export default MyComponent;