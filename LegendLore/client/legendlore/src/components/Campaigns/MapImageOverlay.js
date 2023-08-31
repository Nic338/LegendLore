import { ImageOverlay, useMap } from "react-leaflet";

export const MapImageOverlay = ({ mapObject }) => {
  const map = useMap();
  const imageWidth = mapObject.width;
  const imageHeight = mapObject.height;
  //aspect ratio of the map image we are using
  const aspectRatio = imageWidth / imageHeight;
  //variables used to calculate the lat/lng ranges of the visable map area
  //can only use these when useMap is imported
  const latViewRange = map.getBounds().getNorth() - map.getBounds().getSouth();
  const lngViewRange = map.getBounds().getEast() - map.getBounds().getWest();
  //aspect ratio of the visable map area
  const mapViewAspectRatio = lngViewRange / latViewRange;

  // conditional that will change the width and height based on which is larger
  //if it is wider than it is tall, use the full width and adjust the height
  //if it is taller than it is wide, use the full height and adjust the width
  let overlayWidth = null;
  let overlayHeight = null;
  if (mapViewAspectRatio > aspectRatio) {
    overlayWidth = lngViewRange;
    overlayHeight = overlayWidth / aspectRatio;
  } else {
    overlayHeight = latViewRange;
    overlayWidth = overlayHeight * aspectRatio;
  }

  // grabs the center lat/lng of the map view
  const centerLat = map.getCenter().lat;
  const centerLng = map.getCenter().lng;
  //calculate the bounds of the map image based on everything above
  const topLeftLatLng = [centerLat + overlayHeight / 2, centerLng - overlayWidth / 2];
  const bottomRightLatLng = [centerLat - overlayHeight / 2, centerLng + overlayWidth / 2];
  const bounds = [topLeftLatLng, bottomRightLatLng];

  return <ImageOverlay url={mapObject.mapImage} bounds={bounds} />
}