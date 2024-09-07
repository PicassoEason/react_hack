import React, { useState, useEffect } from 'react';
import StoreCard from '../components/StoreCard';
import MapComponent from '../components/Map';
import ServiceButtons from '../components/ServiceButtons';
import StoreModal from '../components/StoreModal';

const LoveRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
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

    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
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
        
        // 處理重複數據
        const uniqueRestaurants = removeDuplicates(data);
        setRestaurants(uniqueRestaurants);
        setLoading(false);
      } catch (error) {
        console.error('Fetching error:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  const removeDuplicates = (data) => {
    const seen = new Set();
    return data.filter((item, index) => {
      const key = `${item.ORG_NAME}-${item.ADDRESS}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      // 添加一個唯一標識符
      item.uniqueId = `${key}-${index}`;
      return true;
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const startNavigation = (lat, lon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    window.open(url, '_blank');
  };

  const handleFavoriteToggle = (restaurant) => {
    let updatedFavorites;
    if (favorites.some(f => f.uniqueId === restaurant.uniqueId)) {
      updatedFavorites = favorites.filter(f => f.uniqueId !== restaurant.uniqueId);
    } else {
      updatedFavorites = [...favorites, restaurant];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md">
        <ServiceButtons />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">愛心餐廳列表</h2>
          <MapComponent userLocation={userLocation} nearbyStores={restaurants} />
          <div className="flex flex-wrap gap-4 mt-4">
            {restaurants.map((restaurant) => (
              <StoreCard 
                key={restaurant.uniqueId}
                name={restaurant.ORG_NAME}
                distance={userLocation ? `${calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  parseFloat(restaurant.LAT),
                  parseFloat(restaurant.LON)
                ).toFixed(2)} km` : 'N/A'}
                isFavorite={favorites.some(f => f.uniqueId === restaurant.uniqueId)}
                onClick={() => setSelectedRestaurant(restaurant)}
                onNavigate={() => startNavigation(restaurant.LAT, restaurant.LON)}
                onFavoriteToggle={() => handleFavoriteToggle(restaurant)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedRestaurant && (
        <StoreModal
          store={{
            name: selectedRestaurant.ORG_NAME,
            address: selectedRestaurant.ADDRESS,
            type: selectedRestaurant.Food_NAME,
            phone: selectedRestaurant.PHONE,
            postDate: selectedRestaurant.POST_DATE,
            latitude: selectedRestaurant.LAT,
            longitude: selectedRestaurant.LON
          }}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
};

export default LoveRestaurants;