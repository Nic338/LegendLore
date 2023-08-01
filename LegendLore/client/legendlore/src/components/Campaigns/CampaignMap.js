import { MapContainer, TileLayer, Marker, Popup, ImageOverlay } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { Icon } from "leaflet";
import { getMapById } from "../../Managers/MapManager";
import { useParams } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const CampaignMap = () => {
    const [mapObject, setMapObject] = useState({});
    const [mapPOIs, setMapPOIs] = useState([]);
    const { mapId } = useParams();
    const referencePoint = [50, -100];
    const pixelsPerUnit = 3;
    
    useEffect(() => {
        getMapById(mapId)
        .then((map) => {
            setMapObject(map)
            console.log(imageWidth)
            console.log(imageHeight)
        })
    }, [mapId])
    
    const imageWidth = mapObject.width;
    const imageHeight = mapObject.height;
    const aspectRatio = imageWidth / imageHeight;
    const topLeftLatLng = [
        referencePoint[0] + (0 - imageHeight / 2) / pixelsPerUnit,
        referencePoint[1] + (0 - imageWidth / 2) / (pixelsPerUnit * aspectRatio),
      ];
      const bottomRightLatLng = [
        referencePoint[0] + (imageHeight / 2) / pixelsPerUnit,
        referencePoint[1] + (imageWidth / 2) / (pixelsPerUnit * aspectRatio),
      ];
    const bounds = [topLeftLatLng, bottomRightLatLng]
    if (!mapObject) {
        return <div>LOADING....</div>
    }
    else {
        return (
            <MapContainer id="mapId" zoom={3} center={referencePoint}>
                {mapObject && mapObject.mapImage && (
                    <ImageOverlay url={mapObject.mapImage} bounds={bounds} />
                )}
            </MapContainer>
        );
    }
}