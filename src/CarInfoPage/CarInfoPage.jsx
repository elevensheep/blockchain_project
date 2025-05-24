import { useState } from 'react';
import "../Style/CarInfoPage.css";
import carImage from "../Image/test-car.png";
import CarRepairModal from '../CarRepairModal/CarRepairModal';

const CarInfoPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const carInfo = {
        carName: "현대 아반떼 CN7",
        manufactureYear: "2021년",
        firstRegistration: "2022-05-15",
        carNumber: "KMHLN81BMPU123456",
        type: "자동차",
        fuel: "가솔린",
        engineSize: "1,598cc",
        drivetrain: "2WD",
        color: "화이트",
        carMileage: "77,673km",
        productionDate: "22/03 (March 2022)",
        userName: "홍길동",
        registrationNumber: "12가3456",
        usageHistory: "렌트 이력 없음",
        insuranceHistory: "2022년 후미단 접촉 사고 보험 처리",
        numberOfTransfers: 1,
        regularInspection: "2023-04-02 완료 (유효기간: 2025-04-11)"
    };

    return (
        <div className="car-info-container">
            <div className="left-info">
                <h2 className="section-title">본인의 차량 정보조회</h2>
                <img src={carImage} alt="차량 이미지" className="car-main-image" />
                <div className="car-summary">
                    <h3 className="car-name">차명 / 모델명: {carInfo.carName}</h3>
                    <p className="car-details">{carInfo.productionDate} | {carInfo.carMileage}</p>
                </div>
            </div>

            <div className="right-info">
                <div className="info-section">
                    <h4>🚗 차량 기본 정보</h4>
                    <ul>
                        <li>차명 / 모델명: {carInfo.carName}</li>
                        <li>제조사: 현대</li>
                        <li>연식: {carInfo.manufactureYear}</li>
                        <li>최초 등록일: {carInfo.firstRegistration}</li>
                        <li>차대번호(VIN): {carInfo.carNumber}</li>
                        <li>차종 / 연료: {carInfo.type} / {carInfo.fuel}</li>
                        <li>배기량: {carInfo.engineSize}</li>
                        <li>구동방식: {carInfo.drivetrain}</li>
                        <li>차량 색상: {carInfo.color}</li>
                    </ul>
                </div>

                <div className="info-section">
                    <h4>🛠 차량 이력 정보</h4>
                    <ul>
                        <li>소유자 변경 횟수: {carInfo.numberOfTransfers}회</li>
                        <li>용도 이력: {carInfo.usageHistory}</li>
                        <li>보험 이력: {carInfo.insuranceHistory}</li>
                        <li>정기검사 이력: {carInfo.regularInspection}</li>
                    </ul>
                </div>

                <div className="button-group">
                    <button className="certify-button">차량 인증 신청하기</button>
                    <button className="repair-button" onClick={() => setIsModalOpen(true)}>
                        수리 기록 확인하기
                    </button>
                    <CarRepairModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
            </div>
        </div>
    );
};

export default CarInfoPage;