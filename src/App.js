import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ServiceButtons from './components/ServiceButtons';
import NearbyStores from './components/Nearby/NearbyStores';
import StoreModal from './components/StoreModal';
import DisabilityInstitutionSpaces from './pages/DisabilityInstitutionSpaces';
import LoveRestaurants from './pages/LoveRestaurants';
import SponsorForm from './pages/SponsorForm';
import MyFavorites from './pages/MyFavorites';

const App = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  const closeModal = () => setSelectedStore(null);

  const HomePage = () => (
    <div className="flex flex-col h-full">
      <div className="bg-white shadow-md z-10 relative">
        <ServiceButtons />
      </div>
      <div className="flex-1 overflow-auto">
        <NearbyStores setSelectedStore={setSelectedStore} />
      </div>
    </div>
  );

  return (
    <Router>
      <div className="h-screen flex flex-col bg-gray-100">
        <main className="flex-1 overflow-hidden flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/disability-spaces" element={<DisabilityInstitutionSpaces />} />
            <Route path="/love-restaurants" element={<LoveRestaurants />} />
            <Route path="/sponsor-Form" element={<SponsorForm />} />
            <Route path="/favorites" element={<MyFavorites />} />
          </Routes>
        </main>

        {selectedStore && <StoreModal store={selectedStore} onClose={closeModal} />}
      </div>
    </Router>
  );
};

export default App;