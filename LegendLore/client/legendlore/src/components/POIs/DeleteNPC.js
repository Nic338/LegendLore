import { useState } from "react";
import { deleteNPC, getAllNPCs } from "../../Managers/NPCManager";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const DeleteNPC = ({ pOIId, npcProp, setPOINPCs, setNPCs }) => {
    const [showNPCDeleteConfirmationModal, setShowNPCDeleteConfirmationModal] = useState(false);

    const handleNPCDelete = (npcId) => {
        deleteNPC(npcId)
            .then(() => {
                setShowNPCDeleteConfirmationModal(false)
                return getAllPOINPCsByPOIId(pOIId);
            })
            .then((poiNPCdata) => {
                setPOINPCs(poiNPCdata)
                return getAllNPCs();
            })
            .then((npcs) => {
                setNPCs(npcs);
            })
            .catch((error) => {
                console.error("Error deleting NPC:", error);
            });
    }
    return (
        <>
            <FontAwesomeIcon icon={faTrash} title="Delete" style={{ cursor: "pointer" }} onClick={() => setShowNPCDeleteConfirmationModal(true)} />
            <Modal centered isOpen={showNPCDeleteConfirmationModal} toggle={() => setShowNPCDeleteConfirmationModal(false)}>
                <ModalHeader className="poi-details-modal-header" toggle={() => setShowNPCDeleteConfirmationModal(false)}></ModalHeader>
                <ModalBody className="poi-details-modal-body">
                    Are you ABSOLUTELY SURE you want to delete your NPC "{npcProp?.name}"?
                </ModalBody>
                <ModalFooter className="poi-details-modal-footer">
                    <Button color="danger" onClick={() => handleNPCDelete(npcProp.id)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => setShowNPCDeleteConfirmationModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )

}