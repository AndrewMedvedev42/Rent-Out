import firebase from "../util/firebase";
import { useEffect, useState } from "react";

export const SubmitApartmentPage = () => {

    const [houseTitle, setHouseTitle] = useState("HouseTitle4")
    const [coordinates, setCoordinates] = useState([51.501, -0.082])
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

    return (<section>
                <form action="">
                    <input type="text" placeholder="title" onChange={(e)=>{setHouseTitle(e.target.value)}}/>
                    {/* <select name="" id="">
                        <option value="[51.502, -0.088]"></option>
                        <option value="[51.5025, -0.082]"></option>
                    </select> */}
                    <button onClick={submitHouse}>Submit</button>
                </form>
        </section>)
}