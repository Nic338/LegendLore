import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { getMapsByCampaign } from "../../Managers/MapManager";
import { useParams } from "react-router-dom";

export const CampaignMap = () => {
const [mapPOIs, setMapPOIs] = useState([])
const map = L.map('map', {
    crs: L.CRS.Simple
})
const { id } = useParams();

useEffect(() =>{
    getMapsByCampaign(id)
},[])

const customIcon = new Icon({
    iconUrl: "",
    //flaticon.com to find an icon?
    iconSize: [38, 38]
})

    return (
        <MapContainer id="mapId" zoom={13}>
            <TileLayer 
            attribution=""
            url=""/>
        {/* {mapPOIs.map((poi) => (
            <Marker position={poi.coordinates} icon={customIcon}>
                <Popup></Popup>
            </Marker>
        ))} */}

        </MapContainer>
    );
}