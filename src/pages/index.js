import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { fetchDataFromApi } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from '@/redux/sclice/homeSlice'
import Header from "../components/header"
import Footer from "../components/footer"
import HeroBanner from "../components/HeroBanner"
import useFetch from '@/hooks/useFetch'
import Trending from '@/components/teanding'
import Popular from '@/components/populat'
import TopRated from '@/components/topRated'
export default function Home() {
  const dispatch = useDispatch()

  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    fetchApiConfing();
    genresCall();
  }, [])
  const fetchApiConfing = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res, "configuration");
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }


  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };


  return (
    <div className="home">
      <HeroBanner></HeroBanner>
      <Trending></Trending>
      <Popular></Popular>
      <TopRated></TopRated>
    </div >
  )
}
