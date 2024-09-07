import React, { useState } from 'react';
import { Search, Filter, Heart, Info, Menu, User, MapPin, X } from 'lucide-react';

const App = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  const closeModal = () => setSelectedStore(null);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-green-600 text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <Menu size={24} />
          <h1 className="text-xl font-bold">台北愛心服務</h1>
          <User size={24} />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="搜尋服務或地點"
            className="w-full p-2 pl-10 pr-10 rounded-full text-black"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex space-x-2 p-4">
          <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-full flex items-center justify-center">
            <Heart size={16} className="mr-2" />
            愛心餐
          </button>
          <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-full flex items-center justify-center">
            <Info size={16} className="mr-2" />
            社會救助
          </button>
        </div>

        <div className="flex-1 bg-gray-300 flex items-center justify-center">
          地圖區域
        </div>

        <div className="bg-white p-4">
          <h2 className="text-lg font-bold mb-2">附近的店家</h2>
          <div className="flex overflow-x-auto space-x-4 pb-2">
            <StoreCard 
              name="大安區愛心餐廳"
              distance="0.5km"
              onClick={() => setSelectedStore({
                name: "大安區愛心餐廳",
                address: "台北市大安區忠孝東路四段",
                isOpen: true,
                hours: "11:00-14:00, 17:00-20:00"
              })}
            />
            <StoreCard 
              name="中正區食物銀行"
              distance="1.2km"
              onClick={() => setSelectedStore({
                name: "中正區食物銀行",
                address: "台北市中正區忠孝西路一段",
                isOpen: true,
                hours: "09:00-18:00"
              })}
            />
            <StoreCard 
              name="信義區愛心小舖"
              distance="2.3km"
              onClick={() => setSelectedStore({
                name: "信義區愛心小舖",
                address: "台北市信義區松高路",
                isOpen: false,
                hours: "10:00-20:00"
              })}
            />
          </div>
        </div>
      </main>

      {selectedStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">{selectedStore.name}</h3>
              <X onClick={closeModal} className="cursor-pointer" />
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-2">{selectedStore.address}</p>
              <p className={`font-bold ${selectedStore.isOpen ? 'text-green-500' : 'text-red-500'}`}>
                {selectedStore.isOpen ? '營業中' : '休息中'}
              </p>
              <p className="text-gray-600 mb-4">{selectedStore.hours}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-full">
                  查看詳情
                </button>
                <button className="flex-1 border border-green-500 text-green-500 py-2 rounded-full">
                  導航前往
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StoreCard = ({ name, distance, onClick }) => {
  return (
    <div className="flex-shrink-0 w-40 bg-gray-50 rounded-lg p-3 shadow" onClick={onClick}>
      <MapPin size={20} className="text-green-500 mb-2" />
      <h3 className="font-bold text-sm mb-1">{name}</h3>
      <p className="text-gray-500 text-xs">{distance}</p>
    </div>
  );
};

export default App;