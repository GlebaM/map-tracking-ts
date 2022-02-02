import useSwr from "swr";
import useSupercluster from "use-supercluster";

const fetcher = (...args: any) =>
  fetch(args).then((response) => response.json());

export const useGetData = (bounds: any, zoom: number) => {
  //Data loaded from server
  const url = "https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE";
  const { data, error } = useSwr(url, fetcher);
  const dataPoints = data && !error ? data.objects.slice() : [];
  const points = dataPoints.map((item: any) => ({
    name: item.name,
    type: item.discriminator,
    properties: { cluster: false },
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

  return { clusters };
};
