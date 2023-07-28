import { Link } from "react-router-dom";
import { CardBody, CardSubtitle, CardTitle } from "reactstrap";
import "./Campaign.css";

export const Campaign = ({ campaignProp }) => {
    const createDateTime = new Date(campaignProp.createDateTime);
    const formattedCreationDate = createDateTime.toLocaleDateString();

    return (
        <CardBody>
            <div>
                <Link to={`/campaign/${campaignProp.id}`}>
                    <CardTitle tag="h5" className="campaign-title">{campaignProp.title}</CardTitle>
                </Link>
                <CardSubtitle>{campaignProp.description}</CardSubtitle>
                <div>Created: {formattedCreationDate}</div>
            </div>
        </CardBody>
    )
}