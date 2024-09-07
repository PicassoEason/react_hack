import React, { useState, useEffect } from 'react';
import ServiceButtons from '../components/ServiceButtons';
import { MapPin, Bed, Clock } from 'lucide-react';

const DisabilityInstitutionSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [reservations, setReservations] = useState({});

  useEffect(() => {
    fetch('https://hack-bdend.vercel.app/api/emptySpace')
      .then(response => response.json())
      .then(data => setSpaces(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleReservation = (index, institutionName) => {
    if (reservations[index]) {
      if (window.confirm(`確定要取消 ${institutionName} 的預約嗎？`)) {
        setReservations(prev => ({
          ...prev,
          [index]: false
        }));
        alert(`已成功取消 ${institutionName} 的預約。`);
      }
    } else {
      if (window.confirm(`確定要預約 ${institutionName} 嗎？`)) {
        setReservations(prev => ({
          ...prev,
          [index]: true
        }));
        alert(`已成功預約 ${institutionName}。`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <div className="bg-white shadow-md">
        <ServiceButtons />
      </div>
      <main className="flex-1 overflow-auto p-1">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">身障機構空位一覽</h2>
          <div className="space-y-4">
            {spaces.map((space, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{space.機構名稱}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{space.地址}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="flex items-center text-gray-600">
                    <Bed size={16} className="mr-2" />
                    <span className="text-sm">全日型床位: {space.全日型住宿床位數量}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">緊急床位: {space.緊急短期安置床位數量}</span>
                  </div>
                </div>
                <div className="mt-4">
                  {space.全日型住宿床位數量 > 0 ? (
                    <button
                      onClick={() => handleReservation(index, space.機構名稱)}
                      className={`w-full px-4 py-2 rounded-full text-white font-medium ${
                        reservations[index]
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {reservations[index] ? "取消預約" : "可預約"}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full px-4 py-2 rounded-full text-white font-medium bg-gray-400 cursor-not-allowed"
                    >
                      不可預約
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DisabilityInstitutionSpaces;