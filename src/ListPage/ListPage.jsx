import "../Style/ListPage.css";
import SearchBar from '../Component/SearchBar';
import { FiRotateCcw } from "react-icons/fi"; // 초기화 아이콘
import mohave from "../Image/kia_mohave_black_2023.png";

const carData = new Array(12).fill({
  name: "기아 모하비 더 마스터 디젤 3.0 4WD 7인승 마스터즈",
  image: mohave,
});

const handleReset = () => {
  window.location.reload(); // 또는 state 초기화 구현
};

const ListPage = () => {
  return (
    <div className="list-page">
      <div className="search-container">
        <SearchBar />
      </div>

      <div className="content-section">
        <div className="filter-wrapper">
          <div className="filter-header">
            <h3 className="filter-title">필터</h3>
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
            </div>

            <div className="filter-group">
              <h4>가격</h4>
              <div className="price-button-grid">
                {[1000, 2000, 3000, 4000, 5000, 6000, 7000, '8000 이상'].map((v, i) => {
                  const label = typeof v === 'number' ? `${v}만원` : v.replace(' 이상', '만원 이상');
                  return (
                    <button key={i} className="price-btn">{label}</button>
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
              <input type="range" min="0" max="200000" defaultValue="0" />
              <select>
                <option>km</option>
              </select>
              <select>
                <option>km</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>연식</h4>
              <select>
                <option>2018</option>
              </select>
              <select>
                <option>2019</option>
              </select>
            </div>

            <div className="filter-group">
              <h4>연료</h4>
              <label><input type="checkbox" /> 가솔린</label>
              <label><input type="checkbox" /> 디젤</label>
              <label><input type="checkbox" /> 하이브리드</label>
              <label><input type="checkbox" /> 전기</label>
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