import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
// import resList from "../utils/mockdata";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import { useOutletContext } from "react-router";
import Carousel from "./Carousel";

const Body = () => {
  const { searchTerm, topRestaurants } = useOutletContext();

  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [CarouselList, setCarouselList] = useState([]);
  const [istopRestaurant, setistopRestaurant] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://food-app-backend-g98l.onrender.com/api/restaurants"
    );
    const json = await data.json();
    setCarouselList(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );
    setListOfRestraunt(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setfilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  useEffect(() => {
    setfilteredRestaurant(
      listOfRestaurants.filter((res) => {
        return res.info.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  useEffect(() => {
    if (topRestaurants) {
      setistopRestaurant(true);
      const filteredList = listOfRestaurants.filter(
        (res) => res.info.avgRating > 4.5
      );
      setfilteredRestaurant(filteredList);
    } else {
      setistopRestaurant(false);
      setfilteredRestaurant(listOfRestaurants);
    }
  }, [topRestaurants]);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      {filteredRestaurant.length === 0 ? (
        <h2 className="no-results-message">
          No restaurants found matching your criteria.
        </h2>
      ) : (
        <div>
          <Carousel CarouselList={CarouselList} />
          <hr
            style={{
              border: "1px solid rgba(2, 6, 12, 0.05)",
              margin: "32px auto",
            }}
          ></hr>
          <h2 style={{ fontSize: "1.5em", fontWeight: "bold" }}>
            {istopRestaurant
              ? "Top Rated Restaurants Near You"
              : "Restaurants with online food delivery"}
          </h2>
          <div className="res-container">
            {filteredRestaurant.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
              >
                <RestaurantCard resData={restaurant} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
