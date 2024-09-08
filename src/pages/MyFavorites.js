import React, { useState, useEffect } from 'react';
import StoreCard from '../components/StoreCard';
import StoreModal from '../components/StoreModal';
import ServiceButtons from '../components/ServiceButtons';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  const handleFavoriteToggle = (store) => {
    const updatedFavorites = favorites.filter(f => f.ORG_NAME !== store.ORG_NAME);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const closeModal = () => setSelectedStore(null);

  const startNavigation = (storeLat, storeLon) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${storeLat},${storeLon}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md">
        <ServiceButtons />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        <div className="bg-white shadow rounded-lg p-6">
          {/* <h2 className="text-2xl font-bold mb-4">我的收藏</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((store) => (
              <StoreCard
                key={store.ORG_NAME}
                name={store.ORG_NAME}
                address={store.ADDRESS}  // 傳遞地址而不是距離
                isFavorite={true}
                onClick={() => handleStoreClick(store)}
                onNavigate={() => startNavigation(store.LAT, store.LON)}
                onFavoriteToggle={() => handleFavoriteToggle(store)}
              />
            ))}
          </div>
          {favorites.length === 0 && (
            <p className="text-gray-500 text-center mt-4">您還沒有收藏任何店家</p>
          )}
        </div>
      </div>
      {selectedStore && (
        <StoreModal
          store={{
            name: selectedStore.ORG_NAME,
            address: selectedStore.ADDRESS,
            personInCharge: selectedStore.PERSON_IN_CHARGE,
            postDate: selectedStore.POST_DATE,
            latitude: selectedStore.LAT,
            longitude: selectedStore.LON
          }}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MyFavorites;