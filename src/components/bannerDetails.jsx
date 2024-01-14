import useFetch from "@/hooks/useFetch";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Img from "./lazyLoadImage/Img";
import dayjs from "dayjs";
import Genres from "./genres";
import CircleRating from "./circleRating";
import { PlayIcon } from "./playIcon";
import { FaRegCirclePlay } from "react-icons/fa6";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import VideoPopup from "./videpPopup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const bannerDetails = ({ mediaType, id, video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [rating, setRating] = useState(5);

  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  useState(() => {
    setRating(data?.vote_average?.toFixed(1));
  }, []);

  const pathColor = rating < 5 ? "red" : rating < 7 ? "orange" : "green";

  const styles = buildStyles({
    pathColor: pathColor,
  });

  return (
    <div>
      {data && (
        <div className="relative ">
          <div className="backdrop-img">
            <Img
              className="w-[100vw] h-[80vh] object-cover"
              src={url.backdrop + data.backdrop_path}
            />
          </div>
          <div
            className="w-[100vw] min-h-[80vh] items-center absolute top-0 left-0 flex flex-col md:flex-row  py-10 md:py-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)",
            }}
          >
            {
              <div className="left  items-center hidden  md:flex justify-center md:justify-end md:px-5 h-full w-[100%] md:w-[50%]">
                {data.poster_path ? (
                  <Img
                    className="posterImg w-[300px] object-cover object-center rounded-lg"
                    src={url.backdrop + data.poster_path}
                  />
                ) : (
                  <Img className="posterImg" src={"PosterFallback"} />
                )}
              </div>
            }
            <ContentWrapper>
              <div className="right flex flex-col h-fit overflow-hidden md:h-[80vh] justify-center">
                <p className="text-white font-light text-3xl">
                  {`${(data.name || data.title).slice(0, 15)}${
                    (data.name || data.title).length > 20 ? "..." : ""
                  } (${dayjs(data?.release_date).format("YYYY")})`}
                </p>

                <div className="subtitle font-extralight text-[#ffffffb6] opacity-2">
                  {data.tagline}
                </div>

                <div className="row flex items-center gap-1">
                  <div className="flex items-center">
                    <CircularProgressbar
                      value={data?.vote_average?.toFixed(1)}
                      maxValue={10}
                      text={data?.vote_average?.toFixed(1)}
                      className="w-[60px] h-[50px]"
                      styles={styles}
                    />
                    <FaRegCirclePlay
                      onClick={() => {
                        setShow(true);
                        setVideoId(video.key);
                      }}
                      className="w-full mr-2 text-white text-[60px]"
                    />
                    <span className="text text-nowrap font-bold text-lg text-white">
                      Watch Trailer
                    </span>
                  </div>
                </div>
                <div className="overview text-white  p-5 md:p-0 md:w-1/2 font-extralight">
                  <div className="heading  font-semibold my-2">Overview</div>
                  <div className="description text-sm">{data.overview}</div>
                </div>

                <div className="info flex gap-3 text-white mt-2 ">
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text text-[#dadadaa3]">
                        {data.status}
                      </span>
                    </div>
                  )}
                  {data.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text text-[#dadadaa3]">
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text text-[#dadadaa3]">
                        {toHoursAndMinutes(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                <hr className="md:w-1/2 h-[1px] my-2" />

                {director?.length > 0 && (
                  <div className="info text-white">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {director?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {director.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                <hr className="md:w-1/2 h-[1px] my-2" />

                {writer?.length > 0 && (
                  <div className="info text-white">
                    <span className="text bold">Writer: </span>
                    <span className="text">
                      {writer?.map((d, i) => (
                        <span key={i}>
                          {d.name}
                          {writer.length - 1 !== i && ", "}
                        </span>
                      ))}
                    </span>
                    <hr className="md:w-1/2 h-[1px] my-2" />
                  </div>
                )}
              </div>

              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </ContentWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default bannerDetails;
