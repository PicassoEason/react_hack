import React from 'react';
import { MapPin, Heart } from 'lucide-react';

const StoreCard = ({ id, name, distance, isFavorite, onClick, onFavoriteToggle }) => (
  <div className="flex-shrink-0 w-40 bg-white rounded-lg p-3 shadow relative">
    <div onClick={onClick}>
      <MapPin size={20} className="text-green-500 mb-2" />
      <h3 className="font-bold text-sm mb-1">{name}</h3>
      <p className="text-gray-500 text-xs">{distance}</p>
    </div>
    <button 
      className="absolute top-2 right-2 p-1 rounded-full bg-white shadow"
      onClick={() => onFavoriteToggle(id)}
    >
      <Heart size={16} className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"} />
    </button>
  </div>
);

export default StoreCard;