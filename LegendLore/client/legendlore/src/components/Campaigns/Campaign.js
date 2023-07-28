import { Link } from "react-router-dom";
import { CardBody, CardSubtitle, CardTitle } from "reactstrap";

export const Campaign = ({ campaignProp }) => {
    const createDateTime = new Date(campaignProp.createDateTime);
    const formattedCreationDate = createDateTime.toLocaleDateString();

    return (
        <CardBody>
            <div>
                <Link to={`/campaign/${campaignProp.id}`}>
                    <CardTitle tag="h5" className="post-title">{campaignProp.title}</CardTitle>
                </Link>
                <CardSubtitle>{campaignProp.description}</CardSubtitle>
                <div>Created: {formattedCreationDate}</div>
            </div>
        </CardBody>
    )
}