import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const router = useRouter();
  const location = router.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenu(false);
    setShowSearch(false)
  }, [location,router.query]);
  
  const controlNavbar = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      if (scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const navColor = {
    default: {
      /* your default styles go here */
    },
    top: {
      background: "rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(3.5px)",
      WebkitBackdropFilter: "blur(3.5px)",
    },
    show: {
      backgroundColor: "var(--black3)",
    },
    hide: {
      transform: "translateY(-60px)",
    },
  };

  const searchQueryHandler = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      setQuery(event.target.value);
      router.push("/search/" + query);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handelNavigation = (type) => {
    if (type === "movie") {
      router.push("/explore/movie");
    } else {
      router.push("/explore/tv");
    }
  };

  return (
    <header
      className={`text-white fixed z-10 h-12  w-full header ${
        mobileMenu ? "mobileView" : ""
      } `}
      style={navColor[show]}
    >
      <ContentWrapper>
        <div className="flex items-center justify-between md:p-2">
          <div className="logo cursor-pointer">
            <img
              onClick={() => router.push("/")}
              src="./movix-logo.svg"
              alt=".."
            />
          </div>
          <ul className="menuItem flex gap-5 hidden md:flex">
            <li
              className="menuItem cursor-pointer"
              onClick={() => handelNavigation("movie")}
            >
              Moves
            </li>
            <li
              className="menuItem cursor-pointer"
              onClick={() => handelNavigation("tv")}
            >
              TV show
            </li>
            <li className="menuItem cursor-pointer">
              <HiOutlineSearch
                onClick={() => setShowSearch(true)}
              ></HiOutlineSearch>
            </li>
          </ul>
          <div className="mobileMenu flex gap-3 md:hidden ">
            <HiOutlineSearch
              onClick={() => setShowSearch(true)}
              className="font-semibold cursor-pointer"
            ></HiOutlineSearch>
            {!mobileMenu ? (
              <SlMenu
                className="font-semibold cursor-pointer"
                onClick={openMobileMenu}
              ></SlMenu>
            ) : (
              <VscChromeClose
                className="font-semibold cursor-pointer"
                onClick={() => setMobileMenu(false)}
              ></VscChromeClose>
            )}
          </div>
        </div>
        {mobileMenu && (
          <div
            className={`w-full mt-2 md:hidden bg-black p-3 space-y-5 py-8 transition-transform duration-300 transform ${
              mobileMenu ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <p
              className="cursor-pointer"
              onClick={() => handelNavigation("movie")}
            >
              Movies
            </p>
            <p
              className="cursor-pointer"
              onClick={() => handelNavigation("tv")}
            >
              TV Shows
            </p>
          </div>
        )}
        {showSearch && (
          <div className="h-[40px] flex justify-between  px-2  bg-white text-black md:-mt-2 ">
            <input
              type="text"
              className="w-[79%] md:w-[79%] h-full p-3 outline-none"
              placeholder="Search for a movie or tv show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose
              onClick={() => setShowSearch(false)}
              className=" h-[100%] text-1xl  font-bold cursor-pointer  "
            ></VscChromeClose>
          </div>
        )}
      </ContentWrapper>
    </header>
  );
};

export default Header;
