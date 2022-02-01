import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";

// interface MapProps extends google.maps.MapOptions {
//   style?: { [key: string]: string };
//   className?: any;
//   onClick?: (e: google.maps.MapMouseEvent) => void;
//   onIdle?: (map: google.maps.Map) => void;
//   defaultZoom?: number;
// }

const locations = [
  { id: 1, position: { lat: 43.718234, lng: 20.363181 }, description: "any" },
  { id: 2, position: { lat: 41.563913, lng: 27.154312 }, description: "any" },
  { id: 3, position: { lat: 43.727111, lng: 20.371124 }, description: "any" },
  { id: 4, position: { lat: 43.848588, lng: 21.209834 }, description: "any" },
  { id: 5, position: { lat: 43.851702, lng: 21.216968 }, description: "any" },
  { id: 6, position: { lat: 44.671264, lng: 20.863657 }, description: "any" },
  { id: 7, position: { lat: 45.304724, lng: 28.662905 }, description: "any" },
  { id: 8, position: { lat: 46.817685, lng: 25.699196 }, description: "any" },
  { id: 9, position: { lat: 46.828611, lng: 25.790222 }, description: "any" },
  { id: 10, position: { lat: 47.753423, lng: 25.116667 }, description: "any" },
  { id: 11, position: { lat: 47.759859, lng: 25.128708 }, description: "any" },
  { id: 12, position: { lat: 47.765015, lng: 25.133858 }, description: "any" },
  { id: 13, position: { lat: 47.770104, lng: 25.143299 }, description: "any" },
  { id: 14, position: { lat: 47.773733, lng: 25.145187 }, description: "any" },
  { id: 15, position: { lat: 47.774785, lng: 25.137978 }, description: "any" },
  { id: 16, position: { lat: 47.819616, lng: 24.968119 }, description: "any" },
  { id: 17, position: { lat: 48.330766, lng: 24.695692 }, description: "any" },
  { id: 18, position: { lat: 49.927193, lng: 25.053218 }, description: "any" },
  { id: 19, position: { lat: 41.330162, lng: 24.865694 }, description: "any" },
  { id: 20, position: { lat: 42.734358, lng: 27.439506 }, description: "any" },
  { id: 22, position: { lat: 42.734358, lng: 27.501315 }, description: "any" },
  { id: 23, position: { lat: 42.735258, lng: 27.438333 }, description: "any" },
  { id: 24, position: { lat: 43.999792, lng: 20.463352 }, description: "any" },
];

const mapStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
};

const center = {
  lat: 52.2152,
  lng: 21.035,
};

// const options = {
//   imagePath:
//     "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
// };

function createKey(location: any) {
  return location.lat + location.lng;
}

const Map: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCxLuun1rx2yzU0OfWBc0QLYJmi_VU1iUM">
      <GoogleMap mapContainerStyle={mapStyle} zoom={6} center={center}>
        {/* {locations.map((item) => (
          <Marker title={item.description} position={item.position} />
        ))} */}
        <MarkerClusterer>
          {(clusterer) =>
            locations.map((item) => (
              <Marker
                key={createKey(item.position)}
                title={item.description}
                position={item.position}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};
export default Map;
