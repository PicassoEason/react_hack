import React, { useState, useEffect } from 'react';
import ServiceButtons from '../components/ServiceButtons';

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
      // 取消預約
      if (window.confirm(`確定要取消 ${institutionName} 的預約嗎？`)) {
        setReservations(prev => ({
          ...prev,
          [index]: false
        }));
        alert(`已成功取消 ${institutionName} 的預約。`);
      }
    } else {
      // 進行預約
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
    <div className="h-screen flex flex-col bg-gray-100">
      <main className="flex-1 overflow-auto p-4">
        <div className="bg-white shadow rounded-lg p-6">
          <ServiceButtons />
          <h2 className="text-2xl font-bold mb-4">身障機構空位一覽</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">機構名稱</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地址</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">全日型住宿床位數量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">緊急床位數量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">預約</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {spaces.map((space, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{space.機構名稱}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{space.地址}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{space.全日型住宿床位數量}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{space.緊急短期安置床位數量}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {space.全日型住宿床位數量 > 0 ? (
                        <button
                          onClick={() => handleReservation(index, space.機構名稱)}
                          className={`px-4 py-2 rounded-md text-white font-medium ${
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
                          className="px-4 py-2 rounded-md text-white font-medium bg-blue-500 opacity-50 cursor-not-allowed"
                        >
                          不可預約
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DisabilityInstitutionSpaces;