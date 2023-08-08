import { useState } from "react"
import { getAllPOINotableLocationsByPOIId } from "../../Managers/POINotableLocationsManager";
import { getAllNotableLocations } from "../../Managers/NotableLocationManager";
import { Button } from "reactstrap";
import { NotableLocationCreateForm } from "./NotableLocationCreateForm";

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
            <Button onClick={handleNewLocationModalOpen}>Add Notable Location</Button>
            <NotableLocationCreateForm
                handleModalClose={handleNewLocationModalClose}
                pOIId={pOIId}
                modalIsOpen={newLocationModalIsOpen}
            />
        </>
    )
}