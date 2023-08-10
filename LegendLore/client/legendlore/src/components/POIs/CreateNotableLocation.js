import { useState } from "react"
import { getAllPOINotableLocationsByPOIId } from "../../Managers/POINotableLocationsManager";
import { getAllNotableLocations } from "../../Managers/NotableLocationManager";
import { Button } from "reactstrap";
import { NotableLocationCreateForm } from "./NotableLocationCreateForm";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CreateNotableLocation = ({ pOIId, setLocations, setPOILocations }) => {
    const [newLocationModalIsOpen, setNewLocationModalIsOpen] = useState(false);

    const handleNewLocationModalOpen = () => {
        setNewLocationModalIsOpen(true);
    }

    const handleNewLocationModalClose = () => {
        setNewLocationModalIsOpen(false);

        getAllPOINotableLocationsByPOIId(pOIId)
            .then((poiLocationdata) => {
                setPOILocations(poiLocationdata);
                return getAllNotableLocations();
            })
            .then((locations) => {
                setLocations(locations);
            })
            .catch((error) => {
                console.error("Error closing modal", error)
            });
    };

    return (
        <>
            <FontAwesomeIcon icon={faSquarePlus} size="xl" title="Add a new Notable Location" onClick={handleNewLocationModalOpen}/>
            <NotableLocationCreateForm
                handleModalClose={handleNewLocationModalClose}
                pOIId={pOIId}
                modalIsOpen={newLocationModalIsOpen}
            />
        </>
    )
}