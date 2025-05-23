import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../Style/Banner.css";

const images = [
  require("../Image/KakaoTalk_20250523_170150241.png"),
  require("../Image/KakaoTalk_20250523_170150241_01.png"),
  require("../Image/KakaoTalk_20250523_170150241_02.png"),
  require("../Image/KakaoTalk_20250523_170150241_03.png"),
  require("../Image/KakaoTalk_20250523_170150241_04.png"),
];

function Banner() {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const endX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - endX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-outer-wrapper">
      <button className="nav-arrow left" onClick={handlePrev}>
        <FiChevronLeft />
      </button>

      <div
        className="banner-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[current]}
          alt={`slide-${current}`}
          className="banner-img"
        />
      </div>

      <button className="nav-arrow right" onClick={handleNext}>
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Banner;