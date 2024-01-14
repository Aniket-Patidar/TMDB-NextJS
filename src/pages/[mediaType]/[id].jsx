import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BannerDetails from "@/components/bannerDetails";
import useFetch from "@/hooks/useFetch";
import Cast from "@/components/cast";
import VideosSection from "@/components/videosSection";
import Similar from "@/components/similar";
import Recommendation from "@/components/recommendation";
import Spinner from "@/components/spinner";
const Id = () => {
  const router = useRouter();

  const { mediaType, id } = router.query;
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      {loading && (
        <div className="w-[100vw] h-[100vh] relative">
          <Spinner></Spinner>
        </div>
      )}
      <BannerDetails
        video={data?.results?.[0]}
        crew={credits?.crew}
        mediaType={mediaType}
        id={id}
      ></BannerDetails>
      <div className="space-y-5 relative">
        <ContentWrapper>
          <Cast data={credits?.cast} loading={creditsLoading} />
          <VideosSection data={data} loading={loading} />
          <Similar mediaType={mediaType} id={id} />
          <Recommendation mediaType={mediaType} id={id} />
        </ContentWrapper>
      </div>
    </div>
  );
};

export default Id;
