import { useEffect, useState } from "react"
import { getAllNotableLocations, getNotableLocationbyId } from "../../Managers/NotableLocationManager";
import { getAllPOINotableLocationsByPOIId } from "../../Managers/POINotableLocationsManager";
import { Button } from "reactstrap";
import { NotableLocationEditForm } from "./NotableLocationEditForm";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditNotableLocation = ({ locationProp, pOIId, setLocations, setPOILocations }) => {
    const [editLocation, setEditLocation] = useState(null);
    const [editLocationModalIsOpen, setEditLocationModalIsOpen] = useState(false);

    useEffect(() => {
        if (locationProp) {
            getNotableLocationbyId(locationProp.id).then((res) => {
                setEditLocation(res)
            })
        }
    }, [locationProp])

    const handleEditLocationModalOpen = (locationProp) => {
        setEditLocation(locationProp)
        setEditLocationModalIsOpen(true);
    };

    const handleEditLocationModalClose = () => {
        setEditLocationModalIsOpen(false);

        getAllPOINotableLocationsByPOIId(pOIId)
            .then((poiLocationdata) => {
                setPOILocations(poiLocationdata);
                return getAllNotableLocations();
            })
            .then((locations) => {
                setLocations(locations);
            })
            .catch((error) => {
                console.error("Error closing modal:", error);
            });
    };

    return (
        <>
        <FontAwesomeIcon icon={faPenToSquare} title="Edit" onClick={() => handleEditLocationModalOpen(locationProp)}/>
        <NotableLocationEditForm 
            handleModalClose={handleEditLocationModalClose}
            locationToEdit={editLocation}
            modalIsOpen={editLocationModalIsOpen}/>
        </>
    )

}