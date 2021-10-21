import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const items = [
  {
    view: [
      { foto: "capadoccia.png", nombre: "CAPADOCCIA" },
      { foto: "doha.png", nombre: "DOHA" },
      { foto: "baku.png", nombre: "BAKÚ" },
      { foto: "giza.png", nombre: "GIZA" },
    ],
  },
  {
    view: [
      { foto: "dubai2.png", nombre: "DUBAI" },
      { foto: "jerusalen.png", nombre: "JERUSALEN" },
      { foto: "manama.png", nombre: "MANAMA" },
      { foto: "riyad.png", nombre: "RIYAD" },
    ],
  },
  {
    view: [
      { foto: "mascate.png", nombre: "MASCATE" },
      { foto: "saana.png", nombre: "SAANA" },
      { foto: "tbilisi.png", nombre: "TBILISI" },
      { foto: "erevan.png", nombre: "EREVAN" },
    ],
  },
];

const CarouselSection = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}>
        <h2 className='carousel2 fw-bold'>POPULAR MYTINERARIES</h2>
        <div className='carousel container-fluid'>
          {item.view.map((img) => (
            <div
              className='div-foto'
              key={img.foto}
              style={{ backgroundImage: `url("/assets/${img.foto}")` }}>
              <h3>{img.nombre}</h3>
            </div>
          ))}
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

export default CarouselSection;
