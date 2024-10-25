// SimulateButton.tsx
import React from 'react';

const SimulateButton: React.FC = () => {
  const handleClick = () => {
    console.log("Simulate button clicked");
    // Add any additional logic for the simulate action here
  };

  return (
    <div className="mt-5">
      <button
        onClick={handleClick}
        className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Simulate
      </button>
    </div>
  );
};

export default SimulateButton;
