import React, { useState } from 'react';
import Header from './components/Header';
import ServiceButtons from './components/ServiceButtons';
import MapComponent from './components/Map';
import NearbyStores from './components/NearbyStores';
import StoreModal from './components/StoreModal';

const App = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  const closeModal = () => setSelectedStore(null);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 overflow-hidden flex flex-col">
        <ServiceButtons />
        <MapComponent />
        <NearbyStores setSelectedStore={setSelectedStore} />
      </main>

      {selectedStore && <StoreModal store={selectedStore} onClose={closeModal} />}
    </div>
  );
};

export default App;