import React from 'react';
import { HandCoins, Info, Cookie, BedSingle, HeartHandshake, Accessibility, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gray-100 overflow-hidden">
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex space-x-4 px-4 py-4 min-w-max">
        <button 
          className="flex-none h-12 bg-pink-100 text-pink-600 px-4 rounded-full flex items-center justify-center whitespace-nowrap"
          onClick={() => navigate('/favorites')}
        >
          <Heart size={16} className="mr-2" />
          我的收藏
        </button>
        <button 
          className="flex-none h-12 bg-blue-100 text-blue-600 px-4 rounded-full flex items-center justify-center whitespace-nowrap"  
          onClick={() => navigate('/')}
        >
          <HeartHandshake size={16} className="mr-2" />
          附近友善店家
        </button>
        <button 
          className="flex-none h-12 bg-red-100 text-red-600 px-4 rounded-full flex items-center justify-center whitespace-nowrap"
          onClick={() => navigate('/love-restaurants')}
        >
          <Cookie size={16} className="mr-2" />
          愛心餐廳
        </button>
        <button 
          className="flex-none h-12 bg-orange-200 text-orange-700 px-4 rounded-full flex items-center justify-center whitespace-nowrap"
          onClick={() => navigate('/disability-spaces')}
        >
          <Accessibility size={16} className="mr-2" />
          身障機構空位
        </button>
        <button 
          className="flex-none h-12 bg-yellow-700 text-white px-4 rounded-full flex items-center justify-center whitespace-nowrap"
          onClick={() => navigate('/sponsor-Form')}
        >
          <HandCoins size={16} className="mr-2" />
          我要捐款
        </button>
      </div>
    </div>
  </div>
  );
};

export default ServiceButtons;