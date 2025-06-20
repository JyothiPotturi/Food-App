import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CDN_URL } from "../utils/constants";
import CardCart from "./CardCart";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { BiSolidCircle } from "react-icons/bi";

const RestaurantCategory = ({ data, showVeg, showNonVeg, index }) => {
  
  const [showItems, setshowItems] = useState(index==0);

  const handleClick = () => {
    setshowItems(!showItems);
  };

  const filteredMenu = showVeg
    ? data.itemCards.filter(
        (item) => item.card?.info?.itemAttribute?.vegClassifier === "VEG"
      )
    : showNonVeg
    ? data.itemCards.filter(
        (item) => item.card?.info?.itemAttribute?.vegClassifier === "NONVEG"
      )
    : data.itemCards;

  if (filteredMenu.length === 0) {
    return null;
  }

  return (
    <div>
      <h3
        style={{
          margin: "10px 0px",
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <div>
          {data.title}({filteredMenu?.length})
        </div>
        <div style={{ marginRight: "10px" }}>
          {showItems ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </h3>
      {showItems && (
        <ul style={{ padding: 0, margin: 0 }}>
          {filteredMenu.map((item) => {
            const {
              name,
              id,
              price,
              defaultPrice,
              ratings,
              description,
              imageId,
            } = item?.card?.info;
            const { vegClassifier } = item?.card?.info?.itemAttribute;
            return (
              <div className="RestItem" key={id}>
                <li className="resDish">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontWeight: 600 }}>
                      <span>
                        {vegClassifier == "VEG" ? (
                          <BiSolidCircle className="vegclass" />
                        ) : (
                          <IoTriangle className="nonvegclass" />
                        )}
                      </span>
                      <big>{name}</big>
                      <br />
                      {"Rs."}
                      {(price || defaultPrice) / 100}
                      <br />
                      {ratings?.aggregatedRating?.rating?.length && (
                        <>
                          <FaStar style={{color:"green"}}/>
                          {ratings.aggregatedRating.rating}(
                          {ratings.aggregatedRating.ratingCount})
                        </>
                      )}
                    </div>
                    <br />
                    <div className="description-box">{description}</div>
                  </div>
                  <div className="img-cart">
                    <img
                      className="resDish-logo"
                      alt="resdish-logo"
                      src={CDN_URL + imageId}
                    />
                    <CardCart id={id} price={price || defaultPrice} name={name} imageId={imageId}/>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      )}
      <div
        style={{
          borderBottom: "16px solid rgba(2, 6, 12, .0509803922)",
          margin: "20px 0px",
        }}
      ></div>
    </div>
  );
};

export default RestaurantCategory;
