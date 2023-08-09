import { Link, useNavigate } from "react-router-dom";
import { Button, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./Campaign.css";
import { deleteCampaign, getAllUsersCampaigns } from "../../Managers/CampaignManager";
import { useState, useEffect } from "react";
import { deleteMap, getMapsByCampaign } from "../../Managers/MapManager";

export const Campaign = ({ campaignProp, setUserCampaign }) => {
    const createDateTime = new Date(campaignProp.createDateTime);
    const formattedCreationDate = createDateTime.toLocaleDateString();
    const localLegendLoreUser = localStorage.getItem("userProfile");
    const legendLoreUserObject = JSON.parse(localLegendLoreUser);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showMapSelectModal, setShowMapSelectModal] = useState(false);
    const [campaignMap, setCampaignMap] = useState([]);
    const [selectedMapId, setSelectedMapId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getMapsByCampaign(campaignProp.id)
            .then((data) => {
                setCampaignMap(data)
            })
            .catch((error) => {
                console.log("Error fetching campaign maps", error);
            });
    }, [campaignProp.id])

    const handleDeleteButton = (e) => {
        e.preventDefault()
        setShowConfirmationModal(true)
    };

    const onDeleteSuccess = () => {
        getAllUsersCampaigns(legendLoreUserObject.id)
            .then((data) => {
                setUserCampaign(data);
            })
            .catch((error) => {
                console.log("Error fetching user campaigns:", error);
            });
    };

    const handleDelete = (e) => {
        e.preventDefault()
            deleteMap(campaignProp.id)
            .then(deleteCampaign(campaignProp.id))
            .then(getAllUsersCampaigns(legendLoreUserObject.id))
            .then(onDeleteSuccess())
            .then(() => setShowConfirmationModal(false))
    };

    const handleMapSelection = (mapId) => {
        setSelectedMapId(mapId)
        setShowMapSelectModal(false)
        navigate(`/campaigns/${campaignProp.id}/${mapId}`)
    }

    return (
        <CardBody>
            <div>
                <Link onClick={() => setShowMapSelectModal(true)}>
                    <CardTitle tag="h5" className="campaign-title">{campaignProp.title}</CardTitle>
                </Link>
                <CardSubtitle className="mb-2 mt-3 text-muted">{campaignProp.description}</CardSubtitle>
                <div>Created: {formattedCreationDate}</div>
            </div>
            <div className="button-group">
                <Button size="sm" color="link" className="btn edit-campaign-button" tag={Link} to={`/my-campaigns/edit/${campaignProp.id}`}>Edit Campaign Info</Button>
                <Button size="sm" color="link" className="btn delete-campaign-button" onClick={handleDeleteButton}>Delete Campaign</Button>
            </div>
            <Modal centered isOpen={showConfirmationModal} toggle={() => setShowConfirmationModal(false)}>
                <ModalHeader toggle={() => setShowConfirmationModal(false)}></ModalHeader>
                <ModalBody>
                    Are you sure you want to delete your campaign "{campaignProp.title}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
                    <Button color="secondary" onClick={() => setShowConfirmationModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal centered isOpen={showMapSelectModal} toggle={() => setShowMapSelectModal(false)}>
                <ModalHeader toggle={() => setShowMapSelectModal(false)}></ModalHeader>
                <ModalBody className="map-select-modal">
                    <select
                        className="map-select"
                        value={selectedMapId || ""}
                        onChange={(e) => handleMapSelection(e.target.value)}>
                        <option value="">Select A Map</option>
                        {campaignMap.map((map) => (
                            <option key={map.id} value={map.id}>{map.name}</option>
                        ))}
                    </select>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setShowMapSelectModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </CardBody>
    )
}