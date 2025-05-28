import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import "../Style/MainPage.css";
import Banner from "../Component/Banner";
import SearchBar from '../Component/SearchBar';
import carLoanImg from "../Image/car-loan.png";
import sellerImg from "../Image/seller.png";
import dealImg from "../Image/deal.png";
import bitcoinImg from "../Image/bitcoin.png";
import mohave from "../Image/hyundai_grandeur_white_2022.png";
import grandeur from "../Image/hyundai_sonata_gray_2021.png";
import sonata from "../Image/kia_mohave_black_2023.png";
import partner1 from "../Image/partner1.png"
import partner2 from "../Image/partner2.png"
import partner3 from "../Image/partner3.png"
import partner4 from "../Image/partner4.png"

const MainPage = () => {
    const navigate = useNavigate();

    const cars = [
        {
            name: "기아 모하비 더 마스터 디젤 3.0 4WD 7인승 마스터즈",
            image: mohave,
            price: "6,974 만원"
        },
        {
            name: "현대 더 뉴 그랜저 IG 2.5 프리미엄",
            image: grandeur,
            price: "1,960 만원",
        },
        {
            name: "현대 쏘나타 하이브리드 (DN8) 인스퍼레이션",
            image: sonata,
            price: "2,230 만원",
        },
    ]
    return (
        <div className="main-page">
            <div className="ad-banner">
                <Banner />
            </div>
            <div className="triangle-section">
                <div className="search-box">
                    <SearchBar />
                </div>

                <div
                    className="car-list-header"
                    onClick={() => navigate('/list')}
                >
                    <h2>차량리스트 더보기 <FaChevronRight className="arrow-icon" /></h2>
                </div>
                <div className="car-list">
                    {cars.map((car, index) => (
                        <div className="car-card" key={index}>
                            <div className="badges">
                                <span className="badge diagnose">진단 +</span>
                                <span className="badge trust">믿고</span>
                            </div>
                            <img src={car.image} alt={car.name} className="car-image" />
                            <div className="car-name">{car.name}</div>
                            <div className="car-price">{car.price}</div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="features">
                <div className="feature-item">
                    <img src={carLoanImg} alt="중고차 견적대기" />
                    <div className="feature-label">중고차 견적대기</div>
                </div>
                <div className="feature-item">
                    <img src={sellerImg} alt="안전한 구매" />
                    <div className="feature-label">안전한 구매</div>
                </div>
                <div className="feature-item">
                    <img src={dealImg} alt="안전한 판매" />
                    <div className="feature-label">안전한 판매</div>
                </div>
                <div className="feature-item">
                    <img src={bitcoinImg} alt="NFT 거래" />
                    <div className="feature-label">NFT 거래</div>
                </div>
            </section>

            <section className="partner-section">
                <div className="partners">
                    <img src={partner1} alt="삼성화재" />
                    <img src={partner2} alt="KB손해보험" />
                    <img src={partner3} alt="DB손해보험" />
                    <img src={partner4} alt="현대해상" />
                </div>
            </section>
        </div>
    );

};

export default MainPage;