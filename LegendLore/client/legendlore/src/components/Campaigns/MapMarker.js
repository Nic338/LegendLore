import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

export const MapMarker = ({ handleMapClickEvent }) => {

    useMapEvents({
        click: handleMapClickEvent,
    });
    return null;
}