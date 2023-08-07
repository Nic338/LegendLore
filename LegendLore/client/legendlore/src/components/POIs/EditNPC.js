import { Button } from "reactstrap";
import { NPCEditForm } from "./NPCEditForm";
import { useState } from "react";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { getAllNPCs } from "../../Managers/NPCManager";

export const EditNPC = ({pOIId, npcProp, setNPCs, setPOINPCs }) => {
    const [editNPC, setEditNPC] = useState(null);
    const [editNPCModalIsOpen, setEditNPCModalIsOpen] = useState(false);

    const handleEditNPCModalOpen = (npcProp) => {
        setEditNPC(npcProp)
        setEditNPCModalIsOpen(true);
    }

    const handleEditNPCModalClose = () => {
        setEditNPCModalIsOpen(false);
        getAllPOINPCsByPOIId(pOIId).then((poiNPCdata) => {
            setPOINPCs(poiNPCdata)
        })
        getAllNPCs()
            .then((npcs) => {
                setNPCs(npcs)
            })
    };
    return (
        <>
        <Button color="link" size="sm" className="delete-button" onClick={() => handleEditNPCModalOpen(npcProp)}>Edit</Button>
        <NPCEditForm handleModalClose={handleEditNPCModalClose} npcId={editNPC?.id} modalIsOpen={editNPCModalIsOpen}/>
        </>
    )
}