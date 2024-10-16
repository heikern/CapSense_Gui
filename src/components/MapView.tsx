import React from 'react';
import { useRef } from 'react';
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
  const selectedPlots = useSelector((state:any) => state.selectedPlotsSlice.selectedPlots)

  const MapClickHandler = () => {
    useMapEvents({
      click: () => {
        if (!plotClickedRef.current){
          dispatch(appStateSliceActions.resetSinglePlotSelected())
          dispatch(appStateSliceActions.setSelectedPlotId(null))
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
        const power = 100
        const stageYear = 100

        const selectedPlot = {
          plotId: plotId,
          centroid: [longitude, latitude],
          power: power,
          stageYear: stageYear
        }

        selectedPlotIdRef.current = plotId;
        dispatch(appStateSliceActions.setSelectedPlotId(plotId))
        plotClickedRef.current = true;
        dispatch(appStateSliceActions.setSinglePlotSelected())
        dispatch(selectedPlotsSliceActions.addSelectedPlot(selectedPlot))
      }
    })
  }

  const style = (feature: any) => {
    const plotId = feature.properties.Name
    const isSelected = plotId === selectedPlotIdRef.current;
    const isInSelectedPlots = selectedPlots.some((f: any) => f.plotId === feature.properties.Name)
    let fillColor: string | null = null

    if (isSelected){
      fillColor = '#FF0000'
    } else if (isInSelectedPlots && !isSelected){
      fillColor = '#c77171'
    } else {
      fillColor = '#b3afaf'
    }

    return {
      fillColor: fillColor,
      weight: 0.2,
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



