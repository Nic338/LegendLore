import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPOIbyId } from "../../Managers/POIManager";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Container } from "reactstrap";
import { getAllNPCs } from "../../Managers/NPCManager";
import { getAllQuests } from "../../Managers/QuestManager";
import { getAllNotableLocations } from "../../Managers/NotableLocationManager";
import { getAllPOINPCsByPOIId } from "../../Managers/POINPCsManager";
import { getAllPOIQuestsByPOIId } from "../../Managers/POIQuestsManager";
import { getAllPOINotableLocationsByPOIId } from "../../Managers/POINotableLocationsManager";
import { CreateNPC } from "./CreateNPC";
import { DeleteNPC } from "./DeleteNPC";
import { EditNPC } from "./EditNPC";
import { CreateQuest } from "./CreateQuest";
import { EditQuest } from "./EditQuest";
import { DeleteQuest } from "./DeleteQuest";
import './POI.css'
import { CreateNotableLocation } from "./CreateNotableLocation";
import { EditNotableLocation } from "./EditNotableLocation";
import { DeleteNotableLocation } from "./DeleteNotableLocation";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const POIDetails = () => {
    const [POI, setPOI] = useState([]);
    const [POINPCs, setPOINPCs] = useState([]);
    const [NPCs, setNPCs] = useState([]);
    const [POIQuests, setPOIQuests] = useState([]);
    const [Quests, setQuests] = useState([]);
    const [POILocations, setPOILocations] = useState([]);
    const [Locations, setLocations] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getPOIbyId(id).then((poi) => {
            setPOI(poi)
        })
            .then(() => {
                getAllPOINPCsByPOIId(id).then((poiNPCdata) => {
                    setPOINPCs(poiNPCdata)
                })
            })
            .then(() => {
                getAllPOIQuestsByPOIId(id).then((poiQuestData) => {
                    setPOIQuests(poiQuestData)
                })
            })
            .then(() => {
                getAllPOINotableLocationsByPOIId(id).then((poiLocationdata) => {
                    setPOILocations(poiLocationdata)
                })
            })
    }, [id]);

    // useEffect(() => {
    //     getAllPOINPCsByPOIId(id).then((poiNPCdata) => {
    //         setPOINPCs(poiNPCdata)
    //     })
    // }, [id]);

    useEffect(() => {
        getAllNPCs()
            .then((npcs) => {
                setNPCs(npcs)
            })
        getAllQuests()
            .then((quests) => {
                setQuests(quests)
            })
        getAllNotableLocations()
            .then((notableLocations) => {
                setLocations(notableLocations)
            })
    }, []);

    // useEffect(() => {
    //     getAllPOIQuestsByPOIId(id).then((poiQuestData) => {
    //         setPOIQuests(poiQuestData)
    //     })
    // }, [id])

    // useEffect(() => {
    //     getAllQuests()
    //         .then((quests) => {
    //             setQuests(quests)
    //         })
    // }, []);

    // useEffect(() => {
    //     getAllPOINotableLocationsByPOIId(id).then((poiLocationdata) => {
    //         setPOILocations(poiLocationdata)
    //     })
    // }, [id]);

    // useEffect(() => {
    //     getAllNotableLocations()
    //         .then((notableLocations) => {
    //             setLocations(notableLocations)
    //         })
    // }, []);

    return (
        <div className="poi-info-container">
            <div className="poi-page">
                <div className="go-back-button">
                    <Button style={{ textDecoration: 'none', fontWeight: 'bold', textShadow: '2px 2px 4px rgb(255, 255, 255)' }} size="lg" color="black" onClick={() => navigate(-1)}>Back to the Map</Button>
                </div>
                <div className="poi-header">
                    <h1 className="poi-header-name">{POI.name}</h1>
                    <h4 className="poi-subheader-description">{POI.description}</h4>
                    <FontAwesomeIcon icon={faPenToSquare} style={{ cursor: "pointer" }} title="Edit" onClick={() => navigate(`/poi/edit/${id}`)} />
                </div>
                <div className="details-container">
                    <Container className="location-container">
                        <h2 className="poi-header">Notable Locations</h2>
                        {POILocations.map(poiLocation => {
                            const location = Locations.find((location) => location.id === poiLocation.notableLocationId)
                            return (
                                <Card key={poiLocation.id} className="poi-card">
                                    <div className="location-card-content">
                                        <CardBody>
                                            <CardTitle className="poi-card-title">{location?.name}</CardTitle>
                                            <CardSubtitle className="poi-card-subtitle">{location?.description}</CardSubtitle>
                                        </CardBody>
                                        <div className="poi-delete-button-container">
                                            <EditNotableLocation pOIId={id} locationProp={location} setLocations={setLocations} setPOILocations={setPOILocations} />
                                            <DeleteNotableLocation pOIId={id} locationProp={location} setLocations={setLocations} setPOILocations={setPOILocations} />
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                        <CreateNotableLocation pOIId={id} setLocations={setLocations} setPOILocations={setPOILocations} />
                    </Container>
                    <Container className="npc-container">
                        <h2 className="poi-header">NPCs</h2>
                        {POINPCs.map(poiNPC => {
                            const npc = NPCs.find((npc) => npc.id === poiNPC.npcId)
                            return (
                                <Card key={poiNPC.id} className="poi-card">
                                    <div className="npc-card-content">
                                        <CardBody>
                                            <CardTitle className="poi-card-title">{npc?.name}</CardTitle>
                                            <CardSubtitle className="poi-card-subtitle">{npc?.description}</CardSubtitle>
                                        </CardBody>
                                        <div className="poi-delete-button-container">
                                            <EditNPC pOIId={id} npcProp={npc} setNPCs={setNPCs} setPOINPCs={setPOINPCs} />
                                            <DeleteNPC pOIId={id} npcProp={npc} setNPCs={setNPCs} setPOINPCs={setPOINPCs} />
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                        <CreateNPC pOIId={id} setNPCs={setNPCs} setPOINPCs={setPOINPCs} />
                    </Container>
                        </div>
                    <Container className="quest-container">
                        <h2 className="poi-header">Quests</h2>
                        {POIQuests.map(poiQuest => {
                            const quest = Quests.find((quest) => quest.id === poiQuest.questId)
                            return (
                                <Card key={poiQuest.id} className="poi-card">
                                    <div className="quest-card-content">
                                        <CardBody>
                                            <CardTitle className="poi-card-title">{quest?.title}</CardTitle>
                                            <CardSubtitle className="poi-card-subtitle">{quest?.description}</CardSubtitle>
                                            {quest?.reward ? <CardSubtitle className="poi-quest-reward">Rewards: </CardSubtitle> : <></>}
                                            {quest?.reward ? <CardSubtitle className="poi-quest-reward">{quest?.reward}</CardSubtitle> : <></>}
                                        </CardBody>
                                        <div className="poi-delete-button-container"></div>
                                        <EditQuest pOIId={id} questProp={quest} setQuests={setQuests} setPOIQuests={setPOIQuests} />
                                        <DeleteQuest pOIId={id} questProp={quest} setQuests={setQuests} setPOIQuests={setPOIQuests} />
                                    </div>
                                </Card>
                            )
                        })}
                        <CreateQuest pOIId={id} setQuests={setQuests} setPOIQuests={setPOIQuests} />
                    </Container>
            </div>
        </div>
    )
}