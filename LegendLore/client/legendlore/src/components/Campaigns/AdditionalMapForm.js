import { useState } from "react"
import { addMap, uploadMapImage } from "../../Managers/MapManager";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Campaign.css";

export const AdditionalMapForm = () => {
    const [newMap, updateNewMap] = useState({
        name: "",
        mapImage: "",
        campaignId: null,
        width: null,
        height: null
    })
    const [selectedImage, setSelectedImage] = useState(null);
    const { campaignId } = useParams();
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        try {
            const res = await uploadMapImage(file);
            const data = await res.json();
            if (data.imageUrl) {
                const copy = { ...newMap }
                copy.mapImage = data.imageUrl
                copy.width = data.width
                copy.height = data.height
                updateNewMap(copy);
            }
            else {
                alert("Image Upload Failed")
            }
        } catch (error) {
            console.error("Error uploading map image: ", error);
            alert("An error occured during the map image upload");
        }
    };

    const handleSaveButtonClick = (e) => {
        e.preventDefault();
        const mapToSendToAPI = {
            Name: newMap.name,
            MapImage: newMap.mapImage,
            CampaignId: campaignId,
            Width: newMap.width,
            Height: newMap.height
        }
        addMap(mapToSendToAPI)
            .then(navigate('/my-campaigns'))
    }

    const handleGoBackButtonClick = (e) => {
        e.preventDefault()
        navigate("/my-campaigns")
    }

    return (
        <Form className="campaign-form">
            <h2 className="campaign-form-title">Add A New Map</h2>
            <FormGroup className="form-group">
                <Label htmlFor="map-name">What is the Name of your Map?</Label>
                <Input
                    className="campaign-input"
                    type="text"
                    id="title"
                    value={newMap.name}
                    onChange={
                        (event) => {
                            const copy = { ...newMap }
                            copy.name = event.target.value
                            updateNewMap(copy)
                        }
                    } />
            </FormGroup>
            <FormGroup className="form-group">
                <Label htmlFor="map-image">Upload a Map Image</Label>
                <Input
                    className="campaign-input"
                    type="file"
                    id="map-image"
                    onChange={handleImageChange} />
                {selectedImage && <p>Selected Image: {selectedImage}</p>}
            </FormGroup>
            <FormGroup className="form-group">
                <Button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save New Map</Button>
                <Button className="campaign-edit-goback-button" onClick={(clickEvent) => handleGoBackButtonClick(clickEvent)}>Go Back</Button>
            </FormGroup>

        </Form>
    )
}