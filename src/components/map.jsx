import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet'
import { ApartmentSection } from "./appartment-section";
import firebase from "../util/firebase";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { loadHouse } from "../redux/actions/actions";

export const Map = () => {
    const dispatch = useDispatch()
    const [listOfHouses, setlistOfHouses] = useState([])
    const houseDetails = useSelector((state) => state.house)

    useEffect(()=>{
        const fireRef = firebase.database().ref("apartment-list")
        fireRef.on("value", (snapshot)=>{
            const FireBaseHouseList = snapshot.val()
            const array = []
            const idArray = []
            for (let id in FireBaseHouseList) {
                FireBaseHouseList[id].itemKey = id
                array.push(FireBaseHouseList[id])
                idArray.push(id)
            }
            setlistOfHouses(array)
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
                    listOfHouses.length && (
                        listOfHouses.map((item, index)=>{
                            return (
                                <Marker key={index} 
                                    position={JSON.parse(item.coordinates)}
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
    const [zoomLevel, setZoomLevel] = useState(); 
    const [listOfHouses2, setlistOfHouses2] = useState([])

    const half = Math.ceil(listOfHouses2.length / 2); 
    
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });

    useEffect(()=>{
        
        const fireRef = firebase.database().ref("apartment-list")
        fireRef.on("value", (snapshot)=>{
            const FireBaseHouseList = snapshot.val()
            const array = []
            for (let id in FireBaseHouseList) {
                FireBaseHouseList[id].itemKey = id
                array.push(id)
            }
            setlistOfHouses2(array)
        })
    },[])

    useEffect(()=>{
        if (zoomLevel >= 10 && zoomLevel < 13) {
            dispatch(loadHouse(listOfHouses2))
        }else if(zoomLevel > 13 && zoomLevel <= 16){
            dispatch(loadHouse(listOfHouses2.slice(0, half)))
        }else if(zoomLevel > 16 && zoomLevel <= 18){
            dispatch(loadHouse(listOfHouses2[0]))
        }
    },[zoomLevel])

    return null
}