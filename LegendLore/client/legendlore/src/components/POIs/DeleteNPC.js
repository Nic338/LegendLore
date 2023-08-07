import { useState } from "react";
import { deleteNPC, getAllNPCs } from "../../Managers/NPCManager";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const DeleteNPC = ({ pOIId, npc, setPOINPCs, setNPCs }) => {
    const [showNPCDeleteConfirmationModal, setShowNPCDeleteConfirmationModal] = useState(false);

    const handleNPCDelete = (npcId) => {
        deleteNPC(npcId)
        getAllPOINPCsByPOIId(pOIId).then((poiNPCdata) => {
            setPOINPCs(poiNPCdata)
        })
        getAllNPCs()
            .then((npcs) => {
                setNPCs(npcs)
            })
    }
    return (
        <>
            <Button color="link" size="sm" className="delete-button" onClick={() => setShowNPCDeleteConfirmationModal(true)}>Delete</Button>
            <Modal centered isOpen={showNPCDeleteConfirmationModal} toggle={() => setShowNPCDeleteConfirmationModal(false)}>
                <ModalHeader toggle={() => setShowNPCDeleteConfirmationModal(false)}></ModalHeader>
                <ModalBody>
                    Are you ABSOLUTELY SURE you want to delete your NPC "{npc?.name}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => handleNPCDelete(npc.id)}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => setShowNPCDeleteConfirmationModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )

}