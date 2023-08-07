import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getPOIbyId } from "../../Managers/POIManager";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Container} from "reactstrap";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { getAllNPCs } from "../../Managers/NPCManager";
import './POI.css'
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { deleteQuest, getAllQuests } from "../../Managers/QuestManager";
import { QuestForm } from "./QuestCreateForm";
import { CreateNPC } from "./CreateNPC";
import { DeleteNPC } from "./DeleteNPC";
import { EditNPC } from "./EditNPC";
import { CreateQuest } from "./CreateQuest";

export const POIDetails = () => {
    const [POI, setPOI] = useState([]);
    const [POINPCs, setPOINPCs] = useState([]);
    const [NPCs, setNPCs] = useState([]);
    const [POIQuests, setPOIQuests] = useState([]);
    const [Quests, setQuests] = useState([]);
    const [editQuest, setEditQuest] = useState(null);
    const { id } = useParams();
    const [editQuestModalIsOpen, setEditQuestModalIsOpen] = useState(false);

    useEffect(() => {
        getPOIbyId(id).then((poi) => {
            setPOI(poi)
        })
    }, [id]);

    useEffect(() => {
        getAllPOINPCsByPOIId(id).then((poiNPCdata) => {
            setPOINPCs(poiNPCdata)
        })
    }, [id]);

    useEffect(() => {
        getAllNPCs()
            .then((npcs) => {
                setNPCs(npcs)
            })
    }, []);

    useEffect(() => {
        getAllPOIQuestsByPOIId(id).then((poiQuestData) => {
            setPOIQuests(poiQuestData)
        })
    },[id])

    useEffect(() => {
        getAllQuests()
        .then((quests) => {
            setQuests(quests)
        })
    },[])

    const handleEditQuestModalOpen = (quest) => {
        setEditQuest(quest)
        setEditQuestModalIsOpen(true);
    }

    const handleEditQuestModalClose = () => {
        setEditQuestModalIsOpen(false);
        getAllPOIQuestsByPOIId(id).then((poiQuestdata) => {
            setPOIQuests(poiQuestdata)
        })
        getAllQuests()
            .then((quests) => {
                setNPCs(quests)
            })
    };

    const handleQuestDelete = (questId) => {
        deleteQuest(questId)
        getAllPOIQuestsByPOIId(id).then((poiQuestdata) => {
            setPOIQuests(poiQuestdata)
        })
        getAllQuests()
            .then((quests) => {
                setNPCs(quests)
            })
    }
    return (
        <>
            <h1>{POI.name}</h1>
            <Container>
                <h2>NPCs</h2>
                {POINPCs.map(poiNPC => {
                    const npc = NPCs.find((npc) => npc.id === poiNPC.npcId)
                    return (
                        <Card key={poiNPC.id}>
                            <div className="npc-card-content">
                                <CardBody>
                                    <CardTitle>{npc?.name}</CardTitle>
                                    <CardSubtitle>{npc?.description}</CardSubtitle>
                                </CardBody>
                                <div className="npc-delete-button-container">
                                    <EditNPC pOIId={id} npcProp={npc} setNPCs={setNPCs} setPOINPCs={setPOINPCs} />
                                    <DeleteNPC pOIId={id} npcProp={npc} setNPCs={setNPCs} setPOINPCs={setPOINPCs}/>
                                </div>
                            </div>
                        </Card>
                    )
                })}
                <CreateNPC pOIId={id} setNPCs={setNPCs} setPOINPCs={setPOINPCs}/>
            </Container>
            <Container>
                <h2>Quests</h2>
                {POIQuests.map(poiQuest => {
                    const quest = Quests.find((quest) => quest.id === poiQuest.id)
                    return (
                        <Card key={poiQuest.id}>
                            <div className="quest-card-content">
                                <CardBody>
                                    <CardTitle>{quest?.title}</CardTitle>
                                    <CardSubtitle>{quest?.description}</CardSubtitle>
                                    {quest?.reward ? <CardSubtitle>{quest?.reward}</CardSubtitle> : <></>}
                                </CardBody>
                                <div className="quest-delete-button-container"></div>
                            </div>
                        </Card>
                    )
                })}
                <CreateQuest pOIId={id} setQuests={setQuests} setPOIQuests={setPOIQuests} />
            </Container>
        </>
    )
}