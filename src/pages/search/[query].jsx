import Carousel from "@/components/carousel";
import ContentWrapper from "@/components/contentWrapper/ContentWrapper";
import MoveCard from "@/components/moveCard";
import Spinner from "@/components/spinner";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const Search = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const query = router.query.query;

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  console.log(data);
  return (
    <div className="searchResultsPage py-20 min-h-[100vh]  relative text-white ">
      <div className="">{loading && <Spinner initial={true} />}</div>
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <div className="flex  gap-4 ">
                <div className="flex ">
                  <InfiniteScroll
                    className="content"
                    dataLength={data?.results?.length || []}
                    next={fetchNextPageData}
                    hasMore={pageNum <= data?.total_pages}
                    loader={<Spinner />}
                  >
                    {data?.results.map((item, index) => {
                      if (item.media_type === "person") return;
                      return (
                        <MoveCard key={index} data={item} fromSearch={true} />
                      );
                    })}
                  </InfiniteScroll>
                </div>
              </div>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default Search;
