import { useState } from "react"
import { addNPC } from "../../Managers/NPCManager";
import { addPOINPC } from "../../Managers/POINPCsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const NPCCreateForm = ({ handleModalClose, pOIId, modalIsOpen }) => {
    const [newNPC, setNewNPC] = useState({
        name: "",
        description: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        const NPCToSendToAPI = {
            Name: newNPC.name,
            Description: newNPC.description
        }
        addNPC(NPCToSendToAPI)
            .then((npcId) => {
                if (npcId) {
                    const POINPCToSendToAPI = {
                        POIId: pOIId,
                        NPCId: npcId
                    }
                    addPOINPC(POINPCToSendToAPI)
                }
            })
            .then(() => {
                handleModalClose()
            })
            .then(() => {
                setNewNPC({
                    name: "",
                    description: ""
                })
            })
            .catch((error) => {
                console.error("Error adding new NPC:", error);
            })
    }

    return (
        <Modal centered isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader className="poi-details-modal-header" toggle={handleModalClose}>New NPC</ModalHeader>
            <ModalBody className="poi-details-modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={newNPC.name}
                            onChange={
                                (event) => {
                                    const copy = { ...newNPC }
                                    copy.name = event.target.value
                                    setNewNPC(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={newNPC.description}
                            onChange={
                                (event) => {
                                    const copy = { ...newNPC }
                                    copy.description = event.target.value
                                    setNewNPC(copy)
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