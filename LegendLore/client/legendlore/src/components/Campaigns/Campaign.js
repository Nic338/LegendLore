import { Link } from "react-router-dom";
import { Button, CardBody, CardSubtitle, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./Campaign.css";
import { deleteCampaign, getAllUsersCampaigns } from "../../Managers/CampaignManager";
import { useState } from "react";

export const Campaign = ({ campaignProp, setUserCampaign }) => {
    const createDateTime = new Date(campaignProp.createDateTime);
    const formattedCreationDate = createDateTime.toLocaleDateString();
    const localLegendLoreUser = localStorage.getItem("userProfile");
    const legendLoreUserObject = JSON.parse(localLegendLoreUser);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
        deleteCampaign(campaignProp.id)
            .then(getAllUsersCampaigns(legendLoreUserObject.id))
            .then(onDeleteSuccess())
            .then(() => setShowConfirmationModal(false))
    };

    return (
        <CardBody>
            <div>
                <Link to={`/campaign/${campaignProp.id}`}>
                    <CardTitle tag="h5" className="campaign-title">{campaignProp.title}</CardTitle>
                </Link>
                <CardSubtitle>{campaignProp.description}</CardSubtitle>
                <div>Created: {formattedCreationDate}</div>
            </div>
            <Button className="campaign-button" onClick={handleDeleteButton}>Delete Campaign</Button>
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
        </CardBody>
    )
}