import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { ApartmentSection } from "./appartment-section";

import firebase from "../util/firebase";
import { useEffect, useState } from "react";

export const Map = () => {
    const [arrayOfNotes, setArrayOfNotes] = useState([])
    const [Id, setId] = useState("-MrSeN9MJ2kG-0SsI75e")

    

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
    return (
        <section className="interactive-section">
    `        <MapContainer className="map" center={[51.5029, -0.08]} zoom={14} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {arrayOfNotes.length && (
                arrayOfNotes.map((item, index)=>{
                    return (
                        <Marker key={index} 
                            position={item.coordinates}
                            eventHandlers={{
                                click: (e) => {
                                    setId(item.itemKey)
                                },
                            }}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    )
                })
            )}
            </MapContainer>
            <ApartmentSection itemId={Id}/>
        </section>
    )
}