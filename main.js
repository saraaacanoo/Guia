require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/widgets/LayerList',
    'esri/renderers/UniqueValueRenderer',
    'esri/symbols/SimpleLineSymbol',
    'esri/widgets/Search',
    "esri/layers/VectorTileLayer",
    "esri/Basemap"
], (Map, MapView, FeatureLayer, LayerList, UniqueValueRenderer, SimpleLineSymbol, Search, VectorTileLayer, Basemap) => {

    const mapaBase = new VectorTileLayer({
        portalItem: {
            id: "6843b92f347a41abb378dd26ced81a94" 
        }
    });

    const customBasemap = new Basemap({
        baseLayers: [mapaBase],
        title: 'DarkSky'
    });
    
    const map = new Map({
        basemap: customBasemap
    });

    const view = new MapView({
        container: 'viewDiv',
        map: map,  
        center: [-6.6, 38.8],
        zoom: 7,
    });

    const boton = document.getElementById('Boton').addEventListener('click', ()=>{
        view.goTo({
            position:[-6.6, 39.8],
            zoom: 7,
        })
    })

    const rendererCarreterasFL = new UniqueValueRenderer({
        field: "fclass",
        uniqueValueInfos: [
            {
                value: "Vía de Autobús",
                symbol: new SimpleLineSymbol({ color: "red", width: 0.5}),
                label: "Carril Bus"
            },
            {
                value: "Carril Bici",
                symbol: new SimpleLineSymbol({ color: "blue", width: 0.5}),
                label: "Carril Bici"  
            },
            {
                value: "Senda",
                symbol: new SimpleLineSymbol({ color: "orange", width: 0.5}),
                label: "Senda"  
            },
            {
                value: "Calle Viva",
                symbol: new SimpleLineSymbol({ color: "purple", width: 0.5}),
                label: "Calle"  
            },
            {
                value: "Autovía",
                symbol: new SimpleLineSymbol({ color: "yellow", width: 0.5}),
                label: "Autovía"  
            },
            {
                value: "Intersección de Autovía",
                symbol: new SimpleLineSymbol({ color: "yellow", width: 0.5}),
                label: "Autopista Intersección"  
            },
            {
                value: "Peatonal",
                symbol: new SimpleLineSymbol({ color: "cyan", width: 0.5}),
                label: "Peatonal"  
            },
            {
                value: "Primaria",
                symbol: new SimpleLineSymbol({ color: "pink", width: 0.5}),
                label: "Carretera Principal"  
            },
            {
                value: "Intersección a Primaria",
                symbol: new SimpleLineSymbol({ color: "pink", width: 0.5}),
                label: "Carretera Principal Intersección"  
            },
            {
                value: "Secundaria",
                symbol: new SimpleLineSymbol({ color: "magenta", width: 0.5}),
                label: "Carretera Secundaria"  
            },
            {
                value: "Intersección Secundaria",
                symbol: new SimpleLineSymbol({ color: "magenta", width: 0.5}),
                label: "Carretera Secundaria Intersección"  
            },
            {
                value: "Residencial",
                symbol: new SimpleLineSymbol({ color: "lime", width: 0.5}),
                label: "Residencial"  
            },
            {
                value: "Terciaria",
                symbol: new SimpleLineSymbol({ color: "darkblue", width: 0.5}),
                label: "Carretera Terciaria"  
            },
            {
                value: "Intersección Terciaria",
                symbol: new SimpleLineSymbol({ color: "darkblue", width: 0.5}),
                label: "Carretera Terciaria Intersección"  
            },
            {
                value: "Pista",
                symbol: new SimpleLineSymbol({ color: "darkgreen", width: 0.5}),
                label: "Pista"  
            },
            {
                value: "Pista Grado 1",
                symbol: new SimpleLineSymbol({ color: "darkgreen", width: 0.5}),
                label: "Pista"  
            },
            {
                value: "Pista Grado 2",
                symbol: new SimpleLineSymbol({ color: "darkgreen", width: 0.5}),
                label: "Pista"  
            },
            {
                value: "Pista Grado 3",
                symbol: new SimpleLineSymbol({ color: "darkgreen", width: 0.5}),
                label: "Pista"  
            },
            {
                value: "Pista Grado 4",
                symbol: new SimpleLineSymbol({ color: "darkgreen", width: 0.5}),
                label: "Pista"  
            },
            {
                value: "Pista Grado 5",
                symbol: new SimpleLineSymbol({ color: "darkgreen", width: 0.5}),
                label: "Pista"  
            },
            {
                value: "Carretera Troncal",
                symbol: new SimpleLineSymbol({ color: "gold", width: 0.5}),
                label: "Carretera Nacional"  
            },
            {
                value: "trunk_link",
                symbol: new SimpleLineSymbol({ color: "gold", width: 0.5}),
                label: "Carretera Nacional Enlace"  
            },
            {
                value: "Escalones",
                symbol: new SimpleLineSymbol({ color: "gray", width: 0.5}),
                label: "Escaleras"  
            },
            {
                value: "Desconocido",
                symbol: new SimpleLineSymbol({ color: "gray", width: 0.5}),
                label: "Carretera sin clasificar"  
            },
            {
                value: "Carretera de Servicio",
                symbol: new SimpleLineSymbol({ color: "brown", width: 0.5}),
                label: "Carretera de Servicio"  
            },
            {
                value: "Sin Clasificar",
                symbol: new SimpleLineSymbol({ color: "gray", width: 0.5}),
                label: "Carretera sin clasificar"  
            }
        ]
    });

    const carreterasFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/Carreteras/FeatureServer',
        title: "Carreteras de Extremadura",
        renderer: rendererCarreterasFL,
        popupTemplate: {
            title: "{name}",
            content: [{
                type: "fields",
                fieldInfos: [
                    { fieldName: "fclass", label: "Categoría" },
                    { fieldName: "name", label: "Nombre" },
                    { fieldName: "ref", label: "Referencia" }
                ]
            }]
        },
        minScale: 5000000,  
        maxScale: 0,         
        effect: "bloom(1.5, 0.5px, 0)",
    });
    
    view.watch("scale", function(newScale) {
        if (newScale <= 500000) {
            carreterasFL.definitionExpression = "fclass IN ('Autovía', 'Carretera Troncal', 'trunk_link', 'Intersección de Autovía', 'Primaria', 'Intersección a Primaria', 'Secundaria', 'Intersección Secundaria', 'Terciaria', 'Intersección Terciaria', 'Vía de Autobús', 'Carril Bici', 'Senda', 'Calle Viva', 'Peatonal', 'Residencial', 'Pista', 'Pista Grado 1', 'Pista Grado 2', 'Pista Grado 3', 'Pista Grado 4', 'Pista Grado 5', 'Sin Clasificar', 'Desconocido')";
        } else if (newScale <= 2000000) {
            carreterasFL.definitionExpression = "fclass IN ('Autovía', 'Carretera Troncal', 'trunk_link', 'Intersección de Autovía', 'Primaria', 'Intersección a Primaria', 'Secundaria', 'Intersección Secundaria', 'Terciaria', 'Intersección Terciaria')";
        } else {
            carreterasFL.definitionExpression = "fclass IN ('Autovía', 'Carretera Troncal', 'Primaria', 'Intersección a Primaria', 'Secundaria', 'Terciaria')";
        }
    
        carreterasFL.refresh();
    });
    
    
    map.add(carreterasFL);  

    const reservasNaturalesFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/Reservas_Naturales_Espa%C3%B1ol/FeatureServer',
        title: "Reservas Naturales de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass",label: "Categoría"},
                    {fieldName: "name ",label: "Nombre"}]
            }]
        },
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill", 
                color: [0, 51, 0, 0.5],
                outline: {color: [0, 0, 0],  width: 1}
            }
        },
        effect: "bloom(1.5, 0.5px, 0)"
    });
    map.add(reservasNaturalesFL);

    const caminosFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/Caminos_Espa%C3%B1ol/FeatureServer',
        title: "Caminos de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass",label: "Categoría"},
                    {fieldName: "name ",label: "Nombre"}
                ]
            }]
        }
    });
    map.add(caminosFL);

    const parkingsFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/Aparcamientos/FeatureServer',
        title: "Parkings de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass",label: "Categoría"},
                    {fieldName: "name ",label: "Nombre"}
                ]
            }]
        }
    });
    map.add(parkingsFL);

    const poiTiendasFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/POI_Espa%C3%B1ol/FeatureServer/1',
        title: "Tiendas de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass",label: "Categoría"},
                    {fieldName: "name ", label: "Nombre"}
                ]
            }]
        }
    });
    map.add(poiTiendasFL);

    const poiAlojamientosFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/POI_Espa%C3%B1ol/FeatureServer/2',
        title: "Alojamientos de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass",label: "Categoría"},
                    {fieldName: "name ", label: "Nombre"}
                ]
            }]
        }
    });
    map.add(poiAlojamientosFL);

    const poiMonumentosFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/POI_Espa%C3%B1ol/FeatureServer/3',
        title: "Monumentos de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass", label: "Categoría"},
                    {fieldName: "name ", label: "Nombre"}
                ]
            }]
        }
    });
    map.add(poiMonumentosFL);

    const poiRestauracionFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/POI_Espa%C3%B1ol/FeatureServer/4',
        title: "Restauración de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass",label: "Categoría"},
                    {fieldName: "name ", label: "Nombre"}
            ]
            }]
        }
    });
    map.add(poiRestauracionFL);

    const poiServiciosEmergenciaFL = new FeatureLayer({
        url: 'https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/POI_Espa%C3%B1ol/FeatureServer/5',
        title: "Servicios de Emergencia de Extremadura",
        popupTemplate:{
            title: "{name}",
            content: [{
                type: "fields", 
                fieldInfos: [
                    {fieldName: "fclass",label: "Categoría"},
                    {fieldName: "name ", label: "Nombre"}
                ]
            }]
        }
    });
    map.add(poiServiciosEmergenciaFL);

    const layerList = new LayerList({
        view: view
    });
    view.ui.add(layerList, 'top-right');

    view.watch("scale", function(newScale) {
        const visibilityScale = 200000; 
    
        if (newScale <= visibilityScale) {
            poiTiendasFL.visible = true;
            poiAlojamientosFL.visible = true;
            poiMonumentosFL.visible = true;
            poiRestauracionFL.visible = true;
            poiServiciosEmergenciaFL.visible = true;
            caminosFL.visible = true;
            parkingsFL.visible = true
        } else {
            poiTiendasFL.visible = false;
            poiAlojamientosFL.visible = false;
            poiMonumentosFL.visible = false;
            poiRestauracionFL.visible = false;
            poiServiciosEmergenciaFL.visible = false;
            caminosFL.visible = false;
            parkingsFL.visible = false
        }
    });
    
    const searchWidget = new Search({
        view: view,
        includeDefaultSources: false,
        sources: [
            {
                layer: poiTiendasFL,
                searchFields: ["name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["name", "fclass"],
                name: "Tiendas",
                placeholder: "Buscar tienda..."
            },
            {
                layer: poiAlojamientosFL,
                searchFields: ["name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["name", "fclass"],
                name: "Alojamientos",
                placeholder: "Buscar alojamiento..."
            },
            {
                layer: poiMonumentosFL,
                searchFields: ["name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["name", "fclass"],
                name: "Monumentos",
                placeholder: "Buscar monumento..."
            },
            {
                layer: poiRestauracionFL,
                searchFields: ["name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["name", "fclass"],
                name: "Restauración",
                placeholder: "Buscar restaurante..."
            },
            {
                layer: poiServiciosEmergenciaFL,
                searchFields: ["name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["name", "fclass"],
                name: "Servicios de Emergencia",
                placeholder: "Buscar servicio de emergencia..."
            },
            {
                layer: reservasNaturalesFL,
                searchFields: ["name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["name", "fclass"],
                name: "Reservas Naturales",
                placeholder: "Buscar reserva..."
            }]
    });

    view.ui.add(searchWidget, {position: "top-left"});

});





