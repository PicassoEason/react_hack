import React from 'react';
import { X } from 'lucide-react';

const StoreModal = ({ store, onClose }) => {
  const startNavigation = () => {
    if (store.latitude && store.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
      window.open(url, '_blank');
    } else {
      console.error('Store coordinates are not available');
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold">{store.name}</h3>
          <X onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-2">{store.address}</p>
          <p className={`font-bold ${store.isOpen ? 'text-green-500' : 'text-red-500'}`}>
            {store.isOpen ? '營業中' : '休息中'}
          </p>
          <p className="text-gray-600 mb-4">{store.hours}</p>
          <div className="flex space-x-2">
            {/* <button className="flex-1 bg-green-500 text-white py-2 rounded-full">
              地圖標示
            </button> */}
            <button 
              className="flex-1 border border-green-500 text-green-500 py-2 rounded-full hover:bg-green-500 hover:text-white transition-colors"
              onClick={startNavigation}
            >
              導航前往
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreModal;