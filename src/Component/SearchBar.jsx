import React, { useState } from 'react';
import { FaCar, FaSearch } from 'react-icons/fa';
import '../Style/SearchBar.css';

const SearchBar = () => {
  const [brandSelected, setBrandSelected] = useState(false);
  const [modelSelected, setModelSelected] = useState(false);

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <div className="search-option" onClick={() => setBrandSelected(true)}>
          <FaCar className="icon" />
          <span>브랜드 선택</span>
        </div>
        <div className="divider" />
        <div
          className={`search-option ${!brandSelected ? 'disabled' : ''}`}
          onClick={() => brandSelected && setModelSelected(true)}
        >
          모델 선택
        </div>
        <div className="divider" />
        <div className={`search-option ${!modelSelected ? 'disabled' : ''}`}>
          세부모델 선택
        </div>
      </div>
      <button className="search-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;