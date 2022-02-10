import { useRef, useState, useCallback, useContext } from "react";
import GoogleMapRect from "google-map-react";
import Marker from "./Marker";
import styles from "./Maps.module.scss";
import MapContext from "../../store/map-context";
import useSupercluster from "use-supercluster";
import MarkerPoi from "./MarkerPoi";

const MapNew = () => {
  const mapRef = useRef();
  const [zoom, setZoom] = useState<number>(6);
  const [bounds, setBounds] = useState<number[] | null>(null);
  const mapCtx = useContext(MapContext);

  // Get POI clusters
  const { clusters: poiClusters } = useSupercluster({
    points: mapCtx.poi,
    bounds,
    zoom,
    options: { radius: 175, maxZoom: 18 },
  });
  console.log(poiClusters);
  console.log(mapCtx.poi);

  // Get clusters
  const { clusters } = useSupercluster({
    points: mapCtx.filteredClusters ? mapCtx.filteredClusters : mapCtx.clusters,
    bounds,
    zoom,
    options: { radius: 55, maxZoom: 20 },
  });
  console.log(clusters);

  return (
    <div className={styles["map-wrapper"]}>
      <GoogleMapRect
        // bootstrapURLKeys={{ key: process.env.GOOGLE_KEY }}
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
        {clusters.map((cluster, _i, arr) => {
          const [longitude, latitude] = cluster.geometry.coordinates;

          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          const properties = {
            pointCount: pointCount,
            arrLength: arr.length,
            markerName: cluster.name,
            status: cluster?.status,
            battery: cluster.battery,
            carType: cluster.carType,
            range: cluster.range,
          };

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                lat={latitude}
                lng={longitude}
                {...properties}
              />
            );
          }

          return (
            <Marker
              key={cluster.pointId}
              lat={latitude}
              lng={longitude}
              {...properties}
            />
          );
        })}

        {poiClusters.map((cluster, _i, arr) => {
          const [longitude, latitude] = cluster.geometry.coordinates;

          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          const properties = {
            pointCount: pointCount,
            arrLength: arr.length,
            address: cluster.address,
            category: cluster.category,
            pointId: cluster.pointId,
            name: cluster.name,
          };

          if (isCluster) {
            return (
              <MarkerPoi
                key={cluster.id}
                lat={latitude}
                lng={longitude}
                {...properties}
              />
            );
          }

          return (
            <MarkerPoi
              key={cluster.pointId}
              lat={latitude}
              lng={longitude}
              {...properties}
            />
          );
        })}
      </GoogleMapRect>
    </div>
  );
};

export default MapNew;
