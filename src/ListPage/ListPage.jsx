import { useState } from 'react';
import { FiRotateCcw } from "react-icons/fi"; // 초기화 아이콘
import SearchBar from '../Component/SearchBar';
import car from "../Image/exterior1.png";
import "../Style/ListPage.css";

const carData = new Array(12).fill({
  name: "현대 i30 가솔린 1.6 터보 2WD 5인승 인스퍼레이션",
  image: car,
});

const handleReset = () => {
  window.location.reload(); // 또는 state 초기화 구현
};

const ListPage = () => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [maxMileage, setMaxMileage] = useState(200000);

  return (
    <div className="list-page">
      <div className="search-container">
        <SearchBar />
      </div>

      <div className="content-section">
        <div className="filter-wrapper">
          <div className="filter-header">
            <div className="reset-wrapper" onClick={handleReset}>
              <span className="reset-label">초기화</span>
              <button className="reset-button" title="초기화">
                <FiRotateCcw size={18} />
              </button>
            </div>
          </div>

          <aside className="filter-panel">
            <div className="filter-group">
              <h4>차종</h4>
              <div className="checkbox-grid">
                <label><input type="checkbox" /> 승용</label>
                <label><input type="checkbox" /> SUV</label>
                <label><input type="checkbox" /> 승합</label>
                <label><input type="checkbox" /> EV</label>
              </div>
            </div>

            <div className="filter-group">
              <h4>브랜드 / 모델</h4>
              <label><input type="radio" name="brand" /> 전체</label>
              <label><input type="radio" name="brand" /> 기아</label>
              <label><input type="radio" name="brand" /> 제네시스</label>
              <label><input type="radio" name="brand" /> 현대</label>
            </div>

            <div className="filter-group">
              <h4>가격</h4>
              <div className="price-button-grid">
                {[1000, 2000, 3000, 4000, 5000, 6000, 7000, '8000 이상'].map((v, i) => {
                  const value = typeof v === 'number' ? v : 8000;
                  const label = typeof v === 'number' ? `${v}만원` : `${value}만원 이상`;
                  const isSelected = selectedPrice === value;

                  return (
                    <button
                      key={i}
                      className={`price-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedPrice(value)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="price-inputs">
                <div className="price-input-row">
                  <input
                    type="number"
                    className="price-input"
                    placeholder="최소"
                  />
                  <span className="price-hint">만원부터</span>
                </div>
                <div className="price-input-row">
                  <input
                    type="number"
                    className="price-input"
                    placeholder="최대"
                  />
                  <span className="price-hint">만원까지</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>주행거리</h4>

              <div className="mileage-labels">
                <span>0km</span>
                <span>{maxMileage.toLocaleString()}km</span>
              </div>

              <input
                type="range"
                min="0"
                max="200000"
                value={maxMileage}
                onChange={(e) => setMaxMileage(Number(e.target.value))}
              />
            </div>

            <div className="filter-group">
              <h4>연식</h4>
              <select>
                {Array.from({ length: new Date().getFullYear() + 1 - 1985 + 1 }, (_, i) => {
                  const year = 1985 + i;
                  return <option key={year}>{year}</option>;
                })}
              </select>
            </div>

            <div className="filter-group">
              <h4>연료</h4>
              <label><input type="checkbox" /> 가솔린</label>
              <label><input type="checkbox" /> 디젤</label>
              <label><input type="checkbox" /> 하이브리드</label>
              <label><input type="checkbox" /> 전기</label>
            </div>

            <div className="button-container">
              <button className="submit-button" onClick={() => console.log("검색 버튼 클릭됨")}>
                검색
              </button>
            </div>
          </aside>
        </div>

        <main className="car-listing">
          {carData.map((car, idx) => (
            <div className="car-card" key={idx}>
              <img src={car.image} alt={car.name} />
              <p>{car.name}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ListPage;