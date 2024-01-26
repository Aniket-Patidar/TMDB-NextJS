import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="text-5xl text-white absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
      <ClipLoader color="#36d7b7" />
    </div>
  );
};

export default Spinner;
