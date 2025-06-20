import "./Offers.css"

const Offers = () => {
  return (
    <div className="offerscontainer">
      <div>
        <img
          className="offersimg"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/seo/DO_collectionBanner.png"
          alt="Restaurants with greatoffers"
        ></img>
      </div>
      <div className="offersbox">
        <h2>Get the Best Offers on Food from Top Restaurants Near You</h2>
        <p>
          Get ready for a delicious adventure packed with unbeatable dining
          offers at your favorite restaurants. Whether you’re craving a cheesy
          pizza, a juicy burger, or a delightful bowl of pasta, now is the
          perfect time to head out and indulge in your favorite meals—while
          saving big!
        </p>
      </div>
    </div>
  );
};

export default Offers;
