import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapComponent = () => (
  <APIProvider apiKey={'AIzaSyCorstFp2YUZ7n4oNIZcteSKMHhbUiqftU'}>
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        onCameraChanged={(ev) =>
          console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
        }
      />
    </div>
  </APIProvider>
);

export default MapComponent;