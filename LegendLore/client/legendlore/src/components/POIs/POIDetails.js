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

export const POIDetails = () => {
    const [POI, setPOI] = useState([]);
    const [POINPCs, setPOINPCs] = useState([]);
    const [NPCs, setNPCs] = useState([]);
    const [POIQuests, setPOIQuests] = useState([]);
    const [Quests, setQuests] = useState([]);
    const [editQuest, setEditQuest] = useState(null);
    const { id } = useParams();
    const [newQuestModalIsOpen, setNewQuestModalIsOpen] = useState(false);
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

    const handleNewQuestModalOpen = () => {
        setNewQuestModalIsOpen(true);
    }
    const handleEditQuestModalOpen = (quest) => {
        setEditQuest(quest)
        setEditQuestModalIsOpen(true);
    }

    const handleNewQuestModalClose = () => {
        setNewQuestModalIsOpen(false);
        getAllPOIQuestsByPOIId(id).then((poiQuestdata) => {
            setPOIQuests(poiQuestdata)
        })
        getAllQuests()
            .then((quests) => {
                setQuests(quests)
            })
    };
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
                <Button onClick={handleNewQuestModalOpen}>Add Quest</Button>
                <QuestForm handleModalClose={handleNewQuestModalClose} pOIId={id} modalIsOpen={newQuestModalIsOpen} />
            </Container>
        </>
    )
}