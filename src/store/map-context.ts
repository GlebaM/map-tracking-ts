import React from "react";

const MapContext = React.createContext<ContextType>({
  clusters: [],
  filteredClusters: [],
  poi: [],
  addClusters: (a) => {},
  filterForm: (d, e) => {},
});

export default MapContext;
