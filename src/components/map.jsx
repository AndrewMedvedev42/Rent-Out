import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { ApartmentSection } from "./appartment-section";
import firebase from "../util/firebase";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { loadHouse } from "../redux/actions/actions";

export const Map = () => {
    const dispatch = useDispatch()
    const [arrayOfNotes, setArrayOfNotes] = useState([])
    const houseDetails = useSelector((state) => state.house)

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

    const getHouseInfo = (id) => {
        dispatch(loadHouse(id))
    }

    return (
        <section className="interactive-section">
    `        <MapContainer
                className="map" 
                center={[51.5035, -0.08758]} 
                zoom={14} 
                minZoom={10} 
                maxZoom={18}
                // scrollWheelZoom={false}
                // attributionControl={false}
                // zoomControl={false}
                zoomEnd={()=>{console.log("lol");}}>
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
                                    getHouseInfo(item.itemKey)
                                },
                            }}>
                        </Marker>
                    )
                })
            )}
                <MyComponent />
            </MapContainer>
            <ApartmentSection itemId={houseDetails.id}/>
        </section>
    )
}

function MyComponent() {
    const dispatch = useDispatch()
    const [zoomLevel, setZoomLevel] = useState(15); // initial zoom level provided for MapContainer
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    console.log(zoomLevel);

    useEffect(()=>{
        if (zoomLevel <= 10) {
            // console.log("worked");
            dispatch(loadHouse("-MrX3Xu7t1mD4VLfbrPD"))
        }
    },[zoomLevel])

    return null
}