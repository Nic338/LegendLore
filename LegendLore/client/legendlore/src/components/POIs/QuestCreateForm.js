import { useState } from "react";
import { addQuest } from "../../Managers/QuestManager";
import { addPOIQuest } from "../../Managers/POIQuestsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const QuestCreateForm = ({ handleModalClose, pOIId, modalIsOpen }) => {
    const [newQuest, setNewQuest] = useState({
        title: "",
        description: "",
        reward: ""
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        const QuestToSendToAPI = {
            Title: newQuest.title,
            Description: newQuest.description,
            Reward: newQuest.reward
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
            .then(() => {
                setNewQuest({
                    title: "",
                    description: "",
                    reward: ""
                })
            })
            .catch((error) => {
                console.error("Error adding new quest hook:", error);
            })
    }

    return (
        <Modal centered isOpen={modalIsOpen} toggle={handleModalClose}>
            <ModalHeader className="poi-details-modal-header" toggle={handleModalClose}>New Quest Hook</ModalHeader>
            <ModalBody className="poi-details-modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Title:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={newQuest.title}
                            onChange={
                                (event) => {
                                    const copy = { ...newQuest }
                                    copy.title = event.target.value
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