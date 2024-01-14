import React, { useState } from "react";

const SwitchTab = ({ onTabChange, data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);

    // setTimeout(() => {
    //   setSelectedTab(index);
    // }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="text-white relative flex overflow-hidden bg-white items-center rounded-full h-[30px]">
      {data.map((val, index) => (
        <span
          key={index}
          className="text-sm cursor-pointer z-20 w-[100px] h-[30px] text-center flex items-center justify-center text-black"
          onClick={() => activeTab(val, index)}
        >
          {val}
        </span>
      ))}
      <span
        className={`bg-gradient-to-r from-orange-500 to-pink-600 absolute rounded-full h-full w-[100px] left-[${left}px] transition-all duration-300`}
      />
    </div>
  );
};

export default SwitchTab;
