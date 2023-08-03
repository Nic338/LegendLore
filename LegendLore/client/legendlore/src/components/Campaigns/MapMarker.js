import { useMapEvents } from "react-leaflet";


export const MapMarker = ({ handleMapClickEvent }) => {

    useMapEvents({
        click: handleMapClickEvent,
    });

    return null;
}