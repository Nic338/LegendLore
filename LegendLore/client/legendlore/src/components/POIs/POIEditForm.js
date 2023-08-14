import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editPOI, getPOIbyId } from "../../Managers/POIManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const POIEditForm = () => {
    const { poiId } = useParams();
    const navigate = useNavigate();
    const [editedPOI, setEditedPOI] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        getPOIbyId(poiId).then((res) => {
            setEditedPOI(res)
        })
    }, [poiId])

    if (!editedPOI) {
        return null;
    }

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const POItoEdit = {
            Id: parseInt(poiId),
            Name: editedPOI.name,
            Description: editedPOI.description
        }
        editPOI(POItoEdit)
            .then(() => {
                navigate(`/poi/${poiId}`)
            })
    }

    const handleGoBackButtonClick = (e) => {
        e.preventDefault()
        navigate(`/poi/${poiId}`)
    }

    return (
        <Form className="poi-form">
            <h2 className="poi-form-title">Point of Interest Edit</h2>
            <FormGroup className="form-group">
                <Label htmlFor="name">Name:</Label>
                <Input
                    className="poi-input"
                    type="text"
                    id="name"
                    value={editedPOI.name}
                    onChange={
                        (event) => {
                            const copy = { ...editedPOI }
                            copy.name = event.target.value
                            setEditedPOI(copy)
                        }
                    } />
            </FormGroup>
            <FormGroup className="form-group">
                <Label htmlFor="description">Description:</Label>
                <Input
                    className="poi-input"
                    type="textarea"
                    id="description"
                    value={editedPOI.description}
                    onChange={
                        (event) => {
                            const copy = { ...editedPOI }
                            copy.description = event.target.value
                            setEditedPOI(copy)
                        }
                    } />
            </FormGroup>
            <FormGroup className="form-group button-group">
                <Button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">Save POI Information</Button>
                <Button className="poi-edit-goback-button" onClick={(clickEvent) => handleGoBackButtonClick(clickEvent)}>Go Back</Button>
            </FormGroup>
        </Form>
    )
}