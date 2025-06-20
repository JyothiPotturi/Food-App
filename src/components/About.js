import "./About.css";

const About = () => {
  return (
    <div className="contact-container" >
      <div className="contact-info">
        
        <h1 className="contact-title">
          Get food at your doorstep,{" "}
          <span className="contact-highlight">
            faster than ever
          </span>{" "}
          -wherever you are.
        </h1>
        <p className="contact-description">
          Welcome to Food App! Discover a wide variety of delicious dishes from
          your favorite restaurants, all in one place. Our mission is to make
          food ordering easy, fast, and enjoyable. Browse menus, view
          mouth-watering images, and order your next meal with just a few
          clicks!
          😋
        </p>

      </div>
      <div className="contact-image-container">
        <img
          alt="foodimage"
          src="https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_1280.jpg"
        className="contact-image"
        />
      </div>
    </div>
  );
};


export default About;
