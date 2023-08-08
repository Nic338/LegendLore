import { useState } from "react"
import { deleteQuest, getAllQuests } from "../../Managers/QuestManager";
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const DeleteQuest = ({ pOIId, questProp, setPOIQuests, setQuests }) => {
    const [showQuestDeleteConfirmationModal, setShowQuestDeleteConfirmationModal] = useState(false);

    const handleQuestDelete = (questId) => {
        deleteQuest(questId)
            .then(() => {
                setShowQuestDeleteConfirmationModal(false)
                return getAllPOIQuestsByPOIId(pOIId);
            })
            .then((poiQuestdata) => {
                setPOIQuests(poiQuestdata)
                return getAllQuests();
            })
            .then((quests) => {
                setQuests(quests);
            })
            .catch((error) => {
                console.error("Error deleting quest:", error);
            });
    }

    return (
        <>
            <Button color="link" size="sm" className="delete-button" onClick={() => setShowQuestDeleteConfirmationModal(true)}>Delete</Button>
            <Modal centered isOpen={showQuestDeleteConfirmationModal} toggle={() => setShowQuestDeleteConfirmationModal(false)}>
                <ModalHeader toggle={() => setShowQuestDeleteConfirmationModal(false)}></ModalHeader>
                <ModalBody>
                    Are you ABSOLUTELY SURE you want to delete your quest hook "{questProp?.title}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => handleQuestDelete(questProp.id)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => setShowQuestDeleteConfirmationModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}