import React from "react";
import { useSelector } from "react-redux";

import ContentWrapper from "./contentWrapper/ContentWrapper";
import Img from "./lazyLoadImage/Img";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const avatar = "./public/avatar.png";

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection text-white ">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems flex justify-between items-center py-5  gap-10 overflow-scroll">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : "./avatar.png";
              return (
                <div key={item.id} className="listItem text-center  flex-shrink-0">
                  <div className="profileImg w-[90px] h-[90px] flex-shrink-0 rounded-full overflow-hidden ">
                    <Img src={imgUrl} />
                  </div>
                  <div className="name text-sm">{item.name}</div>
                  <div className="character text-sm opacity-10">
                    {item.character.substring(0, 12)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
