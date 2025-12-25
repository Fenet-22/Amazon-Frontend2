import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "./img/data";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div className={classes.hero}>
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={4000}
        stopOnHover={false}
        swipeable
        emulateTouch
      >
        {img.map((imageLink, index) => (
          <div key={index} className={classes.slide}>
            <img src={imageLink} alt={`slide-${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
