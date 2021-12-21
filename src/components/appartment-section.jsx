import { useEffect, useState } from "react";
import firebase from "../util/firebase";
import 'firebase/compat/database'

export const ApartmentSection = ({itemId}) => {
    const [note, setNote] = useState()

    const fireRef = firebase.database().ref("apartment-list")

    useEffect(()=>{
        fireRef.on("value", (snapshot)=>{
            const ListOfnotes = snapshot.val()
            for (let id in ListOfnotes) {
                if(id === itemId){
                    setNote(ListOfnotes[id])
                }
            }
        })
    },[itemId])
    return (
        <article className="appartment-list">
            <h2>{itemId}</h2>
            {
                note && (
                    note.apartments.map((item, index)=>{
                        return (
                            <div key={index}>
                                <h3>{item.price}</h3>
                                <h1>{item.title}</h1>
                                <p>{item.descriptin}</p>
                            </div>
                        )
                    })
                )
            }
        </article>
    )
}