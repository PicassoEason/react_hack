import React from 'react';
import { HandCoins, Info, Cookie, BedSingle, HeartHandshake, Accessibility, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-2 p-4">
      <button 
        className="flex-1 bg-pink-100 text-pink-600 py-2 rounded-full flex items-center justify-center"
        onClick={() => navigate('/favorites')}
      >
      <Heart size={16} className="mr-2" />
        我的收藏
      </button>
      <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-full flex items-center justify-center"  
        onClick={() => navigate('/')}
      >
        <HeartHandshake size={16} className="mr-2" />
        附近友善店家
      </button>
      <button 
        className="flex-1 bg-red-100 text-red-600 py-2 rounded-full flex items-center justify-center"
        onClick={() => navigate('/love-restaurants')} // 更新這行
      >
        <Cookie size={16} className="mr-2" />
        愛心餐廳
      </button>
      <button 
        className="flex-1 bg-orange-200 text-orange-700 py-2 rounded-full flex items-center justify-center"
        onClick={() => navigate('/disability-spaces')}
      >
        <Accessibility size={16} className="mr-3" />
        身障機構空位
      </button>
      <button className="flex-1 bg-yellow-700 text-white py-2 rounded-full flex items-center justify-center"
        onClick={() => navigate('/sponsor-Form')} // 更新這行
      >
        <HandCoins size={20} className="mr-5" />
        我要捐款
      </button>
    </div>
  );
};

export default ServiceButtons;