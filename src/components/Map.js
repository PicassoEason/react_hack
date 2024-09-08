import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const apiKey = 'AIzaSyCorstFp2YUZ7n4oNIZcteSKMHhbUiqftU';

const MapComponent = ({ userLocation, nearbyStores }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const center = currentLocation || (userLocation 
    ? { lat: userLocation.latitude, lng: userLocation.longitude }
    : { lat: 25.02189323768, lng: 121.53506255146598});//25.02189323768, 121.53506255146598

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ width: '100%', height: '400px' }}>
        <Map defaultZoom={13} center={center}>
          {currentLocation && (
            <Marker
              position={currentLocation}
              title="Your Current Location"
              icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            />
          )}
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