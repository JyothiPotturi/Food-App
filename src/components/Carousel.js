import React from "react";
import { Carousel_Url } from "../utils/constants";
import "./Carousel.css"

const Carousel = ({ CarouselList }) => {
  return (
    <div className="Carouselcontainer">
      <h2 style={{marginBottom:"0"}}>What's on your mind?</h2>
      <div className="Carousel">
        {CarouselList.map((item) => (
          <div key={item.imageId} className="carouselimage">
            <img src={Carousel_Url + item.imageId} alt="carousel image" className="carouselimage"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
