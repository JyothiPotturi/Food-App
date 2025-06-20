import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import { PiShoppingCartFill } from "react-icons/pi";
import { globalContext } from "../../App";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import "./Header.css";

const Header = ({ setsearchTerm, settopRestaurants, topRestaurants }) => {
  const inputSearchRef = useRef();

  const { countglobal } = useContext(globalContext);

  const totalCartCount = useMemo(() => {
    return countglobal.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);
  }, [countglobal]);

  const [btnName, setbtnName] = useState("login");
  const [search, setsearch] = useState("");
  const [topRestName, setTopRestName] = useState("Top Rated Restaurants");

  const localStoragemode = localStorage.getItem("theme");

  const [mode, setmode] = useState(
    localStoragemode ? localStoragemode : "light"
  );

  useEffect(() => {
    document.body.classList.add(localStoragemode);
  }, []);

  useEffect(() => {
    inputSearchRef.current.focus();
  }, []);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          className="search-box"
          placeholder="search for restaurants"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
          ref={inputSearchRef}
        />

        <button
          className="search-button"
          onClick={() => {
            setsearchTerm(search);
          }}
        >
          <LuSearch />
        </button>
      </div>
      <div>
        <button
          className="filter-btn"
          onClick={() => {
            settopRestaurants(!topRestaurants);
            topRestName == "Top Rated Restaurants"
              ? setTopRestName("All Restaurants")
              : setTopRestName("Top Rated Restaurants");
          }}
        >
          {topRestName}
        </button>
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">
              <IoMdHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="./offers">
              <BiSolidOffer />
              <span>Offers</span>
            </Link>
          </li>
          <li>
            <Link to="./about">
              <IoInformationCircle />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link to="./cart">
              <PiShoppingCartFill />
              <span>Cart</span>
              <span>{totalCartCount}</span>
            </Link>
          </li>

          <li className ="toggle-mode"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setmode((prev) => {
                const mode = prev === "dark" ? "light" : "dark";
                localStorage.setItem("theme", mode);
                return mode;
              });
              document.body.classList.toggle("dark");
            }}
          >
            {mode == "dark" ? <MdLightMode /> : <MdDarkMode />}
          </li>
          <li
            className="login"
            onClick={() => {
              btnName == "login" ? setbtnName("logout") : setbtnName("login");
            }}
          >
            < IoMdContact style={{width:"20px"}} />
            <span style={{paddingLeft:"5px", width:"75px"}}>{btnName}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
