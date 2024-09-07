import React from 'react';
import StoreCard from './StoreCard';

const NearbyStores = ({ setSelectedStore }) => (
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
);

export default NearbyStores;