import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { ApartmentCard } from "./appartment-card";

import firebase from "../util/firebase";
import { useEffect, useState } from "react";
import 'firebase/compat/database'

export const Map = () => {
    const [arrayOfNotes, setArrayOfNotes] = useState([])

    

    useEffect(()=>{
        const fireRef = firebase.database().ref("apartment-list")
        fireRef.on("value", (snapshot)=>{
            const ListOfnotes = snapshot.val()
            const array = []
            for (let id in ListOfnotes) {
                ListOfnotes[id].itemKey = id
                array.unshift(ListOfnotes[id])
            }
            setArrayOfNotes(array)
        })
    },[])
    
console.log(arrayOfNotes);
    return (
        <section className="interactive-section">
    `        <MapContainer className="map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {arrayOfNotes.length && (
                    arrayOfNotes.map(item=>{
                        return (<Marker position={[item["coordinates-1"], item["coordinates-2"]]}>
                            <Popup>
                                {item.desc}
                            </Popup>
                        </Marker>)
                    })
                )}

            </MapContainer>
            <article className="appartments-section">
                <ApartmentCard/>
            </article>
        </section>
    )
}