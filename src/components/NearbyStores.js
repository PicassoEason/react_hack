import React, { useState, useEffect } from 'react';
import StoreCard from './StoreCard';

const NearbyStores = ({ setSelectedStore }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // API 直接返回數組，不需要 .stores
        setStores(json || []);
        setLoading(false);
      } catch (error) {
        console.error('Fetching error:', error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-bold mb-2">附近的店家</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {stores.map((store, index) => (
          <StoreCard 
            key={index}
            name={store.ORG_NAME}
            distance={`Lat: ${store.LAT}, Lon: ${store.LON}`}
            onClick={() => setSelectedStore({
              name: store.ORG_NAME,
              address: store.ADDRESS,
              personInCharge: store.PERSON_IN_CHARGE,
              postDate: store.POST_DATE,
              latitude: store.LAT,
              longitude: store.LON
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default NearbyStores;