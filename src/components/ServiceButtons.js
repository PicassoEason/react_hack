import React from 'react';
import { HandCoins, Info,Cookie,BedSingle,HeartHandshake,Accessibility } from 'lucide-react';

const ServiceButtons = () => (
  <div className="flex space-x-2 p-4">
  
    <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-full flex items-center justify-center"  >
      <HeartHandshake size={16} className="mr-2" />
      社會救助中心
    </button>
    <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-full flex items-center justify-center">
      <Cookie size={16} className="mr-2" />
      愛心餐廳
    </button>
    <button className="flex-1 bg-orange-200 text-orange-700 py-2 rounded-full flex items-center justify-center">
      <Accessibility size={16} className="mr-3" />
      身障機構空位
    </button>
    <button className="flex-1 bg-yellow-700 text-white py-2 rounded-full flex items-center justify-center">
      <HandCoins size={16} className="mr-2" />
      福利服務中心
    </button>
  </div>
);

export default ServiceButtons;