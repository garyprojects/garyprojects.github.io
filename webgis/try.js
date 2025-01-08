// Leaflet API

const geoJSONLayer = L.geoJSON();
const layers = L.layerGroup();

axios.get("./output.json").then((response) => {
  const data = response.data;
  geoJSONLayer.addData(data);

  // Method 1 加入圖層
  //geoJSONLayer.addTo(lMap);

  // Method 2
  layers.addLayer(geoJSONLayer).addTo(lMap);

  const bounds = geoJSONLayer.getBounds();
  lMap.fitBounds(bounds);

  // Add click event listener to geoJSON layer
  geoJSONLayer.on('click', (e) => {
    const layer = e.layer;
    const feature = layer.feature;
    const xpPurpose = feature.properties.XP_Purpose;
    const startDate = feature.properties.Start_Date;
    const endDate = feature.properties.End_Date;
    const formattedStartDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`;
    const formattedEndDate = `${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`;
    const popupContent = `
      <b>Purpose:</b> ${xpPurpose}<br>
      <b>Start Date:</b> ${formattedStartDate}<br>
      <b>End Date:</b> ${formattedEndDate}
    `;
    layer.bindPopup(popupContent).openPopup();
  });
});

//清除圖層
//layers.removeLayer(geoJSONLayer)