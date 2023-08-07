import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getPOIbyId } from "../../Managers/POIManager";
import { NPCCreateForm } from "./NPCCreateForm";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { deleteNPC, getAllNPCs } from "../../Managers/NPCManager";
import './POI.css'
import { NPCEditForm } from "./NPCEditForm";
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { deleteQuest, getAllQuests } from "../../Managers/QuestManager";
import { QuestForm } from "./QuestCreateForm";

export const POIDetails = () => {
    const [POI, setPOI] = useState([]);
    const [POINPCs, setPOINPCs] = useState([]);
    const [NPCs, setNPCs] = useState([]);
    const [POIQuests, setPOIQuests] = useState([]);
    const [Quests, setQuests] = useState([]);
    const [editNPC, setEditNPC] = useState(null);
    const [editQuest, setEditQuest] = useState(null);
    const { id } = useParams();
    const [newNPCModalIsOpen, setNewNPCModalIsOpen] = useState(false);
    const [editNPCModalIsOpen, setEditNPCModalIsOpen] = useState(false);
    const [showNPCDeleteConfirmationModal, setShowNPCDeleteConfirmationModal] = useState(false);
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

    const handleNewNPCModalOpen = () => {
        setNewNPCModalIsOpen(true);
    }
    const handleEditNPCModalOpen = (npc) => {
        setEditNPC(npc)
        setEditNPCModalIsOpen(true);
    }

    const handleNewNPCModalClose = () => {
        setNewNPCModalIsOpen(false);
        getAllPOINPCsByPOIId(id).then((poiNPCdata) => {
            setPOINPCs(poiNPCdata)
        })
        getAllNPCs()
            .then((npcs) => {
                setNPCs(npcs)
            })
    };
    const handleEditNPCModalClose = () => {
        setEditNPCModalIsOpen(false);
        getAllPOINPCsByPOIId(id).then((poiNPCdata) => {
            setPOINPCs(poiNPCdata)
        })
        getAllNPCs()
            .then((npcs) => {
                setNPCs(npcs)
            })
    };

    const handleNPCDelete = (npcId) => {
        deleteNPC(npcId)
        getAllPOINPCsByPOIId(id).then((poiNPCdata) => {
            setPOINPCs(poiNPCdata)
        })
        getAllNPCs()
            .then((npcs) => {
                setNPCs(npcs)
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
                                    <Button color="link" size="sm" className="delete-button" onClick={() => handleEditNPCModalOpen(npc)}>Edit</Button>
                                    <Button color="link" size="sm" className="delete-button" onClick={() => setShowNPCDeleteConfirmationModal(true)}>Delete</Button>
                                </div>
                                <Modal centered isOpen={showNPCDeleteConfirmationModal} toggle={() => setShowNPCDeleteConfirmationModal(false)}>
                                    <ModalHeader toggle={() => setShowNPCDeleteConfirmationModal(false)}></ModalHeader>
                                    <ModalBody>
                                        Are you ABSOLUTELY SURE you want to delete your NPC "{npc?.name}"?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onClick={() => handleNPCDelete(npc.id)}>Delete</Button>{' '}
                                        <Button color="secondary" onClick={() => setShowNPCDeleteConfirmationModal(false)}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <NPCEditForm handleModalClose={handleEditNPCModalClose} npcId={editNPC?.id} modalIsOpen={editNPCModalIsOpen} />
                        </Card>
                    )
                })}
                <Button onClick={handleNewNPCModalOpen}>Add NPC</Button>
                <NPCCreateForm handleModalClose={handleNewNPCModalClose} pOIId={id} modalIsOpen={newNPCModalIsOpen} />
            </Container>
            <Container>
                <h2>Quests</h2>
                <Button onClick={handleNewQuestModalOpen}>Add Quest</Button>
                <QuestForm handleModalClose={handleNewQuestModalClose} pOIId={id} modalIsOpen={newQuestModalIsOpen} />
            </Container>
        </>
    )
}