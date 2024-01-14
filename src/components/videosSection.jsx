import React, { useState } from "react";

import ContentWrapper from "./contentWrapper/ContentWrapper";
import VideoPopup from "./videpPopup";
import Img from "./lazyLoadImage/Img";
import { FaRegCirclePlay } from "react-icons/fa6";

const VideosSection = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection text-white">
      <ContentWrapper>
        <div className="sectionHeading pb-3 ">Official Videos</div>
        {!loading ? (
          <div className="videos flex gap-2 overflow-x-auto">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                className="videoItem flex-shrink-0 over"
                onClick={() => {
                  setVideoId(video.key);
                  setShow(true);
                }}
              >
                <div className="videoThumbnail rounded-lg  relative  overflow-scroll">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <FaRegCirclePlay className="absolute cursor-pointer  z-99 top-[50%] right-[50%] -translate-y-[50%] -translate-x-[50%] text-lg" />
                </div>
                <div className="videoTitle text-sm">{video.name.substring(0, 12)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
