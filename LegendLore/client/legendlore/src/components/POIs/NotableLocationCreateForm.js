import { useState } from "react"
import { addNotableLocation } from "../../Managers/NotableLocationManager";
import { addPOINotableLocation } from "../../Managers/POINotableLocationsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const NotableLocationCreateForm = ({ handleModalClose, pOIId, modalIsOpen }) => {
    const [newLocation, setNewLocation] = useState({
        name: "",
        description: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        const LocationToSendToAPI = {
            Name: newLocation.name,
            Description: newLocation.description
        }
        addNotableLocation(LocationToSendToAPI)
            .then((locationId) => {
                if (locationId) {
                    const POILocationToSendToAPI = {
                        POIId: pOIId,
                        NotableLocationId: locationId
                    }
                    addPOINotableLocation(POILocationToSendToAPI)
                }
            })
            .then(() => {
                handleModalClose();
            })
            .then(() => {
                setNewLocation({
                    name: "",
                    description: ""
                })
            })
            .catch((error) => {
                console.error("Error adding new Notable Location", error);
            })
    }

    return (
        <Modal centered isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader className="poi-details-modal-header" toggle={handleModalClose}>New Notable Location</ModalHeader>
            <ModalBody className="poi-details-modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={newLocation.name}
                            onChange={
                                (event) => {
                                    const copy = { ...newLocation }
                                    copy.name = event.target.value
                                    setNewLocation(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={newLocation.description}
                            onChange={
                                (event) => {
                                    const copy = { ...newLocation }
                                    copy.description = event.target.value
                                    setNewLocation(copy)
                                }
                            }
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter className="poi-details-modal-footer">
                <Button color="primary" onClick={handleSaveButtonClick}>
                    Save
                </Button>
                <Button color="secondary" onClick={handleModalClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}