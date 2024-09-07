import React, { useState, useEffect } from 'react';
import StoreCard from '../StoreCard';
import MapComponent from '../Map';

const NearbyStores = ({ setSelectedStore }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // 移除重複數據並為每個項目添加唯一標識符
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

  // 計算兩點之間的距離
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 地球半徑（公里）
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // 返回距離（公里）
  };

  const startNavigation = (storeLat, storeLon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${storeLat},${storeLon}`;
    window.open(url, '_blank');
  };

  const handleFavoriteToggle = (store) => {
    let updatedFavorites;
    if (favorites.some(f => f.uniqueId === store.uniqueId)) {
      updatedFavorites = favorites.filter(f => f.uniqueId !== store.uniqueId);
    } else {
      updatedFavorites = [...favorites, store];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    // 獲取用戶位置
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

    // 從 localStorage 加載收藏
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    async function fetchStores() {
      const url = "https://hack-bdend.vercel.app/food";
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
        const uniqueStores = removeDuplicates(json || []);
        setStores(uniqueStores);
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

  useEffect(() => {
    if (userLocation && stores.length > 0) {
      const filtered = stores
        .map(store => ({
          ...store,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            store.LAT,
            store.LON
          )
        }))
        .filter(store => store.distance <= 3)
        .sort((a, b) => a.distance - b.distance);
      
      setNearbyStores(filtered);
    }
  }, [userLocation, stores]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-bold mb-2">附近的愛心店家</h2>
      <MapComponent userLocation={userLocation} nearbyStores={nearbyStores} />
      <div className="flex flex-wrap gap-4 mt-4">
        {nearbyStores.map((store) => (
          <StoreCard 
            key={store.uniqueId}
            name={store.ORG_NAME}
            distance={`${store.distance.toFixed(2)} km`}
            isFavorite={favorites.some(f => f.uniqueId === store.uniqueId)}
            onClick={() => setSelectedStore({
              name: store.ORG_NAME,
              address: store.ADDRESS,
              personInCharge: store.PERSON_IN_CHARGE,
              postDate: store.POST_DATE,
              latitude: store.LAT,
              longitude: store.LON
            })}
            onNavigate={() => startNavigation(store.LAT, store.LON)}
            onFavoriteToggle={() => handleFavoriteToggle(store)}
          />
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;