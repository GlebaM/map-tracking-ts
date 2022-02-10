export const getData = async () => {
  const url = "https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE";
  const res = fetch(url)
    .then((resp) => resp.json())
    .then(({ objects }) => {
      return objects;
    });

  const points = await res.then((objects) =>
    objects.map((item: any) => ({
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
      carType: item.type,
      range: item.rangeKm,
    }))
  );

  return { points };
};

export const getPoiData = async () => {
  const url = `https://dev.vozilla.pl/api-client-portal/map?objectType=POI`;
  const res = fetch(url)
    .then((resp) => resp.json())
    .then(({ objects }) => {
      return objects;
    });

  const pointsPoi = await res.then((objects) =>
    objects.map((item: any) => ({
      address: item.address.city,
      category: item.category,
      type: item.discriminator,
      pointId: item.id,
      geometry: {
        type: "Point",
        coordinates: [item.location.longitude, item.location.latitude],
      },
      properties: { cluster: false },
      name: item.name,
    }))
  );

  return { pointsPoi };
};
// export const getData = async () => {
//   const url = "http://localhost:8000/vehicles";
//   const res = fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => {
//       return data;
//     });

//   const points = await res.then((objects) =>
//     objects.map((item: any) => ({
//       name: item.name,
//       type: item.discriminator,
//       properties: { cluster: false },
//       status: item.status,
//       battery: item.batteryLevelPct,
//       pointId: item.id,
//       geometry: {
//         type: "Point",
//         coordinates: [item.location.longitude, item.location.latitude],
//       },
//       carType: item.type,
//       range: item.rangeKm,
//     }))
//   );

//   return { points };
// };

// export const getPoiData = async () => {
//   const url = `http://localhost:8000/poi`;
//   const res = fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => {
//       return data;
//     });
//
//   const pointsPoi = await res.then((objects) =>
//     objects.map((item: any) => ({
//       address: item.address.city,
//       category: item.category,
//       type: item.discriminator,
//       pointId: item.id, //eufshkuhiushvd
//       geometry: {
//         type: "Point",
//         coordinates: [item.location.longitude, item.location.latitude],
//       },
//       properties: { cluster: false },
//       name: item.name,
//     }))
//   );

//   return { pointsPoi };
// };
