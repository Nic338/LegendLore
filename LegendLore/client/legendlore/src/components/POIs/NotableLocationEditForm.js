import { useEffect, useState } from "react"
import { editNotableLocation } from "../../Managers/NotableLocationManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const NotableLocationEditForm = ({ handleModalClose, modalIsOpen, locationToEdit }) => {
    const [editedLocation, setEditedLocation] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        if (locationToEdit) {
            setEditedLocation({
                name: locationToEdit.name,
                description: locationToEdit.description
            })
        }
    },[locationToEdit]);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const LocationToSendToAPI = {
            Id: parseInt(locationToEdit.id),
            Name: editedLocation.name,
            Description: editedLocation.description
        }
        editNotableLocation(LocationToSendToAPI)
            .then(() => {
                handleModalClose()
            })
            .catch((error) => {
                console.error("Error editing Notable Location", error);
            });
    };

    return (
        <Modal isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader toggle={handleModalClose}>Edit your Notable Location</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={editedLocation.name}
                            onChange={
                                (event) => {
                                    const copy = { ...editedLocation }
                                    copy.name = event.target.value
                                    setEditedLocation(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={editedLocation.description}
                            onChange={
                                (event) => {
                                    const copy = { ...editedLocation }
                                    copy.description = event.target.value
                                    setEditedLocation(copy)
                                }
                            }
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
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