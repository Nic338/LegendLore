import { useState } from "react"
import { deleteQuest, getAllQuests } from "../../Managers/QuestManager";
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <FontAwesomeIcon icon={faTrash} title="Delete" style={{ cursor: "pointer" }} onClick={() => setShowQuestDeleteConfirmationModal(true)} />
            <Modal centered isOpen={showQuestDeleteConfirmationModal} toggle={() => setShowQuestDeleteConfirmationModal(false)}>
                <ModalHeader className="poi-details-modal-header" toggle={() => setShowQuestDeleteConfirmationModal(false)}></ModalHeader>
                <ModalBody className="poi-details-modal-body">
                    Are you ABSOLUTELY SURE you want to delete your quest hook "{questProp?.title}"?
                </ModalBody>
                <ModalFooter className="poi-details-modal-footer">
                    <Button color="danger" onClick={() => handleQuestDelete(questProp.id)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => setShowQuestDeleteConfirmationModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}