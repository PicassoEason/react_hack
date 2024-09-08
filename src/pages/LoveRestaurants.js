import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ServiceButtons from '../components/ServiceButtons';
import StoreCard from '../components/StoreCard';
import MapComponent from '../components/Map';
import StoreModal from '../components/StoreModal';
import ReactLoading from 'react-loading';

// 內容組件
const LoveRestaurantsContent = React.memo(({ userLocation, error }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);

    async function fetchRestaurants() {
      const url = "https://hack-bdend.vercel.app/api/loveRestaurant";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const uniqueRestaurants = removeDuplicates(data);
        setRestaurants(uniqueRestaurants);
        setLoading(false);
      } catch (error) {
        console.error('Fetching error:', error);
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  const removeDuplicates = useCallback((data) => {
    const seen = new Set();
    return data.filter((item, index) => {
      const key = `${item.ORG_NAME}-${item.ADDRESS}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      item.uniqueId = `${key}-${index}`;
      return true;
    });
  }, []);

  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  const startNavigation = useCallback((lat, lon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    window.open(url, '_blank');
  }, []);

  const handleFavoriteToggle = useCallback((restaurant) => {
    setFavorites(prevFavorites => {
      let updatedFavorites;
      if (prevFavorites.some(f => f.uniqueId === restaurant.uniqueId)) {
        updatedFavorites = prevFavorites.filter(f => f.uniqueId !== restaurant.uniqueId);
      } else {
        updatedFavorites = [...prevFavorites, restaurant];
      }
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ReactLoading type="spinningBubbles" color="#4299E1" height={50} width={50} />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        {/* <h2 className="text-2xl font-bold mb-4">愛心餐廳列表</h2> */}
        <div className="mb-6">
          <MapComponent userLocation={userLocation} nearbyStores={restaurants} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-auto">
          {restaurants.map((restaurant) => (
            <div key={restaurant.uniqueId} className="h-full">
              <StoreCard 
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
            </div>
          ))}
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
});

// 主組件
const LoveRestaurants = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

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
  }, []);

  const memoizedContent = useMemo(() => (
    <LoveRestaurantsContent userLocation={userLocation} error={error} />
  ), [userLocation, error]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md">
        <ServiceButtons />
      </div>
      {memoizedContent}
    </div>
  );
};

export default LoveRestaurants;