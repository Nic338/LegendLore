import { useState } from "react";
import { deleteNPC, getAllNPCs } from "../../Managers/NPCManager";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

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
            <Button color="link" size="sm" className="delete-button" onClick={() => setShowNPCDeleteConfirmationModal(true)}>Delete</Button>
            <Modal centered isOpen={showNPCDeleteConfirmationModal} toggle={() => setShowNPCDeleteConfirmationModal(false)}>
                <ModalHeader toggle={() => setShowNPCDeleteConfirmationModal(false)}></ModalHeader>
                <ModalBody>
                    Are you ABSOLUTELY SURE you want to delete your NPC "{npcProp?.name}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => handleNPCDelete(npcProp.id)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => setShowNPCDeleteConfirmationModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )

}