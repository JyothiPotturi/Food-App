import { CDN_URL } from "../utils/constants";
import "./RestaurantCard.css";

import { FcRating } from "react-icons/fc";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
    name,
    avgRating,
    cuisines,
    sla,
    areaName,
  } = resData?.info;

  return (
    <div className="res-card">
      <div className="res-logo">
        <img alt="res-logo" src={CDN_URL + cloudinaryImageId} />
        <div className="card-header">
          {aggregatedDiscountInfoV3?.header}{" "}
          {aggregatedDiscountInfoV3?.subHeader}
        </div>
      </div>
      <div className="rescard-info">
        <h3>{name}</h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FcRating style={{ marginTop: "1.5px" }} />
          <h4>
            {avgRating} {" • "}
            {sla?.slaString}
          </h4>
        </div>
        <p className="cuisines">{cuisines.join(", ")}</p>
        <p> {areaName}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
