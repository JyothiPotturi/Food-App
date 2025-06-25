import { useState, useEffect } from "react";
import Shimmermenu from "./Shimmermenu";
import { useOutletContext, useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import RestaurantCategory from "./RestaurantCategory";
import { IoTriangle } from "react-icons/io5";
import { BiSolidCircle } from "react-icons/bi";

import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const [ResInfo, setResInfo] = useState(null);
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);

  const toggleVeg = () => {
    setShowVeg(!showVeg);
    setShowNonVeg(false);
  };

  const toggleNonVeg = () => {
    setShowNonVeg(!showNonVeg);
    setShowVeg(false);
  };

  const { resid } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      `https://food-app-backend-g98l.onrender.com/api/menu?resid=${resid}&catalog_qa=undefined&submitAction=ENTER`
      // "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=" +
      //   resid +
      //   "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();

    setResInfo(json.data);
  };

  if (ResInfo === null) return <Shimmermenu />;

  const {
    name,
    cuisines,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    sla,
  } = ResInfo?.cards[2]?.card?.card?.info;

  const categories =
    ResInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => {
      return (
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });

  return (
    <div className="menu">
      <h1>{name}</h1>
      <div className="menu_heading_box">
        <div className="menu_heading_decor">
          <div>
            <FaStar/>
          </div>
          <h3>{avgRating} </h3>
          <h3>({totalRatingsString})</h3>
          <div style={{ marginLeft: "10px" }}>
            <h3>{costForTwoMessage}</h3>
          </div>
          <h4 style={{ flexBasis: "100%", margin: 5 }}>
            {sla?.slaString.toLowerCase()}
          </h4>
        </div>
      </div>
      <h2>{cuisines.join(",")}</h2>
      <div className="menu_heading">MENU</div>

      <div className="toggle-container" style={{ display: "flex" }}>
        <button>
          <div className={`toggle-border${showVeg ? " green" : ""}`}>
            <input
              id="veg"
              type="checkbox"
              checked={showVeg}
              onChange={toggleVeg}
            />
            <label htmlFor="veg" className="veg-label">
              <BiSolidCircle
                className="vegclass"
                style={{ background: "white", cursor: "pointer" }}
              />
            </label>
          </div>
        </button>

        <button>
          <div className={`toggle-border${showNonVeg ? " red" : ""}`}>
            <input
              id="nonVeg"
              type="checkbox"
              checked={showNonVeg}
              onChange={toggleNonVeg}
            />
            <label htmlFor="nonVeg" className="non-veg-label">
              <div className="">
                <IoTriangle
                  className="nonvegclass"
                  style={{ background: "white", cursor: "pointer" }}
                />
              </div>
            </label>
          </div>
        </button>
      </div>
      <div
        style={{
          height: "0.5px",
          backgroundColor: "rgba(2, 6, 12, 0.15)",
          margin: "24px auto",
        }}
      ></div>

      {categories.map((category,index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showVeg={showVeg}
          showNonVeg={showNonVeg}
          index={index}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
