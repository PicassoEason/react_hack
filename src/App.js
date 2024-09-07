import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ServiceButtons from './components/ServiceButtons';
import NearbyStores from './components/Nearby/NearbyStores';
import StoreModal from './components/StoreModal';
import DisabilityInstitutionSpaces from './pages/DisabilityInstitutionSpaces';
import LoveRestaurants from './pages/LoveRestaurants'; // 新增這行
// import MenuComponent from './components/menu';
// import WantHome from './pages/want_home';
// import Food from './pages/food';
// import Assist from './pages/assist';
// import Guide from './pages/info';

const App = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  const closeModal = () => setSelectedStore(null);

  const HomePage = () => (
    <>
      <ServiceButtons />
      <NearbyStores setSelectedStore={setSelectedStore} />
    </>
  );

  return (
    <Router>
      <div className="h-screen flex flex-col bg-gray-100">
        <Header />
        {/* <MenuComponent /> */}

        <main className="flex-1 overflow-hidden flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/disability-spaces" element={<DisabilityInstitutionSpaces />} />
            <Route path="/love-restaurants" element={<LoveRestaurants />} /> {/* 新增這行 */}
          </Routes>
        </main>

        {selectedStore && <StoreModal store={selectedStore} onClose={closeModal} />}
      </div>
    </Router>
  );
};

export default App;