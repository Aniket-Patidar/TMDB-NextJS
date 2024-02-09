// Import necessary libraries and components
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { FaRegCirclePlay } from "react-icons/fa6";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import Img from "./lazyLoadImage/Img";
// import PosterFallback from "../../assets/no-poster.png";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import CircleRating from "./circleRating";
import Genres from "./genres";
import { useRef } from "react";
// Carousel component
const Carousel = ({ data, loading, endpoint, title }) => {
  const { url } = useSelector((state) => state.home);
  const router = useRouter();
  const carouselRef = useRef();

  const navigate = (dir) => {
    const container = carouselRef.current;
    const scrollAmount =
      dir == "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel relative  min-h-[200px]">
      <ContentWrapper>
        {title && <div className="text-white font-lg my-2">{title}</div>}
        <BsFillArrowLeftCircleFill
          onClick={() => navigate("left")}
          className="cursor-pointer absolute  hidden md:flex z-10 top-[50%] left-7 text-lg"
        />

        {!loading ? (
          <div ref={carouselRef} className="flex gap-5 overflow-x-auto">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : "PosterFallback";
              const truncatedTitle = (item.title || item.name).substring(0, 15);
              return (
                <div
                  key={item.id}
                  className="cursor-pointer flex-nowrap flex-shrink-0"
                  onClick={() =>
                    router.push(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="relative">
                    <Img
                      className="h-[300px] w-[200px] rounded-lg"
                      src={posterUrl}
                      alt={item.title || item.name}
                    />
                    <div className="w-[40px] -mt-8">
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                    </div>
                    <Genres data={item.genre_ids.slice(0, 2)}></Genres>
                  </div>

                  <div className="text-white text-sm">
                    <p className="s">{truncatedTitle}</p>
                    <p className="opacity-10">
                      {dayjs(item.release_Date).format("MMM D,YYYY")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}

        <BsFillArrowRightCircleFill
          onClick={() => navigate("right")}
          className="cursor-pointer absolute hidden md:flex z-10 top-[50%] right-7 -translate-y-[50%] -translate-x-[50%] text-lg"
        />
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
