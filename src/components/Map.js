import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const apiKey = 'AIzaSyCorstFp2YUZ7n4oNIZcteSKMHhbUiqftU';

const MapComponent = ({ userLocation, nearbyStores }) => {
  const center = userLocation 
    ? { lat: userLocation.latitude, lng: userLocation.longitude }
    : { lat: 25.021815462501728, lng: 121.53512692448075 };

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ width: '100%', height: '400px' }}>
        <Map defaultZoom={13} center={center}>
          {nearbyStores && Array.isArray(nearbyStores) && nearbyStores.map((store, index) => (
            <Marker
              key={index}
              position={{ lat: parseFloat(store.LAT), lng: parseFloat(store.LON) }}
              title={store.ORG_NAME}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;