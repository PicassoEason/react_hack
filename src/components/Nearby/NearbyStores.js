import React, { useState, useEffect } from 'react';
import StoreCard from '../StoreCard';
import MapComponent from '../Map';
import ReactLoading from 'react-loading';

const NearbyStores = ({ setSelectedStore }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [markedStores, setMarkedStores] = useState([]);

  // 移除重複數據並為每個項目添加唯一標識符
  const removeDuplicates = (data) => {
    const seen = new Set();
    return data.filter((item, index) => {
      const key = `${item.名稱}-${item.地址}`;
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
      // 在添加收藏時，保存完整信息
      const favoriteStore = {
        uniqueId: store.uniqueId,
        ORG_NAME: store.名稱,
        ADDRESS: store.地址,
        LAT: store.Latitude,
        LON: store.Longitude,
        distance: store.distance,
        電話: store.電話,
        無障礙友善說明: store.無障礙友善說明
      };
      updatedFavorites = [...favorites, favoriteStore];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleMarkToggle = (store) => {
    let updatedMarkedStores;
    if (markedStores.some(m => m.uniqueId === store.uniqueId)) {
      updatedMarkedStores = markedStores.filter(m => m.uniqueId !== store.uniqueId);
    } else {
      updatedMarkedStores = [...markedStores, store];
    }
    setMarkedStores(updatedMarkedStores);
    localStorage.setItem('markedStores', JSON.stringify(updatedMarkedStores));
  };
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("瀏覽器不支持地理位置"));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error(`無法獲取位置: ${error.message}`));
        },
        options
      );
    });
  };

  useEffect(() => {
    const fetchUserLocationAndStores = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        
        // 獲取商店數據
        const url = "https://hack-bdend.vercel.app/api/friendlyShops";
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
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLocationAndStores();

    // 從 localStorage 加載收藏和標記
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const storedMarkedStores = JSON.parse(localStorage.getItem('markedStores') || '[]');
    setFavorites(storedFavorites);
    setMarkedStores(storedMarkedStores);
  }, []);

  useEffect(() => {
    if (userLocation && stores.length > 0) {
      const filtered = stores
        .map(store => ({
          ...store,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            store.Latitude,
            store.Longitude
          )
        }))
        .filter(store => store.distance <= 1)
        .sort((a, b) => a.distance - b.distance);
      
      setNearbyStores(filtered);
    }
  }, [userLocation, stores]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ReactLoading type="spinningBubbles" color="#4299E1" height={50} width={50} />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-4 ">
      <MapComponent 
        userLocation={userLocation} 
        nearbyStores={nearbyStores.map(store => ({
          ORG_NAME: store.名稱,
          LAT: store.Latitude,
          LON: store.Longitude,
          isMarked: markedStores.some(m => m.uniqueId === store.uniqueId),
          ADDRESS: store.地址,
          PHONE: store.電話,
          無障礙友善說明: store.無障礙友善說明
        }))}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ padding: 'inherit' }}>
        {nearbyStores.map((store) => (
          <StoreCard 
            key={store.uniqueId}
            name={store.名稱}
            distance={`${store.distance.toFixed(2)} km`} // Only show distance
            isFavorite={favorites.some(f => f.uniqueId === store.uniqueId)}
            isMarked={markedStores.some(m => m.uniqueId === store.uniqueId)}
            onClick={() => setSelectedStore({
              name: store.名稱,
              address: store.地址,
              phone: store.電話,
              description: store.無障礙友善說明,
              latitude: store.Latitude,
              longitude: store.Longitude
            })}
            onNavigate={() => startNavigation(store.Latitude, store.Longitude)}
            onFavoriteToggle={() => handleFavoriteToggle(store)}
            onMarkToggle={() => handleMarkToggle(store)}
          />
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;