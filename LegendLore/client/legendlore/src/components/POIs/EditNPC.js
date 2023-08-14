import { Button } from "reactstrap";
import { NPCEditForm } from "./NPCEditForm";
import { useEffect, useState } from "react";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { getAllNPCs, getNPCbyId } from "../../Managers/NPCManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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
            <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: "pointer" }} title="Edit" onClick={() => handleEditNPCModalOpen(npcProp)} />
            <NPCEditForm
                handleModalClose={handleEditNPCModalClose}
                npcToEdit={editNPC}
                modalIsOpen={editNPCModalIsOpen}
            />
        </>
    )
}