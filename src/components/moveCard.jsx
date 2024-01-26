import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import dayjs from "dayjs";
import Img from "./lazyLoadImage/Img";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CircleRating from "./circleRating";
import Genres from "./genres";
const MoveCard = ({ data, fromSearch }) => {
  const router = useRouter();
  const { url } = useSelector((state) => state.home);

  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : "PosterFallback";

  return (
    <divb
      className="movieCard rounded-lg  text-[white] inline-block relative   m-2"
     // onClick={() => router.push(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        <Img
          className="posterImg h-[220px] w-[200px] rounded-lg"
          src={posterUrl}
        />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <div className="title text-sm ">
          {data?.name?.substring(0, 12) || data?.title?.substring(0, 12)}
        </div>
        <div className="date text-sm opacity-10">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </div>
      </div>
    </divb>
  );
};

export default MoveCard;
