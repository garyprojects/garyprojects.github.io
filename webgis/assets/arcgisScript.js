require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Basemap",
     "esri/layers/WebTileLayer",
    "esri/rest/support/Query",
  ], function (Map, MapView, FeatureLayer, Basemap, WebTileLayer, Query) {
    
      // Create a TileLayer for your custom basemap
      var customTileLayer = new WebTileLayer({
        //url: "https://api.hkmapservice.gov.hk/ags/map/basemap/WGS84?key=84d61c19659a4cc7afe7cda7a903deb6"
        urlTemplate: 'https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/basemap/wgs84/{z}/{x}/{y}.png'
      });

      // Create a Basemap with the TileLayer
      var customBasemap = new Basemap({
        baseLayers: [customTileLayer]
      });

      // Create the Map with the custom basemap
      var map = new Map({
        basemap: customBasemap
      });

    // Create the MapView
    var view = new MapView({
      container: "viewDiv", // Reference to the DOM element that will hold the view
      map: map, // Reference to the map object created before the view
      center: [114.208, 22.25], // Longitude, latitude
      zoom: 12 // Zoom level
    });

    // URL to the Feature Layer
    var featureLayerUrl = "https://portal.csdi.gov.hk/server/rest/services/common/landsd_rcd_1648571595120_89752/FeatureServer";

    // Create the FeatureLayer
    //var featureLayer = new FeatureLayer({
    //  url: featureLayerUrl,
    //  definitionExpression: "DISTRICT LIKE 'STH' OR DISTRICT LIKE 'WC' OR DISTRICT LIKE 'CW' OR DISTRICT LIKE 'WC' OR DISTRICT LIKE 'EST'",
    //});
    
    // Add the FeatureLayer to the map
    map.add(featureLayer);		
  });