import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding:"0 20px"
      }}
      className=""
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
