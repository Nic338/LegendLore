import { useEffect, useState } from "react"
import { getAllUsersCampaigns } from "../../Managers/CampaignManager";
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { Campaign } from "./Campaign";
import './Campaign.css';
import { FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";

export const UsersCampaigns = () => {
    const [userCampaign, setUserCampaign] = useState([]);
    const localLegendLoreUser = localStorage.getItem("userProfile");
    const legendLoreUserObject = JSON.parse(localLegendLoreUser);

    useEffect(() => {
        getAllUsersCampaigns(legendLoreUserObject.id)
            .then((data) => {
                setUserCampaign(data)
            })
            .catch((error) => {
                console.log("Error fetching user campaigns:", error)
            });
    }, [legendLoreUserObject.id]);

    return (
        <div className="campaign-container">
            <p className="campaign-instructions">This is your Campaigns page. Click on the Add A New Campaign button to get started</p>
            <Container className="campaign-container">
                <Row className="campaign-row">
                    <Col md={2} lg={4}>
                        <Card className="campaign-card add-campaign-card">
                            <CardBody className="add-campaign-card-body">
                                <Button tag={Link} to="/campaigns/add" className="circle-button" color="dark"><FaPlus /></Button>
                                <CardTitle tag="h5" className="add-campaign-title">Add A New Campaign</CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="campaign-row">
                    {userCampaign.map((campaign) => (
                        <Col sm={12} md={8} lg={4} key={campaign.id}>
                            <Card className="campaign-card">
                                <Campaign campaignProp={campaign} setUserCampaign={setUserCampaign} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}