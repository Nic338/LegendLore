import { Button } from "reactstrap";
import { NPCEditForm } from "./NPCEditForm";
import { useEffect, useState } from "react";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { getAllNPCs, getNPCbyId } from "../../Managers/NPCManager";

export const EditNPC = ({ pOIId, npcProp, setNPCs, setPOINPCs }) => {
    const [editNPC, setEditNPC] = useState(null);
    const [editNPCModalIsOpen, setEditNPCModalIsOpen] = useState(false);

    useEffect(() => {
        if (npcProp) {
            getNPCbyId(npcProp.id).then((res) => {
                setEditNPC(res)
            })
        }
    }, [npcProp])

    const handleEditNPCModalOpen = (npcProp) => {
        setEditNPC(npcProp)
        setEditNPCModalIsOpen(true);
    }

    const handleEditNPCModalClose = () => {
        setEditNPCModalIsOpen(false);

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
            <Button color="link" size="sm" className="delete-button" onClick={() => handleEditNPCModalOpen(npcProp)}>Edit</Button>
            <NPCEditForm
                handleModalClose={handleEditNPCModalClose}
                npcToEdit={editNPC}
                modalIsOpen={editNPCModalIsOpen}
            />
        </>
    )
}