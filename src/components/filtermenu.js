import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const FilterMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    serviceType: [],
    distance: 5,
    openNow: false,
    rating: 0,
  });

  const toggleFilter = () => setIsOpen(!isOpen);

  const handleServiceTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      serviceType: prev.serviceType.includes(type)
        ? prev.serviceType.filter(t => t !== type)
        : [...prev.serviceType, type]
    }));
  };

  const handleDistanceChange = (e) => {
    setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }));
  };

  const handleOpenNowChange = () => {
    setFilters(prev => ({ ...prev, openNow: !prev.openNow }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({ ...prev, rating }));
  };

  return (
    <>
      <Filter
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        size={20}
        onClick={toggleFilter}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">篩選條件</h2>
              <button onClick={toggleFilter}><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">服務類型</h3>
                <div className="flex flex-wrap gap-2">
                  {['愛心餐', '食物銀行', '社會救助', '衣物捐贈'].map(type => (
                    <button
                      key={type}
                      onClick={() => handleServiceTypeChange(type)}
                      className={`px-3 py-1 rounded-full ${
                        filters.serviceType.includes(type) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">距離 ({filters.distance} 公里內)</h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={filters.distance}
                  onChange={handleDistanceChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.openNow}
                    onChange={handleOpenNowChange}
                    className="mr-2"
                  />
                  僅顯示營業中
                </label>
              </div>
              <div>
                <h3 className="font-semibold mb-2">最低評分</h3>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`px-3 py-1 rounded-full ${
                        filters.rating >= star 
                          ? 'bg-yellow-400 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {star}⭐
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={toggleFilter} 
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-full"
            >
              套用篩選
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterMenu;