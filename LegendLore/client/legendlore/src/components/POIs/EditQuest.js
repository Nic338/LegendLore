import { useEffect, useState } from "react";
import { getAllQuests, getQuestbyId } from "../../Managers/QuestManager";
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { QuestEditForm } from "./QuestEditForm";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export const EditQuest = ({ pOIId, questProp, setQuests, setPOIQuests }) => {
    const [editQuest, setEditQuest] = useState(null);
    const [editQuestModalIsOpen, setEditQuestModalIsOpen] = useState(false);

    useEffect(() => {
        if (questProp) {
            getQuestbyId(questProp.id).then((res) => {
                setEditQuest(res)
            })
        }
    }, [questProp])

    const handleEditQuestModalOpen = (quest) => {
        setEditQuest(quest)
        setEditQuestModalIsOpen(true);
    }

    const handleEditQuestModalClose = () => {
        setEditQuestModalIsOpen(false);
        getAllPOIQuestsByPOIId(pOIId).then((poiQuestdata) => {
            setPOIQuests(poiQuestdata)
        })
        getAllQuests()
            .then((quests) => {
                setQuests(quests)
            })
    };
    return (
        <>
            <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: "pointer" }} title="Edit" onClick={() => handleEditQuestModalOpen(questProp)} />
            <QuestEditForm
                handleModalClose={handleEditQuestModalClose}
                questToEdit={editQuest}
                modalIsOpen={editQuestModalIsOpen} />
        </>
    )

}