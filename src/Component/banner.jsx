import React, { useState } from "react";
import Avante from "../image/Avente.png"
import K5 from "../image/K5.png"
import Spa from "../image/Spark.jpg"
import Spo from "../image/Spo.jpg"

const styles = {
  wrapper: {
    background: "#F5F5F5",
    height: "350px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    overflow: "hidden",
    position: "relative",
  },

  container: {
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "120px",
    transition: "all 0.5s ease",
  },

  

  bannerInfo: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: "black",
  },

  img: {
    width: "500px",
    height: "auto",
    borderRadius: "8px",
    objectFit: "contain",
  },

  navBtn: {
    fontSize: "64px",
    backgroundColor: "transparent",
    color: "black",
    border: "none",
    cursor: "pointer",
    zIndex: 10,
  },
};

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
  }
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
    <div style={styles.wrapper}>
      <button onClick={handlePrev} style={styles.navBtn}>
        &#8249;
      </button>

      <div style={styles.container}>
        <img src={image} alt={model} style={styles.img} />
        <div style={styles.bannerInfo}>
          <h2>{model}</h2>
          <p>{price}</p>
        </div>
      </div>

      <button onClick={handleNext} style={styles.navBtn}>
        &#8250;
      </button>
    </div>
  );
}

export default Banner;
