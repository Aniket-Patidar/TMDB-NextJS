import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';

const Index = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { url } = useSelector((state) => state.home);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      setQuery(event.target.value);
      router.push("/search/" + query);
    }
  }

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    console.log(bg);
  }, [data, url]); // Include 'data' and 'url' in the dependency array

  return (
    <div className="relative flex justify-center items-center text-white w-[100vw] h-[100vh]">
      {!loading && (
        <div className='flex items-center justify-center'>
          <Img src={background} className={"w-[100vw] h-[90vh] bg-cover bg-center object-cover object-center "}></Img>
        </div>
      )}

      <div className='opacitylayer w-full h-[250px] absolute bottom-0 left-0' style={{
        height: '100vh',
        background: 'linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)',
      }}></div>
      
      <div className="absolute top-[50%] left-[50%] w-full p-3 -translate-x-[50%] -translate-y-[50%] heroBannerContent text-center flex flex-col items-center space-y-2">
        <p className="title font-bold text-[7vw] md:text-7xl">Welcome.</p>
        <p className="subTitle text-sm md:text-2xl font-thin">
          Millions of movies, TV shows and people to discover.
          Explore now.
        </p>
        <div className="searchInput relative w-[85%] md:w-[40%] h-[40px] md:h-[50px] rounded-full overflow-hidden bg-white text-black flex">
          <input
            type="text"
            className='w-[79%] md:w-[79%] h-full p-3'
            placeholder="Search for a movie or tv show...."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
          <button className='bg-gradient-to-r from-orange-500 to-pink-600 h-[100%] text-sm md:w-[21%] font-semibold p-2 absolute right-0 '>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Index;
