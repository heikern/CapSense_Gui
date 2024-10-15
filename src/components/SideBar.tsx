import React from 'react';

const SideBar: React.FC = () => {
  return (
    <div className="bg-gray-800 w-full h-full p-4">
      <h2 className="text-white text-lg">Side Bar</h2>
      <ul className="text-white">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>
  );
};

export default SideBar;
