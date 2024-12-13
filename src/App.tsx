import React, {useEffect} from 'react';
import MapView from './components/MapView';
import SideBar from './components/SideBar';
// import BottomBar from './components/BottomBar';
import { useDispatch, UseDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'websocket/connect',
      payload: {url: 'ws://localhost:8080'}
    })

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
