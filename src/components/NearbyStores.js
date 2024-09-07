import React, { useState, useEffect } from 'react';
import StoreCard from './StoreCard';

const NearbyStores = ({ setSelectedStore }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setError("Unable to get your location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    async function fetchStores() {
      const url = "http://localhost:5001/food";
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setStores(json || []);
        setLoading(false);
      } catch (error) {
        console.error('Fetching error:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    if (userLocation) {
      fetchStores();
    }
  }, [userLocation]);

  // Function to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  // Function to open Google Maps for navigation
  const startNavigation = (storeLat, storeLon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${storeLat},${storeLon}`;
    window.open(url, '_blank');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter stores within 5km and sort by distance
  const nearbyStores = stores
    .map(store => ({
      ...store,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        store.LAT,
        store.LON
      )
    }))
    .filter(store => store.distance <= 5) // Only stores within 5km
    .sort((a, b) => a.distance - b.distance);

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-bold mb-2">附近的店家</h2>
      <div className="flex flex-wrap gap-4">
        {nearbyStores.map((store, index) => (
          <StoreCard 
            key={index}
            name={store.ORG_NAME}
            distance={`${store.distance.toFixed(2)} km`}
            onClick={() => setSelectedStore({
              name: store.ORG_NAME,
              address: store.ADDRESS,
              personInCharge: store.PERSON_IN_CHARGE,
              postDate: store.POST_DATE,
              latitude: store.LAT,
              longitude: store.LON
            })}
            onNavigate={() => startNavigation(store.LAT, store.LON)}
          />
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;