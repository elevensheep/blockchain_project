import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../Style/Banner.css";

const images = [
  require("../Image/Bannerimage.png"),
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

      <div className="banner-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images[current] && (
          <>
            <img
              src={images[current]}
              alt={`slide-${current}`}
              className="banner-img"
            />
            <div className="banner-text">
              <p>당신의 다음 이야기<br />새로운 차와 함께 시작됩니다</p>
            </div>
          </>
        )}
      </div>

      <button className="nav-arrow right" onClick={handleNext}>
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Banner;