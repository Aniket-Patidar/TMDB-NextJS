import React, { useState } from "react";

const SwitchTab = ({ onTabChange, data }) => {
  const [left, setLeft] = useState(0); 

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    onTabChange(tab, index);
  };

  return (
    <div className="relative flex overflow-hidden bg-white items-center rounded-full h-[30px] px-[.5]">
      {data.map((val, index) => (
        <span
          key={index}
          className="text-sm cursor-pointer z-20 w-[100px] h-[32px] text-center flex items-center justify-center text-black"
          onClick={() => activeTab(val, index)}
        >
          {val}
        </span>
      ))}
      <span
        className="absolute bg-gradient-to-r from-orange-500 to-pink-600 rounded-full h-[28px] w-[100px] transition-all duration-300 text-sm"
        style={{ left: `${left}px` }} 
      />
    </div>
  );
};

export default SwitchTab;
