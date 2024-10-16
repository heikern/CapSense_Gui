import React from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView: React.FC = () => {

  const geojsonData = useSelector((state:any) => state.geojsonSlice.data)

  return (
    <div className="h-full w-full">
      <MapContainer center={[1.3521, 103.8198]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geojsonData && <GeoJSON data={geojsonData}/>}
      </MapContainer>
    </div>
  );
};

export default MapView;



