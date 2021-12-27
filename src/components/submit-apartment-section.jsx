import firebase from "../util/firebase";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

export const SubmitApartmentSection = () => {
    const [HouseList, setHouseList] = useState([])
    const [houseTitle, setHouseTitle] = useState("")
    const [houseCoordinates, setHouseCoordinates] = useState("[51.5029, -0.08]")
    const houseApartmentList = [
        {apartmentTitle:"Name 1", 
            price:"114 $", 
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            image:"https://a0.muscache.com/pictures/18addcfb-ec25-4bc7-8f04-59e7b5825a58.jpg"},

        {apartmentTitle:"Name 2", 
            price:"254 $", 
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            image:"https://a0.muscache.com/pictures/18addcfb-ec25-4bc7-8f04-59e7b5825a58.jpg"},

        {apartmentTitle:"Name 3", 
            price:"226 $", 
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
            image:"https://a0.muscache.com/pictures/18addcfb-ec25-4bc7-8f04-59e7b5825a58.jpg"}
    ]

    const history = useNavigate()

    function idGenerator() {
        let S4 = () => {
           return (((1+Math.random())*0x10)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    useEffect(()=>{
        const fireRef = firebase.database().ref("apartment-list")
        fireRef.on("value", (snapshot)=>{
            const dataBaseListOfHouses = snapshot.val()
            const array = []
            for (let id in dataBaseListOfHouses) {
                dataBaseListOfHouses[id].itemKey = id
                array.push(dataBaseListOfHouses[id])
            }
            setHouseList(array)
        })
    },[])

    const isHouseExists = () => {
        return HouseList.some(item=>item.coordinates === houseCoordinates)
    }

    const submitHouse = () => {
        const fireRef = firebase.database().ref("apartment-list")
        if (houseTitle) {
            if (!isHouseExists()) {
                const data = {
                    id:idGenerator(),
                    houseTitle:houseTitle,
                    coordinates:houseCoordinates,
                    apartments:houseApartmentList
                    
                }
                fireRef.push(data)
                history(-1)
            }else{
                alert("House already exists!")
            }  
        }else{
            alert("Please, provide a title")
        }
    }

    const chooseCoordinates = (a) => {
        setHouseCoordinates(a.target.value)
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