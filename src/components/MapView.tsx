// MapView.tsx
import React, { useRef, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import {Style, Fill, Stroke} from 'ol/style';
import { FeatureLike } from 'ol/Feature';

const MapView: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const geojsonLayerRef = useRef<VectorLayer<VectorSource> | null | undefined>(undefined)

  const geojsonData = useSelector((state:any)=>state.geojsonSlice.data)

  useEffect(() => {
    if (!mapRef.current) return;

    // Create a new map instance
    mapInstanceRef.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([103.8198, 1.3521]), // Singapore coordinates
        zoom: 12,
      }),
    });

    // Initialize the vector layer for geojson data
    geojsonLayerRef.current = new VectorLayer({
        source: new VectorSource(),
        style: (feature: FeatureLike) => {
            return new Style({
                fill: new Fill({
                    color: 'rgba(128, 128, 128, 0.5)',
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0)',
                    width: 0,
                })
            })
        }
    });

    // Add the geojson layer to the map
    mapInstanceRef.current.addLayer(geojsonLayerRef.current);


    // Cleanup on unmount
    return () => mapInstanceRef.current?.setTarget(undefined);
  }, []);

    // Effect to handle geojson data changes
    useEffect(()=>{
        if (!geojsonData || !geojsonLayerRef.current) return;

        const vectorSource = geojsonLayerRef.current.getSource() as VectorSource;

        // Clear previous features
        vectorSource.clear();

        // Parse and add the new geojson features
        const geojsonFormat = new GeoJSON();
        const features = geojsonFormat.readFeatures(geojsonData, {
            dataProjection: 'EPSG:4326', // Source projection (WGS 84)
            featureProjection: 'EPSG:3857', // Target projection (Web Mercator)
          });

        vectorSource.addFeatures(features);
    },[geojsonData])


  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapView;