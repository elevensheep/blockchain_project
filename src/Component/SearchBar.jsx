import { useState } from 'react';
import { FaCar, FaSearch } from 'react-icons/fa';
import VEHICLE_DATA from '../Data/VehicleData';
import '../Style/SearchBar.css';

const SearchBar = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedSubModel, setSelectedSubModel] = useState('');

  const brands = [...new Set(VEHICLE_DATA.map((item) => item.brand))];
  const models = VEHICLE_DATA
    .filter((item) => item.brand === selectedBrand)
    .map((item) => item.model);
  const uniqueModels = [...new Set(models)];

  const subModels = VEHICLE_DATA.filter(
    (item) => item.brand === selectedBrand && item.model === selectedModel
  );

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div className="search-option">
          <FaCar className="icon" />
          <select
            className="brand-select"
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedModel('');
              setSelectedSubModel('');
            }}
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

        <div className={`search-option ${!selectedBrand ? 'disabled' : ''}`}>
          <select
            className="brand-select"
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setSelectedSubModel('');
            }}
            disabled={!selectedBrand}
          >
            <option value="">모델 선택</option>
            {uniqueModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="divider" />

        <div className={`search-option ${!selectedModel ? 'disabled' : ''}`}>
          <select
            className="brand-select"
            value={selectedSubModel}
            onChange={(e) => setSelectedSubModel(e.target.value)}
            disabled={!selectedModel}
          >
            <option value="">세부모델 선택</option>
            {subModels.map((item, index) => (
              <option
                key={`${item.subModel}-${index}`}
                value={`${item.subModel} (${item.year})`}
              >
                {`${item.subModel} (${item.year})`}
              </option>
            ))}
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