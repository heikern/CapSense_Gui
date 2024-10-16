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

  const geojsonData = useSelector((state:any) => state.geojsonSlice.data)
  const selectedPlots = useSelector((state:any) => state.selectedPlotsSlice.selectedPlots)

  const MapClickHandler = () => {
    useMapEvents({
      click: () => {
        if (!plotClickedRef.current){
          dispatch(appStateSliceActions.resetSinglePlotSelected())
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

        plotClickedRef.current = true;
        dispatch(appStateSliceActions.setSinglePlotSelected())
        dispatch(selectedPlotsSliceActions.addSelectedPlot(selectedPlot))
        // console.log(centroid)
      }
    })
  }

  const style = (feature: any) => {
    const isSelected = selectedPlots.some((f: any) => f.plotId === feature.properties.Name)
    return {
      fillColor: isSelected ? '#FF0000' : '#00FF00',
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



