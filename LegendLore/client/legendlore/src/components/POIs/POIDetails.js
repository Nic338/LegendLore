import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getPOIbyId } from "../../Managers/POIManager";

export const POIDetails = () => {
    const [POI, setPOI] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getPOIbyId(id).then((poi) => {
            setPOI(poi)})
    },[])
    if (!POI) {
        return null;
    }
    return <></>
}