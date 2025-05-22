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

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? carList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === carList.length - 1 ? 0 : prev + 1));
  };

  const { model, price, image } = carList[current];

  return (
    <div className="banner-wrapper">
      <button onClick={handlePrev} className="banner-nav-btn">
        &#8249;
      </button>

      <div className="banner-container">
        <img src={image} alt={model} className="banner-img" />
        <div className="banner-info">
          <h2>{model}</h2>
          <p>{price}</p>
        </div>
      </div>

      <button onClick={handleNext} className="banner-nav-btn">
        &#8250;
      </button>
    </div>
  );
}

export default Banner;