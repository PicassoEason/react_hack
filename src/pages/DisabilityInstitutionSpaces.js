import React, { useState, useEffect } from 'react';
// import Header from '../components/Header';
import ServiceButtons from '../components/ServiceButtons';
const DisabilityInstitutionSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetch('https://hack-bdend.vercel.app/api/emptySpace')
      .then(response => response.json())
      .then(data => setSpaces(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* <Header /> */}
      <main className="flex-1 overflow-auto p-4">
        <div className="bg-white shadow rounded-lg p-6">
          {<ServiceButtons />}
          <h2 className="text-2xl font-bold mb-4">身障機構空位一覽</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">機構名稱</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地址</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">全日型住宿床位數量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">緊急床位數量</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {spaces.map((space, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{space.機構名稱}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{space.地址}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{space.全日型住宿床位數量}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{space.緊急短期安置床位數量}</td>
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