import React from 'react';
import { Search, Filter, Menu, User } from 'lucide-react';
import FilterMenu from './filtermenu';
import MenuComponent from './menu';

const Header = () => (
  <header className="bg-green-600 text-white p-4">
    <div className="flex justify-between items-center mb-4">
      <MenuComponent />
      <h1 className="text-xl font-bold">台北愛心服務</h1>
      {/* <User size={24} /> */}
    </div>
    <div className="relative">
      <input
        type="text"
        placeholder="搜尋服務或地點"
        className="w-full p-2 pl-10 pr-10 rounded-full text-black"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      {/* <FilterMenu /> */}
    </div>
  </header>
);

export default Header;