import React, { useEffect, useState } from "react";
import SwitchTab from "./switchTab";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import useFetch from "@/hooks/useFetch";
import Carousel from "./carousel";
const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (val) => {
    setEndpoint(val);
  };

  return (
    <ContentWrapper>
      <div className="py-5 min-h-[100px]  h-fit flex justify-between px-5 capitalize">
        <div className="font-semibold text-lg text-white">trending</div>
        <SwitchTab onTabChange={onTabChange} data={["day", "week"]}></SwitchTab>
      </div>
      <Carousel data={data?.results} loading={loading} />
    </ContentWrapper>
  );
};

export default Trending;
