import { MapContainer, Marker, Popup } from "react-leaflet"
import "./CampaignMap.css";
import { useEffect, useState } from "react";
import { getMapById } from "../../Managers/MapManager";
import { Link, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapImageOverlay } from "./MapImageOverlay";
import { MapMarker } from "./MapMarker";
import { deleteMapPOI, getAllMapPOIsByMapId } from "../../Managers/MapPOIsManager";
import { POIForm } from "./POIForm";
import { Icon } from "leaflet";
import { getAllPOIs } from "../../Managers/POIManager";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import customMarker from '../../../src/img/point-of-interest.png'

export const CampaignMap = () => {
    const [mapObject, setMapObject] = useState({});
    const [mapPOIs, setMapPOIs] = useState([]);
    const [POIs, setPOIs] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedLatitude, setSelectedLatitude] = useState(null);
    const [selectedLongitude, setSelectedLongitude] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const referencePoint = [50, -100];
    const { mapId } = useParams();

    useEffect(() => {
        getMapById(mapId)
            .then((map) => {
                setMapObject(map)
            })
    }, [mapId]);

    useEffect(() => {
        getAllMapPOIsByMapId(mapId)
            .then((mapPOIs) => {
                setMapPOIs(mapPOIs)
            })
    }, [mapId]);

    useEffect(() => {
        getAllPOIs()
            .then((pois) => {
                setPOIs(pois)
            })
    }, []);

    const handleMapClickEvent = (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setSelectedLatitude(lat);
        setSelectedLongitude(lng);
        setModalIsOpen(true);
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        getAllMapPOIsByMapId(mapId)
            .then((mapPOIs) => {
                setMapPOIs(mapPOIs)
            })
        getAllPOIs()
            .then((pois) => {
                setPOIs(pois)
            })
        setSelectedLatitude(null);
        setSelectedLongitude(null);
    };

    const handlePOIDelete = (mapPOIId) => {
        deleteMapPOI(mapPOIId)
        getAllMapPOIsByMapId(mapId)
            .then((data) => {
                setMapPOIs(data)
            })
            .catch((error) => {
                console.log("Error fetching map POI's:", error);
            });
    }

    const customIcon = new Icon({
        iconUrl: customMarker,
        iconSize: [38, 38]
    });

    if (!mapObject) {
        return <div>LOADING....</div>
    }
    else {
        //moved ImageOverlay to a child component because useMap can only be used in a component wrapped within a MapContainer
        return (<div className="map-page-container">
            <h1 className="map-name">{mapObject.name}</h1>
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
                {mapPOIs.map(marker => {
                    const poi = POIs.find((poi) => poi.id === marker.poiId)
                    return (
                        <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={customIcon}>
                            <Popup>
                                <Card className="poi-popup-card">
                                    <CardBody>
                                        <CardTitle className="poi-popup-title">
                                            <Link to={`/poi/${poi.id}`}>
                                            {poi?.name}
                                            </Link>
                                        </CardTitle>
                                        <CardSubtitle className="poi-popup-subtitle">
                                            {poi?.description}
                                        </CardSubtitle>
                                    </CardBody>
                                    <Modal centered isOpen={showConfirmationModal} toggle={() => setShowConfirmationModal(false)}>
                                        <ModalHeader toggle={() => setShowConfirmationModal(false)}></ModalHeader>
                                        <ModalBody>
                                            Are you ABSOLUTELY SURE you want to delete your point of interest "{poi?.name}"?
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={() => handlePOIDelete(marker.id)}>Delete</Button>{' '}
                                            <Button color="secondary" onClick={() => setShowConfirmationModal(false)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                </Card>
                                <Button onClick={() => setShowConfirmationModal(true)}>Delete</Button>
                            </Popup>
                        </Marker>
                    );
                })}
                <a href="https://www.flaticon.com/free-icons/poi" title="poi icons">Poi icons created by Muhammad_Usman - Flaticon</a>
            </MapContainer>
        </div>
        );
    }
}