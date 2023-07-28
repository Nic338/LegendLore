import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCampaign, uploadMapImage } from "../../Managers/CampaignManager";
import { Button, FormGroup, Input, Label } from "reactstrap";

export const CampaignForm = () => {
    const localLegendLoreUser = localStorage.getItem("userProfile");
    const legendLoreUserObject = JSON.parse(localLegendLoreUser);
    const navigate = useNavigate();
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    const timezoneOffset = offset * 60 * 1000;
    const correctedDate = new Date(currentDate.getTime() - timezoneOffset);
    const [selectedImage, setSelectedImage] = useState(null);

    const [newCampaign, updateNewCampaign] = useState({
        title: "",
        description: "",
        map: "",
        userProfileId: legendLoreUserObject.id,
        createDateTime: Date.now()
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const campaignToSendToAPI = {
            Title: newCampaign.title,
            Description: newCampaign.description,
            Map: newCampaign.map,
            CreateDateTime: correctedDate.toISOString(),
            userProfileId: legendLoreUserObject.id
        }
        addCampaign(campaignToSendToAPI)
        .then(navigate('/my-campaigns'));
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        try {
            const res = await uploadMapImage(file);
            const data = await res.json();
            if (data.imageUrl) {
                const copy = {...newCampaign}
                copy.map = data.imageUrl
                updateNewCampaign(copy);
            }
            else {
                alert("Image Upload Failed")
            }
        } catch (error) {
            console.error("Error uploading map image: ", error);
            alert("An error occured during the map image upload");
        }
    };

    return (
        <form className="campaign-form">
            <h2 className="campaign-form-title">Create a New Campaign</h2>
                <FormGroup className="form-group">
                    <Label htmlFor="title">Title:</Label>
                    <Input
                        className="campaign-input"
                        type="text"
                        id="title"
                        value={newCampaign.title}
                        onChange={
                            (event) => {
                                const copy = { ...newCampaign }
                                copy.title = event.target.value
                                updateNewCampaign(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label htmlFor="description">Description:</Label>
                    <Input
                        className="campaign-input"
                        type="textarea"
                        id="description"
                        value={newCampaign.description}
                        onChange={
                            (event) => {
                                const copy = { ...newCampaign }
                                copy.description = event.target.value
                                updateNewCampaign(copy)
                            }
                        } />
                </FormGroup>
                <FormGroup className="form-group">
                    <Label htmlFor="map-image">Map Image:</Label>
                    <Input
                        className="campaign-input"
                        type="file"
                        id="map-image"
                        onChange={handleImageChange} />
                        {selectedImage && <p>Selected Image: {selectedImage}</p>}
                </FormGroup>
            <Button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Add Campaign</Button>
        </form>
    )
}