import React from 'react';
import { MapPin} from 'lucide-react';

const StoreCard = ({ id, name, distance, address, isFavorite, onClick, onFavoriteToggle }) => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
    <div onClick={onClick} className="cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin size={16} className="mr-2" />
        <span className="text-sm">{address}</span>
        <span className="text-sm">距離: {distance}</span>
      </div>
    </div>
    <div className="mt-4">
      <button
        onClick={() => onFavoriteToggle(id)}
        className={`w-full px-4 py-2 rounded-full text-white font-medium ${
          isFavorite
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isFavorite ? "取消收藏" : "加入收藏"}
      </button>
    </div>
  </div>
);

export default StoreCard;