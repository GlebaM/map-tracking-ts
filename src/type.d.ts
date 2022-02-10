interface geometryType {
  type: string;
  coordinates: number[];
}

interface propertyType {
  cluster: boolean;
}

interface PointTypes {
  name: string;
  type: string;
  properties: propertyType;
  status: string;
  battery: number;
  pointId: number;
  geometry: geometryType;
  carType: string;
  range: nnumber;
}
interface PointPoiTypes {
  address: string;
  category: string;
  discriminator: string;
  pointId: string;
  geometry: geometryType;
  properties: propertyType;
  name: string;
}

interface ClusterTypes {
  geometry: geometryType;
  id?: number;
  properties: propertyType;
  type: string;
  battery?: number;
  name?: string;
  pointId?: number;
  status: string;
}

type ContextType = {
  clusters: PointTypes[];
  filteredClusters: PointTypes[];
  poi: PointPoiTypes[];
  addClusters: (a: PointTypes[]) => void;
  filterForm: (d: any, e: any) => void;
};

type DefaultStateType = {
  clusters: PointTypes[];
  filteredClusters: PointTypes[];
  poi: any;
};

interface markerType {
  pointCount?: number;
  arrLength: number;
  markerName?: string;
  status?: string;
  battery: number;
  carType: string;
  range: number;
  lat: number;
  lng: number;
}

interface markerPoiType {
  pointCount?: number;
  arrLength: number;
  address: string;
  category: string;
  pointId: string;
  name: string;
  lat: number;
  lng: number;
}
