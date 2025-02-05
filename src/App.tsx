import React, {useEffect} from 'react';
import MapView from './components/MapView';
import SideBar from './components/SideBar';
// import BottomBar from './components/BottomBar';
import { useDispatch, UseDispatch } from 'react-redux';
import { geojsonActions } from './store/geojsonSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'websocket/connect',
      payload: {url: 'ws://localhost:8080'}
    })

    // Load default Geojson file
    const loadGeojson = async () => {
      try{
        const response = await fetch('/assets/jtc_land_2019.geojson');
        const geojson = await response.json();
        dispatch(geojsonActions.setGeojson(geojson));
        dispatch(geojsonActions.setFileName('plot.geojson'));
      } catch (error){
        console.error('Error loading default Geojson file', error);
      }
    }

    loadGeojson();

    return ()=>{
      dispatch({type: 'websocket/disconnect'});
    };

  }, [dispatch])

  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Map View */}
        <div className="flex-grow">
          <MapView />
        </div>
        {/* Side Bar */}
        <div className="w-1/4">
          <SideBar />
        </div>
      </div>
      {/* Bottom Bar
      <div className="h-8">
        <BottomBar />
      </div> */}
    </div>
  );
}

export default App;
