import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import MoveCard from "@/components/moveCard"; // Assuming you have a MovieCard component
import Spinner from "@/components/spinner";
import useFetch from "@/hooks/useFetch";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const router = useRouter();
  const { mediaType } = router.query;
  console.log(mediaType);

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  console.log(data);
  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(`/discover/${mediaType}`, filters);
      setData(res);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPageData = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(
        `/discover/${mediaType}?page=${pageNum}`,
        filters
      );
      setData((prevData) => ({
        ...prevData,
        results: [...(prevData?.results || []), ...res.results],
      }));
      setPageNum((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching next page data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);

  return (
    <ContentWrapper>
      <div className=" text-[white] flex flex-wrap items-center justify-center pt-[60px] relative min-h-[100vh]">
        {loading && <Spinner />}
      {!loading ? (
        <InfiniteScroll
          className="content"
          dataLength={data?.results?.length || 0}
          next={fetchNextPageData}
          hasMore={pageNum <= data?.total_pages}
          loader={<Spinner />}
        >
          <p className="text-lg font-semibold">Wellcome  to <span className="capitalize">  {mediaType}</span> page</p>
          {data?.results?.map((item, index) => {
            // if (item.media_type === "person") return null; // Skip rendering for persons
            return <MoveCard key={index} data={item} mediaType={mediaType} />;
          })}
        </InfiniteScroll>
      ) : (
        <span className="resultNotFound">Sorry, Results not found!</span>
      )}
      </div>

    </ContentWrapper>
  );
};

export default Explore;
