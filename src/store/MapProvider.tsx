import { useReducer, useEffect, useCallback } from "react";
import React from "react";
import MapContext from "./map-context";
import { getData, getPoiData } from "../hooks/useApi";

const defaultMapState: DefaultStateType = {
  clusters: [],
  filteredClusters: [],
  poi: [],
};

const mapReducer = (state: DefaultStateType, action: any) => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        clusters: action.payload.clusters,
      };
    }

    case "ADD_POI": {
      return {
        ...state,
        poi: action.payload.points,
      };
    }

    case "FILTER_FORM": {
      let newFilteredClusters = [...state.clusters];
      newFilteredClusters = newFilteredClusters.filter(
        (item) =>
          (action.payload.isAvailable
            ? item.status.toLowerCase() === "available"
            : item.status.toLowerCase() === "unavailable") &&
          item.battery <= action.payload.batteryLevel &&
          item
      );

      return {
        ...state,
        batteryLevel: action.payload.batteryLevel,
        filteredClusters: [...newFilteredClusters],
      };
    }
    default: {
      return defaultMapState;
    }
  }
};

const MapProvider: React.FC = (props) => {
  const [mapState, dispatchMapAction] = useReducer(mapReducer, defaultMapState);

  const addClustersHandler = (clusters: PointTypes[]) => {
    dispatchMapAction({ type: "ADD", payload: { clusters } });
  };
  const addPoiHandler = (points: any) => {
    dispatchMapAction({ type: "ADD_POI", payload: { points } });
  };

  const filterFormHandler = useCallback(
    (isAvailable: boolean, batteryLevel: number) => {
      dispatchMapAction({
        type: "FILTER_FORM",
        payload: {
          isAvailable,
          batteryLevel,
        },
      });
    },
    []
  );

  useEffect(() => {
    (async () => {
      const { points } = await getData();
      addClustersHandler(points);
      const { pointsPoi } = await getPoiData();
      addPoiHandler(pointsPoi);
    })();
  }, []);

  const mapContext = {
    addClusters: addClustersHandler,
    filterForm: filterFormHandler,
    clusters: mapState.clusters,
    filteredClusters: mapState.filteredClusters,
    poi: mapState.poi,
  };

  return (
    <MapContext.Provider value={mapContext}>
      {props.children}
    </MapContext.Provider>
  );
};

export default MapProvider;
