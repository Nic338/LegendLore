import { useState } from "react";
import { QuestCreateForm } from "./QuestCreateForm";
import { getAllQuests } from "../../Managers/QuestManager";
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { Button } from "reactstrap";

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
            <Button onClick={handleNewQuestModalOpen}>Add Quest</Button>
            <QuestCreateForm
                handleModalClose={handleNewQuestModalClose}
                pOIId={pOIId}
                modalIsOpen={newQuestModalIsOpen}
            />
        </>
    )
}