import { useState } from "react";
import { NPCCreateForm } from "./NPCCreateForm"
import { getAllNPCs } from "../../Managers/NPCManager";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { Button } from "reactstrap";

export const CreateNPC = ({ pOIId, setNPCs, setPOINPCs }) => {
    const [newNPCModalIsOpen, setNewNPCModalIsOpen] = useState(false);


    const handleNewNPCModalOpen = () => {
        setNewNPCModalIsOpen(true);
    }

    const handleNewNPCModalClose = () => {
        setNewNPCModalIsOpen(false);
    
        getAllPOINPCsByPOIId(pOIId)
            .then((poiNPCdata) => {
                setPOINPCs(poiNPCdata);
                return getAllNPCs();
            })
            .then((npcs) => {
                setNPCs(npcs);
            })
            .catch((error) => {
                console.error("Error closing modal:", error);
            });
    };

    return (
        <>
            <Button onClick={handleNewNPCModalOpen}>Add NPC</Button>
            <NPCCreateForm
                handleModalClose={handleNewNPCModalClose}
                pOIId={pOIId}
                modalIsOpen={newNPCModalIsOpen}
            />
        </>
    )
}