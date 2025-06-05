import { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../Style/CarInfoPage.css";
import CarRepairModal from "../CarRepairModal/CarRepairModal";

const exteriorImages = [
    require("../Image/exterior1.png"),
    require("../Image/exterior2.png"),
];
const interiorImages = [
    require("../Image/interior1.png"),
    require("../Image/interior2.png"),
];

const CarInfoPage = () => {
    const [current, setCurrent] = useState(0);
    const startX = useRef(0);
    const endX = useRef(0);

    const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
    const handleTouchMove = (e) => (endX.current = e.touches[0].clientX);
    const handleTouchEnd = () => {
        const diff = startX.current - endX.current;
        if (diff > 50) handleNext();
        if (diff < -50) handlePrev();
    };
    const handlePrev = () =>
        setCurrent((p) => (p === 0 ? exteriorImages.length - 1 : p - 1));
    const handleNext = () =>
        setCurrent((p) => (p === exteriorImages.length - 1 ? 0 : p + 1));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const carInfo = {
        carName: "현대 아반떼 CN7",
        manufacturer: "현대",
        manufactureYear: "2021년",
        firstRegistration: "2021-05-15",
        transmission: "자동",
        fuel: "가솔린",
        engineSize: "1,598cc",
        drivetrain: "2WD",
        color: "화이트",
        numberOfTransfers: 1,
        usageHistory: "렌트 이력 없음",
        accidentHistory: "전면부 판금 수리 이력 있음",
        insuranceHistory: "2022년 경미한 접촉 사고 보험 처리",
        mileage: "28,600km",
        regularInspection: "2023-04-12 완료 (유효 ~ 2025-04-11)",
    };

    return (
        <div className="car-detail-container">

            <div
                className="car-slider-outer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <button className="car-slider-arrow left" onClick={handlePrev}>
                    <FiChevronLeft />
                </button>

                <div className="car-slider-wrapper">
                    {exteriorImages.map((_, index) => (
                        <div
                            key={index}
                            className={`car-slide ${current === index ? 'active' : ''}`}
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            <img src={exteriorImages[index]} alt={`exterior-${index}`} className="car-img" />
                            <img src={interiorImages[index]} alt={`interior-${index}`} className="car-img" />
                        </div>
                    ))}
                </div>

                <button className="car-slider-arrow right" onClick={handleNext}>
                    <FiChevronRight />
                </button>
            </div>

            <div className="car-info-section">
                <div className="car-info-title-row-between">
                    <h2 className="car-section-title">🚗 차량 기본 정보</h2>
                    <button className="car-btn-small" onClick={() => setIsModalOpen(true)}>
                        수리 기록 조회
                    </button>
                </div>

                <div className="car-info-grid">
                    <div>차명 / 모델명: {carInfo.carName}</div>
                    <div>연식: {carInfo.manufactureYear}</div>
                    <div>변속기: {carInfo.transmission}</div>
                    <div>배기량: {carInfo.engineSize}</div>
                    <div>차량 색상: {carInfo.color}</div>
                    <div>제조사: {carInfo.manufacturer}</div>
                    <div>최초 등록일: {carInfo.firstRegistration}</div>
                    <div>연료 종류: {carInfo.fuel}</div>
                    <div>구동방식: {carInfo.drivetrain}</div>
                </div>
            </div>

            <div className="car-info">
                <Link to="/transaction" className="transaction-button">
                    차량 거래하기
                </Link>
            </div>

            <CarRepairModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CarInfoPage;