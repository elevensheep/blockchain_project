import React from "react";
import "../Style/MainPage.css";
import Banner from "../Component/Banner";
import SearchBar from '../Component/SearchBar';
import carLoanImg from "../Image/car-loan.png";
import sellerImg from "../Image/seller.png";
import dealImg from "../Image/deal.png";
import bitcoinImg from "../Image/bitcoin.png";
import partner1 from "../Image/partner1.png";
import partner2 from "../Image/partner2.png";
import partner3 from "../Image/partner3.png";
import partner4 from "../Image/partner4.png";

const MainPage = () => {
    return (
        <div className="main-page">
            <section className="hero">
                <div className="ad-banner">
                    <Banner />
                </div>

                <div className="search-box">
                    <SearchBar />
                </div>
            </section>

            <section className="car-section">
                <h2>국내산 차량</h2>
                <div className="car-list">
                    <img src="https://source.unsplash.com/featured/?car" alt="더 뉴 카니발" />
                    <img src="https://source.unsplash.com/featured/?mercedes" alt="EQ900" />
                    <img src="https://source.unsplash.com/featured/?hyundai" alt="더 뉴 그랜저 IG" />
                    <img src="https://source.unsplash.com/featured/?kia" alt="K7 프리미어" />
                </div>
            </section>

            <section className="car-section">
                <h2>수입차 리스트</h2>
                <div className="car-list">
                    <img src="https://source.unsplash.com/featured/?landrover" alt="디스커버리 4" />
                    <img src="https://source.unsplash.com/featured/?volkswagen" alt="뉴 CC" />
                    <img src="https://source.unsplash.com/featured/?bmw" alt="5시리즈 (G30)" />
                    <img src="https://source.unsplash.com/featured/?jeep" alt="지프체로키" />
                </div>
            </section>

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

                <footer className="footer">
                    <div className="footer-info">
                        <p>제작자 | SANGCHAI</p>
                        <p>고객센터 1544-6612 | help@sansaride.kr</p>
                        <p>© 2024 sansaride. All rights reserved.</p>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default MainPage;