import { useRef, useState, useCallback } from "react";
import GoogleMapRect from "google-map-react";
import styles from "./MapNew.module.scss";
import { useGetData } from "../../lib/api";
import Marker from "./Marker";

// const Marker = ({ children }: any) => children;

const MapNew = () => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState<number>(10);
  const [bounds, setBounds] = useState<any>(null);

  const { clusters } = useGetData(bounds, zoom);

  return (
    <div className={styles["map-wrapper"]}>
      <GoogleMapRect
        // bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        bootstrapURLKeys={{ key: "AIzaSyCxLuun1rx2yzU0OfWBc0QLYJmi_VU1iUM" }}
        defaultCenter={{ lat: 52.2, lng: 21 }}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={(map: any) => {
          mapRef.current = map;
        }}
        onChange={useCallback(({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }, [])}
      >
        {clusters.map((cluster: any, i: any, arr: any) => {
          console.log("RENDERS");
          const [longitude, latitude] = cluster.geometry.coordinates;

          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          console.log(pointCount);

          const properties = {
            pointCount: pointCount || null,
            arrLength: arr.length,
            markerName: cluster.name || null,
          };

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                lat={latitude}
                lng={longitude}
                {...properties}
              />
              //   <Marker key={cluster.id} lat={latitude} lng={longitude}>
              //     <button
              //       className={`${styles.marker} ${styles["marker--cluster"]}`}
              //       style={{
              //         width: `${32 + pointCount / arr.length}px`,
              //         height: `${32 + pointCount / arr.length}px`,
              //       }}
              //     >
              //       <img src="/m4.png" alt={cluster.name} />
              //       <p>{pointCount}</p>
              //     </button>
              //   </Marker>
            );
          }

          return (
            <Marker key={cluster.pointId} lat={latitude} lng={longitude} />
            //   <button
            //     className={`${styles.marker}  ${
            //       cluster.status.toLowerCase() !== "available" &&
            //       styles["marker--unavailable"]
            //     }`}
            //   >
            //     <img src="/car.png" alt="" />
            //   </button>
          );
        })}
      </GoogleMapRect>
    </div>
  );
};

export default MapNew;
