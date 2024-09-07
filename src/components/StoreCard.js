import React from 'react';
import { MapPin } from 'lucide-react';

const StoreCard = ({ name, distance, onClick }) => (
  <div className="flex-shrink-0 w-40 bg-gray-50 rounded-lg p-3 shadow" onClick={onClick}>
    <MapPin size={20} className="text-green-500 mb-2" />
    <h3 className="font-bold text-sm mb-1">{name}</h3>
    <p className="text-gray-500 text-xs">{distance}</p>
  </div>
);

export default StoreCard;