import React, { useRef, useState } from "react";
import useSwr from "swr";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GoogleMapRect from "google-map-react";
import useSupercluster from "use-supercluster";
import styles from "./MapNew.module.scss";

const fetcher = (...args: any) =>
  fetch(args).then((response) => response.json());

const Marker = ({ children }: any) => children;

const MapNew = () => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState(10);
  const [bounds, setBounds] = useState<null | GoogleMapRect.Bounds | any>(null);

  //Data loaded from server
  const url = "https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE";
  const { data, error } = useSwr(url, fetcher);
  const dataPoints = data && !error ? data.objects.slice() : [];
  const points = dataPoints.map((item: any) => ({
    cluster: false,
    name: item.name,
    type: item.discriminator,
    status: item.status,
    battery: item.batteryLevelPct,
    pointId: item.id,
    geometry: {
      type: "Point",
      coordinates: [item.location.longitude, item.location.latitude],
    },
  }));
  console.log(dataPoints);

  // Get clusters
  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 18 },
  });
  console.log(clusters);

  return (
    <div className={styles["map-wrapper"]}>
      <GoogleMapRect
        // ref={mapRef}
        // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        bootstrapURLKeys={{ key: "AIzaSyCxLuun1rx2yzU0OfWBc0QLYJmi_VU1iUM" }}
        defaultCenter={{ lat: 52.2, lng: 21 }}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={(map: any) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;

          const { cluster: isCluster, point_count: pointCout } =
            cluster.properties
              ? cluster.properties
              : { cluster: cluster, point_count: null };

          if (isCluster) {
            return (
              <Marker key={cluster.id} lat={latitude} lng={longitude}>
                <button className={styles.marker}>
                  <img src="/car.png" alt={cluster.name} />
                  <p>{pointCout}</p>
                </button>
              </Marker>
            );
          }

          return (
            <Marker key={cluster.pointId} lat={latitude} lng={longitude}>
              <button
                className={`${styles.marker} ${
                  cluster.status.toLowerCase() !== "available" &&
                  styles["marker--unavailable"]
                }`}
              >
                <img src="/car.png" alt="haha" />
              </button>
            </Marker>
          );
        })}
      </GoogleMapRect>
    </div>
  );
};

export default MapNew;
// marker--anavailable
