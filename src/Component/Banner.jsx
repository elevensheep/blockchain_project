
import React, { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../Style/Banner.css";

const images = [
  require("../Image/KakaoTalk_20250523_170150241.png"),
  require("../Image/KakaoTalk_20250523_170150241_01.png"),
  require("../Image/KakaoTalk_20250523_170150241_02.png"),
  require("../Image/KakaoTalk_20250523_170150241_03.png"),
  require("../Image/KakaoTalk_20250523_170150241_04.png"),
=======
import React, { useState } from "react";
import Avante from "../Image/Avente.png";
import K5 from "../Image/K5.png";
import Spa from "../Image/Spark.jpg";
import Spo from "../Image/Spo.jpg";
import "../Style/Banner.css";

const carList = [
  {
    model: "김주은의 무보험 아반떼(CN7)",
    price: "1,200만원",
    image: Avante,
  },
  {
    model: "이희재씨가 타던 기아 더 뉴 K5 2세대",
    price: "1,500만원",
    image: K5,
  },
  {
    model: "김도현을 뒤에서 쳐버린 김성수의 더 뉴 스파크",
    price: "800만원",
    image: Spa,
  },
  {
    model: "김성수가 뒤에서 쳐버린 김도현의 스포티지",
    price: "1000만원",
    image: Spo,
  },
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
   </div>
)

export default Banner;
