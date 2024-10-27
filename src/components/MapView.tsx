// MapView.tsx
import React, { useRef, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import 'ol/ol.css';
import {  Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import {Style, Fill, Stroke} from 'ol/style';
import { FeatureLike } from 'ol/Feature';
import Feature from 'ol/Feature';
// import { feature } from '@turf/turf';

import { selectedPlot } from '../store/selectedPlotsSlice';

import { selectedPlotsSliceActions } from '../store/selectedPlotsSlice';
import { feature } from '@turf/turf';

const MapView: React.FC = () => {
    const dispatch = useDispatch()
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<Map | null>(null);
    const geojsonLayerRef = useRef<VectorLayer<VectorSource> | null | undefined>(undefined)

    const geojsonData = useSelector((state:any)=>state.geojsonSlice.data)
    const currSelectedPlot = useSelector((state:any)=>state.selectedPlotsSlice.currSelectedPlot)

    const currSelectedPlotIdRef = useRef(null)

    useEffect(()=>{
        // Clear the outline when currSelectedPlot gets cleared by external forces
        // Also an an outline when currSelectedPlot gets set by external forces
        if (currSelectedPlotIdRef.current !== null){
            if (currSelectedPlot.plotId !== currSelectedPlotIdRef.current){
                // delete the old feature
                const feature = geojsonLayerRef.current?.getSource()?.getFeatureById(currSelectedPlotIdRef.current);
                if (feature){
                    feature.setStyle(geojsonLayerRef.current?.getStyle() as any)
                }
            }
        }

        if (currSelectedPlot.plotId !== null){
            const newFeature = geojsonLayerRef.current?.getSource()?.getFeatureById(currSelectedPlot.plotId);

            if (newFeature){
                newFeature.setStyle(new Style({
                    fill: new Fill({
                        color: 'rgba(128, 128, 128, 0.5)',
                    }),
                    stroke: new Stroke({
                        color: 'rgba(0, 128, 0, 1)',
                        width: 2,
                    })
                }))
            }
        }

        currSelectedPlotIdRef.current = currSelectedPlot.plotId
    },[currSelectedPlot])

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
                    color:'rgba(128, 128, 128, 0.5)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 1)',
                    width: 0.3,
                })
            })
        }
    });

    // Add the geojson layer to the map
    mapInstanceRef.current.addLayer(geojsonLayerRef.current);

    // Mouseover event to change cursor style
    mapInstanceRef.current.on('pointermove', (event) => {
        const feature = mapInstanceRef.current?.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        
        if (mapRef.current){
            if (feature) {
                // Change cursor to hand on hover
                mapRef.current.style.cursor = 'pointer';
            } else {
                // Reset cursor when not hovering over a feature
                mapRef.current.style.cursor = '';
            }
        }
    });

    // Add click event listener to highlight the selected feature
    mapInstanceRef.current.on('singleclick', (event)=>{
        const feature = mapInstanceRef.current?.forEachFeatureAtPixel(event.pixel, (feature)=> feature);
        let currPlotId: string = ""
        
        if (feature instanceof Feature){
            // Use name as the plotId for the current selected plot
            currPlotId = feature.getId() as string;

            // Dispatch action to set the current selected plot
            dispatch(selectedPlotsSliceActions.getCurrSelectedPlot(currPlotId));

            // Set the style for the selected feature
            feature?.setStyle(new Style({
                fill: new Fill({
                    color: 'rgba(128, 128, 128, 0.5)',
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 128, 0, 1)',
                    width: 2,
                })
            }))
        } else {
            // Dispatch action to reset the current selected plot
            dispatch(selectedPlotsSliceActions.resetCurrSelectedPlot());
        }

        // // clear the previous plotId
        // if (currSelectedPlotIdRef.current || !(feature instanceof Feature)){
        //     const prevPlotId = currSelectedPlotIdRef.current

        //     if (prevPlotId && (prevPlotId !== currPlotId)){
        //         const previousFeature = geojsonLayerRef.current?.getSource()?.getFeatureById(prevPlotId);
        //         if (previousFeature){
        //             previousFeature.setStyle(geojsonLayerRef.current?.getStyle() as any)
        //         }
        //     }
        // }
        
        
    });


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

        // Set the feature ID to Name
        features.forEach((feature)=>{
            feature.setId(feature?.getProperties().Name)
        })

        vectorSource.addFeatures(features);
    },[geojsonData])


  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapView;