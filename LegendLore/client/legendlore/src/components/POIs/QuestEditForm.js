import { useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { editQuest } from "../../Managers/QuestManager";

export const QuestEditForm = ({ handleModalClose, modalIsOpen, questToEdit }) => {
    const [editedQuest, setEditedQuest] = useState({
        title: "",
        description: "",
        reward: ""
    })

    useEffect(() => {
        if (questToEdit) {
            setEditedQuest({
                title: questToEdit.title,
                description: questToEdit.description,
                reward: questToEdit.reward
            })
        }
    }, [questToEdit]);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const QuestToSendToAPI = {
            Id: parseInt(questToEdit.id),
            Title: editedQuest.title,
            Description: editedQuest.description,
            Reward: editedQuest.reward
        }
        editQuest(QuestToSendToAPI)
            .then(() => {
                handleModalClose()
            })
            .catch((error) => {
                console.error("Error editing Quest:", error);
            })
    }

    return (
        <Modal isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader toggle={handleModalClose}>Edit your Quest Hook</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={editedQuest.title}
                            onChange={
                                (event) => {
                                    const copy = { ...editedQuest }
                                    copy.title = event.target.value
                                    setEditedQuest(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={editedQuest.description}
                            onChange={
                                (event) => {
                                    const copy = { ...editedQuest }
                                    copy.description = event.target.value
                                    setEditedQuest(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reward">Reward:</label>
                        <input
                            type="text"
                            id="reward"
                            className="form-control"
                            value={editedQuest.reward}
                            onChange={
                                (event) => {
                                    const copy = { ...editedQuest }
                                    copy.reward = event.target.value
                                    setEditedQuest(copy)
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