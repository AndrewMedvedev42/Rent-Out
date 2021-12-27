import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { loadHouse } from "../redux/actions/actions";
import firebase from "../util/firebase";
import 'firebase/compat/database'

export const ApartmentSection = ({itemIdList}) => {
    const [note, setNote] = useState([])
    const fireRef = firebase.database().ref("apartment-list")

    useEffect(()=>{
        fireRef.on("value", (snapshot)=>{
            const ListOfnotes = snapshot.val()
            const sortedHouses = []
            itemIdList.flat().forEach(item=>{
                sortedHouses.push(ListOfnotes[item])
            })
            setNote(sortedHouses)
        })
    },[itemIdList])

    return (
        <ul className="appartment-list">
            {
                note.length ? (
                    note.map(item=>{
                        return (
                            <li key={item.id} className="appartment-card">
                                <h2>{item.houseTitle}</h2>
                                {
                                    item.apartments.map(item=>{
                                        return(
                                            <article>
                                                <img src={item.image}/>
                                                <h1>{item.price}</h1>
                                                <h3>{item.apartmentTitle}</h3>
                                                <p>{item.description}</p>
                                            </article>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                ):""
            }
        </ul>
    )
}