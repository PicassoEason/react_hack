import React, { useState } from 'react';
import { Menu, X, Home, Map, Heart, Info, Settings, Phone } from 'lucide-react';    

const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <Home size={24} />, label: '首頁', link: '/' },
    { icon: <Map size={24} />, label: '服務地圖', link: '/map' },
    { icon: <Heart size={24} />, label: '我的收藏', link: '/favorites' },
    { icon: <Info size={24} />, label: '使用指南', link: '/guide' },
    { icon: <Phone size={24} />, label: '緊急聯絡', link: '/emergency' },
    { icon: <Settings size={24} />, label: '設置', link: '/settings' },
  ];

  return (
    <>
      <Menu size={24} onClick={toggleMenu} className="cursor-pointer" />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white h-full w-64 p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">選單</h2>
              <button onClick={toggleMenu}><X size={24} /></button>
            </div>
            <nav>
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.link} className="flex items-center space-x-3 text-gray-700 hover:text-green-500">
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuComponent;