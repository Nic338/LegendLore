import { useState } from "react";
import { addQuest } from "../../Managers/QuestManager";
import { addPOIQuest } from "../../Managers/POIQuestsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const QuestForm = ({ handleModalClose, pOIId, modalIsOpen }) => {
    const [newQuest, setNewQuest] = useState({
        title: "",
        description: "",
        reward: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        const QuestToSendToAPI = {
            Name: newQuest.name,
            Description: newQuest.description
        }
        addQuest(QuestToSendToAPI)
        .then((questId) => {
            if (questId) {
                const POIQuestToSendToAPI = {
                    POIId: pOIId,
                    QuestId: questId
                }
                addPOIQuest(POIQuestToSendToAPI)
            }
        })
            .then(() => {
                handleModalClose()
            })
            .catch((error) => {
                console.error("Error adding new NPC:", error);
            })
    }

    return (
        <Modal isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader toggle={handleModalClose}>New Quest Hook</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={newQuest.name}
                            onChange={
                                (event) => {
                                    const copy = { ...newQuest }
                                    copy.name = event.target.value
                                    setNewQuest(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            value={newQuest.description}
                            onChange={
                                (event) => {
                                    const copy = { ...newQuest }
                                    copy.description = event.target.value
                                    setNewQuest(copy)
                                }
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reward">Reward:</label>
                        <textarea
                            id="reward"
                            className="form-control"
                            value={newQuest.reward}
                            onChange={
                                (event) => {
                                    const copy = { ...newQuest }
                                    copy.reward = event.target.value
                                    setNewQuest(copy)
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