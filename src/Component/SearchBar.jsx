import { useState } from 'react';
import { FaCar, FaSearch } from 'react-icons/fa';
import '../Style/SearchBar.css';

// 확장 가능한 브랜드 목록
const brands = ['기아', '제네시스', '현대'];

const SearchBar = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSubModel, setSelectedSubModel] = useState('');

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setSelectedSubModel('');
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSelectedSubModel('');
  };

  const handleSubModelChange = (e) => {
    setSelectedSubModel(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        {/* 브랜드 선택 */}
        <div className="search-option">
          <FaCar className="icon" />
          <select
            className="brand-select"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">브랜드 선택</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="divider" />

        {/* 모델 선택 */}
        <div className={`search-option ${!selectedBrand ? 'disabled' : ''}`}>
          <select
            className="brand-select"
            value={selectedModel}
            onChange={handleModelChange}
            disabled={!selectedBrand}
          >
            <option value="">모델 선택</option>
            {/* 예시 데이터를 넣고 싶다면 여기에 option을 추가 */}
          </select>
        </div>

        <div className="divider" />

        {/* 세부모델 선택 */}
        <div className={`search-option ${!selectedModel ? 'disabled' : ''}`}>
          <select
            className="brand-select"
            value={selectedSubModel}
            onChange={handleSubModelChange}
            disabled={!selectedModel}
          >
            <option value="">세부모델 선택</option>
            {/* 예시 데이터를 넣고 싶다면 여기에 option을 추가 */}
          </select>
        </div>
      </div>

      <button className="search-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;