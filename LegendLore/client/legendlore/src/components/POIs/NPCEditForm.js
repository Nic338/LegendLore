import { useEffect, useState } from "react"
import { editNPC, getNPCbyId } from "../../Managers/NPCManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const NPCEditForm = ({ handleModalClose, modalIsOpen, npcId }) => {
    const [editedNPC, setEditedNPC] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        if (npcId) {
            getNPCbyId(npcId).then((res) => {
                setEditedNPC(res)
            })
        }
    }, [npcId])

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const NPCToSendToAPI = {
            Id: parseInt(npcId),
            Name: editedNPC.name,
            Description: editedNPC.description
        }
        editNPC(NPCToSendToAPI)
            .then(() => {
                handleModalClose()
            })
            .catch((error) => {
                console.error("Error editing NPC:", error);
            })
    }

    return (
        <Modal isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader toggle={handleModalClose}>Edit your NPC</ModalHeader>
            <ModalBody>
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