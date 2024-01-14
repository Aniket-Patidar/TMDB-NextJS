import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="text-white absolute right-2 bottom-[10%] hidden md:inline-block space-y-1">
      {data.map((g) => {
        if (!genres[g]?.name) return;
        return <div className="bg-[#da2f68] text-center py-1 rounded-lg px-1 text-sm" key={g}>{genres[g]?.name}</div>;
      })}
    </div>
  );
};

export default Genres;
