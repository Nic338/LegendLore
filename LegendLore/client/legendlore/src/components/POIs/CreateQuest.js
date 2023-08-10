import { useState } from "react";
import { QuestCreateForm } from "./QuestCreateForm";
import { getAllQuests } from "../../Managers/QuestManager";
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { Button } from "reactstrap";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CreateQuest = ({ pOIId, setQuests, setPOIQuests }) => {
    const [newQuestModalIsOpen, setNewQuestModalIsOpen] = useState(false);

    const handleNewQuestModalOpen = () => {
        setNewQuestModalIsOpen(true);
    };

    const handleNewQuestModalClose = () => {
        setNewQuestModalIsOpen(false);

        getAllPOIQuestsByPOIId(pOIId)
        .then((poiQuestdata) => {
            setPOIQuests(poiQuestdata)
            return getAllQuests();
        })
        .then((quests) => {
            setQuests(quests)
            })
        .catch((error) => {
            console.error("Error closing modal:", error);
        })
    };

    return (
        <>
            <FontAwesomeIcon icon={faSquarePlus} size="xl" title="Add a new Quest Hook" style={{cursor: "pointer"}} onClick={handleNewQuestModalOpen}/>
            <QuestCreateForm
                handleModalClose={handleNewQuestModalClose}
                pOIId={pOIId}
                modalIsOpen={newQuestModalIsOpen}
            />
        </>
    )
}