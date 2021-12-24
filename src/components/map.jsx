import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { ApartmentSection } from "./appartment-section";
import firebase from "../util/firebase";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { loadHouse } from "../redux/actions/actions";

export const Map = () => {
    const dispatch = useDispatch()
    const [arrayOfNote, setArrayOfNote] = useState([])
    const houseDetails = useSelector((state) => state.house)

    useEffect(()=>{
        const fireRef = firebase.database().ref("apartment-list")
        fireRef.on("value", (snapshot)=>{
            const ListOfnotes = snapshot.val()
            const array = []
            const idArray = []
            for (let id in ListOfnotes) {
                ListOfnotes[id].itemKey = id
                array.push(ListOfnotes[id])
                idArray.push(id)
            }
            setArrayOfNote(array)
            dispatch(loadHouse(idArray))
        })
    },[])

    const getHouseInfo = (id) => {
        dispatch(loadHouse([id]))
    }
    return (
        <section className="interactive-section">
    `        <MapContainer
                className="map" 
                center={[51.5035, -0.08758]} 
                zoom={10} 
                minZoom={10} 
                maxZoom={18}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    arrayOfNote.length && (
                        arrayOfNote.map((item, index)=>{
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
                    )
                }
                <MyComponent />
            </MapContainer>
            <ApartmentSection itemIdList={[houseDetails.id]}/>
        </section>
    )
}

function MyComponent() {
    const dispatch = useDispatch()
    const [zoomLevel, setZoomLevel] = useState(10); // initial zoom level provided for MapContainer
    const [arrayOfNotes, setArrayOfNotes] = useState([])

    const half = Math.ceil(arrayOfNotes.length / 2); 
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    useEffect(()=>{
        
        const fireRef = firebase.database().ref("apartment-list")
        fireRef.on("value", (snapshot)=>{
            const ListOfnotes = snapshot.val()
            const array = []
            for (let id in ListOfnotes) {
                ListOfnotes[id].itemKey = id
                array.push(id)
            }
            setArrayOfNotes(array)
        })
    },[])

    useEffect(()=>{
        if (zoomLevel >= 10 && zoomLevel < 13) {
            dispatch(loadHouse(arrayOfNotes))
        }else if(zoomLevel > 13 && zoomLevel <= 16){
            dispatch(loadHouse(arrayOfNotes.slice(0, half)))
        }else if(zoomLevel > 16 && zoomLevel <= 18){
            dispatch(loadHouse(arrayOfNotes[0]))
        }
    },[zoomLevel])

    return null
}