import { MapContainer } from "react-leaflet"
import "./Campaign.css";
import { useEffect, useState } from "react";
import { getMapById } from "../../Managers/MapManager";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapImageOverlay } from "./MapImageOverlay";
import { MapMarker } from "./MapMarker";
import { addMapPOI } from "../../Managers/MapPOIsManager";
import { POIForm } from "./POIForm";

export const CampaignMap = () => {
    const [mapObject, setMapObject] = useState({});
    const { mapId } = useParams();
    const referencePoint = [50, -100];
    const [mapPOIs, setMapPOIs] = useState([]);
    const [addingPOIForm, setAddingPOIForm] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedLatitude, setSelectedLatitude] = useState(null);
    const [selectedLongitude, setSelectedLongitude] = useState(null);

    useEffect(() => {
        getMapById(mapId)
            .then((map) => {
                setMapObject(map)
            })
    }, [mapId])

    const handleMapClickEvent = (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setSelectedLatitude(lat);
        setSelectedLongitude(lng);
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        // Close the modal
        setModalIsOpen(false);
        setSelectedLatitude(null);
        setSelectedLongitude(null);
    };

    if (!mapObject) {
        return <div>LOADING....</div>
    }
    else {
        //moved ImageOverlay to a child component because useMap can only be used in a component wrapped within a MapContainer
        return (
            <MapContainer className="map-container" id="mapId" zoom={3} center={referencePoint}>
                {mapObject && mapObject.mapImage && mapObject.width && mapObject.height && (
                    <MapImageOverlay mapObject={mapObject} />
                )}
                <MapMarker handleMapClickEvent={handleMapClickEvent} />
                <POIForm
                    mapId={mapId}
                    lat={selectedLatitude}
                    lng={selectedLongitude}
                    handleModalClose={handleModalClose}
                    modalIsOpen={modalIsOpen}
                />
            </MapContainer>
        );
    }
}