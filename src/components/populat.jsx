import React, { useEffect, useState } from "react";
import SwitchTab from "./switchTab";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import useFetch from "@/hooks/useFetch";
import Carousel from "./carousel";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <ContentWrapper>
      <div className="py-5  h-fit flex justify-between px-5 capitalize">
        <div className="font-semibold text-lg text-white">What&apos;s Popular</div>
        <SwitchTab onTabChange={onTabChange}  data={["Movies", "TV Shows"]} />
      </div>
      <Carousel data={data?.results} endpoint={endpoint} loading={loading} />
    </ContentWrapper>
  );
};

export default Popular;
