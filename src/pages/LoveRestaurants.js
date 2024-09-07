import React, { useState, useEffect } from 'react';
import StoreCard from '../components/StoreCard';
import MapComponent from '../components/Map';
import ServiceButtons from '../components/ServiceButtons';
const LoveRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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
    async function fetchRestaurants() {
      const url = "https://hack-bdend.vercel.app/api/loveRestaurant";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setRestaurants(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Fetching error:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

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
  const startNavigation = (lat, lon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    window.open(url, '_blank');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-4">
      {<ServiceButtons />}
      <h2 className="text-lg font-bold mb-2">愛心餐廳列表</h2>
      <MapComponent userLocation={userLocation} nearbyStores={restaurants} />
      <div className="flex flex-wrap gap-4 mt-4">
        {restaurants.map((restaurant, index) => (
          <StoreCard 
            key={index}
            name={restaurant.ORG_NAME}
            distance={userLocation ? `${calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              parseFloat(restaurant.LAT),
              parseFloat(restaurant.LON)
            ).toFixed(2)} km` : 'N/A'}
            onClick={() => setSelectedRestaurant(restaurant)}
            onNavigate={() => startNavigation(restaurant.LAT, restaurant.LON)}
          />
        ))}
      </div>
      {selectedRestaurant && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold">{selectedRestaurant.ORG_NAME}</h3>
          <p>地址：{selectedRestaurant.ADDRESS}</p>
          <p>類型：{selectedRestaurant.Food_NAME}</p>
          <p>電話：{selectedRestaurant.PHONE}</p>
          <p>發布日期：{selectedRestaurant.POST_DATE}</p>
        </div>
      )}
    </div>
  );
};

export default LoveRestaurants;