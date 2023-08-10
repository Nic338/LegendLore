import { useState } from "react";
import { NPCCreateForm } from "./NPCCreateForm"
import { getAllNPCs } from "../../Managers/NPCManager";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { Button } from "reactstrap";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <FontAwesomeIcon icon={faSquarePlus} size="xl" title="Add a new NPC" onClick={handleNewNPCModalOpen}/>
            <NPCCreateForm
                handleModalClose={handleNewNPCModalClose}
                pOIId={pOIId}
                modalIsOpen={newNPCModalIsOpen}
            />
        </>
    )
}