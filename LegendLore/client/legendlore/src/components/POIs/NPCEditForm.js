import { useEffect, useState } from "react"
import { editNPC } from "../../Managers/NPCManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const NPCEditForm = ({ handleModalClose, modalIsOpen, npcToEdit }) => {
    const [editedNPC, setEditedNPC] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        if (npcToEdit) {
            setEditedNPC({
                name: npcToEdit.name,
                description: npcToEdit.description
            })
        }
    }, [npcToEdit]);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const NPCToSendToAPI = {
            Id: parseInt(npcToEdit.id),
            Name: editedNPC.name,
            Description: editedNPC.description
        }
        editNPC(NPCToSendToAPI)
            .then(() => {
                handleModalClose()
            })
            .catch((error) => {
                console.error("Error editing NPC:", error);
            });
    };

    return (
        <Modal centered isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader className="poi-details-modal-header" toggle={handleModalClose}>Edit your NPC</ModalHeader>
            <ModalBody className="poi-details-modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={editedNPC.name}
                            onChange={
                                (event) => {
                                    const copy = { ...editedNPC }
                                    copy.name = event.target.value
                                    setEditedNPC(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={editedNPC.description}
                            onChange={
                                (event) => {
                                    const copy = { ...editedNPC }
                                    copy.description = event.target.value
                                    setEditedNPC(copy)
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