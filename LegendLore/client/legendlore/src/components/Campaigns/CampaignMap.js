import { MapContainer, ImageOverlay, useMap } from "react-leaflet"
import "./Campaign.css";
import { useEffect, useState } from "react";
import { getMapById } from "../../Managers/MapManager";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapImageOverlay } from "./MapImageOverlay";

export const CampaignMap = () => {
    const [mapObject, setMapObject] = useState({});
    const [mapPOIs, setMapPOIs] = useState([]);
    const [addingPOIForm, setAddingPOIForm] = useState(false);
    const { mapId } = useParams();
    const referencePoint = [50, -100];

    useEffect(() => {
        getMapById(mapId)
        .then((map) => {
            setMapObject(map)
        })
    }, [mapId])


const handleMapClickEvent = (e) => {
    e.preventDefault()
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    const POItoSendtoAPI = {

    }
}

    if (!mapObject) {
        return <div>LOADING....</div>
    }
    else {
        //moved ImageOverlay to a child component because useMap can only be used in a component wrapped within a MapContainer
        return (
            <MapContainer className="map-container" id="mapId" zoom={3} center={referencePoint}>
                {mapObject && mapObject.mapImage && mapObject.width && mapObject.height && (
                    <MapImageOverlay mapObject={mapObject}/>
                )}
            </MapContainer>
        );
    }
}