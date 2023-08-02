import { useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { addPOI } from "../../Managers/POIManager"
import { addMapPOI } from "../../Managers/MapPOIsManager"

export const POIForm = ({ modalIsOpen, handleModalClose, mapId, lat, lng }) => {
    const [newPOI, setNewPOI] = useState({
        name: "",
        description: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        const POIToSendToAPI = {
            Name: newPOI.name,
            Description: newPOI.description
        }
        addPOI(POIToSendToAPI)
            .then((pOIId) => {
                if (pOIId) {
                    const MapPOIToSendToAPI = {
                        Latitude: lat,
                        Longitude: lng,
                        POIId: pOIId,
                        MapId: mapId
                    }
                    addMapPOI(MapPOIToSendToAPI)
                }
            })
            .catch((error) => {
                // Handle error when adding POI
                console.error("Error adding POI:", error);
            })
    }



    return (
        <Modal isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader toggle={handleModalClose}>New POI</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={newPOI.name}
                            onChange={
                                (event) => {
                                    const copy = { ...newPOI }
                                    copy.name = event.target.value
                                    setNewPOI(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={newPOI.description}
                            onChange={
                                (event) => {
                                    const copy = { ...newPOI }
                                    copy.description = event.target.value
                                    setNewPOI(copy)
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
    );
}