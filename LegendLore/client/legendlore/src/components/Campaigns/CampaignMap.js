import { MapContainer, ImageOverlay, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getMapById } from "../../Managers/MapManager";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapImageOverlay } from "./MapImageOverlay";

export const CampaignMap = () => {
    const [mapObject, setMapObject] = useState({});
    const [mapPOIs, setMapPOIs] = useState([]);
    const { mapId } = useParams();
    const referencePoint = [50, -100];

    useEffect(() => {
        getMapById(mapId)
        .then((map) => {
            setMapObject(map)
        })
    }, [mapId])

    if (!mapObject) {
        return <div>LOADING....</div>
    }
    else {
        //moved ImageOverlay to a child component because useMap can only be used in a component wrapped within a MapContainer
        return (
            <MapContainer id="mapId" zoom={3} center={referencePoint}>
                {mapObject && mapObject.mapImage && mapObject.width && mapObject.height && (
                    <MapImageOverlay mapObject={mapObject}/>
                )}
            </MapContainer>
        );
    }
}