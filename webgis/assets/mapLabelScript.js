var basemapAPI = 'https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/basemap/wgs84/{z}/{x}/{y}.png';
var labelAPI = 'https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/label/hk/en/wgs84/{z}/{x}/{y}.png';
var attributionInfo = '<a href="https://api.portal.hkmapservice.gov.hk/disclaimer" target="_blank" class="copyrightDiv">&copy; Map infortmation from Lands Department</a><div style="width:28px;height:28px;display:inline-flex;background:url(https://api.hkmapservice.gov.hk/mapapi/landsdlogo.jpg);background-size:28px;"></div>';
var attribution = new ol.control.Attribution({
    collapsible: false            
});          
            
var map = new ol.Map({
    controls: ol.control.defaults.defaults({attribution: false}).extend([new ol.control.Attribution({collapsible: false})]),     			
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
            url: basemapAPI,
			attributions: attributionInfo			
            })
        }),
                    
        new ol.layer.Tile({
            source: new ol.source.XYZ({
            url: labelAPI
            })
        })
    ],
                
    target: 'map',
	logo: false,
    view: new ol.View({
        center: ol.proj.fromLonLat([114.139759, 22.322180]),
            zoom: 14,
            minZoom: 10,
            maxZoom: 20
        })
});

var pointFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([114.139759, 22.322180]))
  });
  
  var pointStyle = new ol.style.Style({
    image: new ol.style.Icon({
      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction'
    })
  });
  
  pointFeature.setStyle(pointStyle);
  
  var vectorSource = new ol.source.Vector({
    features: [pointFeature]
  });
  
  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });
  
  map.addLayer(vectorLayer);