import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import * as turf from '@turf/turf'

import { selectedPlotsSliceActions } from '../store/selectedPlotsSlice';
import {appStateSliceActions} from '../store/appStateSlice'

const MapView: React.FC = () => {
  const dispatch = useDispatch()

  const plotClickedRef = useRef(false)
  const selectedPlotIdRef = useRef<string | null> (null)

  const geojsonData = useSelector((state:any) => state.geojsonSlice.data)
  const currSelectedPlot = useSelector((state:any) => state.selectedPlotsSlice.currSelectedPlot)
  const selectedPlots = useSelector((state:any) => state.selectedPlotsSlice.selectedPlots)

  // State to force re-render
  const [selectedPlotState, setSelectedPlotState] = useState(currSelectedPlot);
  
  useEffect(()=>{
    selectedPlotIdRef.current = currSelectedPlot.plotId
    // Update the local state to trigger a re-render
    setSelectedPlotState(currSelectedPlot);
  },[currSelectedPlot])

  const MapClickHandler = () => {
    useMapEvents({
      click: () => {
        if (plotClickedRef.current == false){
          dispatch(appStateSliceActions.resetSinglePlotSelected())
          dispatch(selectedPlotsSliceActions.resetCurrSelectedPlot())
          selectedPlotIdRef.current = null;
        }
        plotClickedRef.current = false;
      },
    });
    return null
  }


  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        const plotId = feature.properties.Name
        const centroid = turf.centroid(feature);
        const [longitude, latitude] = centroid.geometry.coordinates;

        selectedPlotIdRef.current = plotId;
        dispatch(selectedPlotsSliceActions.getCurrSelectedPlot(plotId))
        dispatch(selectedPlotsSliceActions.setCurrSelectedPlotCentroid([longitude, latitude]))
        plotClickedRef.current = true;
        dispatch(appStateSliceActions.setSinglePlotSelected())
      }
    })
  }

  const style = (feature: any) => {
    const plotId = feature.properties.Name
    const isSelected = plotId === selectedPlotIdRef.current;
    const isInSelectedPlots = selectedPlots.some((f: any) => f.plotId === feature.properties.Name)
    let fillColor: string | null = null
    let color: string | null = null
    let weight: number | null = null

    if (isInSelectedPlots){
      fillColor = '#c77171'
    } else {
      fillColor = '#b3afaf'
    }

    if (isSelected){
      color = 'green'
      weight = 1.0
    } else {
      weight = 0.2
      color = 'black'
    }

    return {
      fillColor: fillColor,
      color: color,
      weight: weight,
      fillOpacity: 0.7
    }
  }

  return (
    <div className="h-full w-full">
      <MapContainer center={[1.3521, 103.8198]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler/>
        {geojsonData && <GeoJSON data={geojsonData} 
        onEachFeature={onEachFeature} style={style}/>}
      </MapContainer>
    </div>
  );
};

export default MapView;



