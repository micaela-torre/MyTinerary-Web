import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Activity = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === props.activities.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? props.activities.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = props.activities.map((activity, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}>
        <div className='carousel container-fluid'>
          <div
            className='activity'
            key={activity._id}
            style={{ backgroundImage: `url("${activity.pic}")` }}>
            <h3 className='activity3'>{activity.name}</h3>
          </div>
        </div>
      </CarouselItem>
    );
  });
  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={slides}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />

      {slides}
      <CarouselControl
        direction='prev'
        directionText='PREVIOUS'
        onClickHandler={previous}
      />
      <CarouselControl
        direction='next'
        directionText='NEXT'
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Activity;
