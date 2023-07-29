import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editCampaign, getCampaignById } from "../../Managers/CampaignManager";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import "./Campaign.css";

export const CampaignEdit = () => {
    const localLegendLoreUser = localStorage.getItem("userProfile");
    const legendLoreUserObject = JSON.parse(localLegendLoreUser);
    const { campaignId } = useParams();
    const navigate = useNavigate();

    const [editedCampaign, setEditedCampaign] = useState({
        title: "",
        description: "",
        map: "",
        userProfileId: legendLoreUserObject.id,
        createDateTime: Date.now()
    })

    useEffect(() => {
        getCampaignById(campaignId).then((res) => {
            setEditedCampaign(res)
        })
    },[campaignId])
    if(!editedCampaign) {
        return null;
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const campaignToEdit = {
            Id: parseInt(campaignId),
            Title: editedCampaign.title,
            Description: editedCampaign.description,
            Map: editedCampaign.map,
            CreateDateTime: editedCampaign.createDateTime,
            userProfileId: legendLoreUserObject.id
        }
        return editCampaign(campaignToEdit)
            .then(() => {
                navigate(`/my-campaigns`)
            })
    }
    const handleGoBackButtonClick = (e) => {
        e.preventDefault()
        navigate("/my-campaigns")
    }

    return (
        <Form className="campaign-form">
            <h2 className="campaign-form-title">Campaign Edit</h2>
                <FormGroup className="form-group">
                    <Label htmlFor="title">Title:</Label>
                    <Input
                        className="campaign-input"
                        type="text"
                        id="title"
                        value={editedCampaign.title}
                        onChange={
                            (event) => {
                                const copy = { ...editedCampaign }
                                copy.title = event.target.value
                                setEditedCampaign(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label htmlFor="description">Description:</Label>
                    <Input
                        className="campaign-input"
                        type="textarea"
                        id="description"
                        value={editedCampaign.description}
                        onChange={
                            (event) => {
                                const copy = { ...editedCampaign }
                                copy.description = event.target.value
                                setEditedCampaign(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup className="form-group">
            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save Campaign Information</Button>
        <Button onClick={(clickEvent) => handleGoBackButtonClick(clickEvent)}>Go Back</Button>
                </FormGroup>
        </Form>
    )
}