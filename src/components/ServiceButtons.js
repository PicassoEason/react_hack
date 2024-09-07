import React from 'react';
import { Heart, Info } from 'lucide-react';

const ServiceButtons = () => (
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
);

export default ServiceButtons;