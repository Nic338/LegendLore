import { useState } from "react"
import { deleteNotableLocation, getAllNotableLocations } from "../../Managers/NotableLocationManager";
import { getAllPOINotableLocationsByPOIId } from "../../Managers/POINotableLocationsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const DeleteNotableLocation = ({ pOIId, locationProp, setPOILocations, setLocations }) => {
    const [showLocationDeleteConfirmationModal, setShowLocationDeleteConfirmationModal] = useState(false);

    const handleLocationDelete = (locationId) => {
        deleteNotableLocation(locationId)
            .then(() => {
                setShowLocationDeleteConfirmationModal(false)
                return getAllPOINotableLocationsByPOIId(pOIId);
            })
            .then((poiLocationdata) => {
                setPOILocations(poiLocationdata)
                return getAllNotableLocations();
            })
            .then((locations) => {
                setLocations(locations);
            })
            .catch((error) => {
                console.error("Error deleting Notable Location:", error);
            });
    };

    return (
        <>
        <Button color="link" size="sm" className="delete-button" onClick={() => setShowLocationDeleteConfirmationModal(true)}>Delete</Button>
            <Modal centered isOpen={showLocationDeleteConfirmationModal} toggle={() => setShowLocationDeleteConfirmationModal(false)}>
                <ModalHeader toggle={() => setShowLocationDeleteConfirmationModal(false)}></ModalHeader>
                <ModalBody>
                    Are you ABSOLUTELY SURE you want to delete your Notable Location "{locationProp?.name}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => handleLocationDelete(locationProp.id)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => setShowLocationDeleteConfirmationModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}