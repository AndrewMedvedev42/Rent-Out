import firebase from "../util/firebase";
import { useEffect, useState } from "react";

export const SubmitApartmentSection = () => {

    const [houseTitle, setHouseTitle] = useState("HouseTitle4")
    const [coordinates, setCoordinates] = useState("[51.501, -0.082]")
    const houseApartmentList = [
        {title:"Apartment Name 1", price:"999 $", descriptin:"Lorem ipsum", image:"#"},
        {title:"Apartment Name 2", price:"77 $", descriptin:"Lorem ipsum", image:"#"},
        {title:"Apartment Name 3", price:"999 $", descriptin:"Lorem ipsum", image:"#"}
    ]

    function idGenerator() {
        let S4 = () => {
           return (((1+Math.random())*0x10)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    const submitHouse = () => {
        const fireRef = firebase.database().ref("apartment-list")
        const data = {
            id:idGenerator(),
            title:houseTitle,
            coordinates:coordinates,
            apartments:houseApartmentList
            
        }
        fireRef.push(data)
    }

    const chooseCoordinates = (a) => {
        setCoordinates(JSON.parse(a.target.value))
    }

    return (<section className="submit-house-section">
                <div className="input-container">
                    <div>
                        <label htmlFor="">House Title:</label>
                        <input type="text" placeholder="title" onChange={(e)=>{setHouseTitle(e.target.value)}}/>
                    </div>
                    <div>
                        <label htmlFor="">House Location:</label>
                        <select onChange={chooseCoordinates}>
                            <option value="[51.5029, -0.08]">House 1</option>
                            <option value="[51.5035, -0.08758]">House 2</option>
                            <option value="[51.5015, -0.08758]">House 3</option>
                            <option value="[51.5023, -0.0896]">House 4</option>
                            <option value="[51.5011, -0.088]">House 5</option>
                        </select>
                    </div>
                    <button onClick={submitHouse}>Submit</button>
                </div>
        </section>)
}