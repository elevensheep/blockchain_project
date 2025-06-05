import "../Style/TransactionPage.css";
import { useState } from "react";

const TransactionPage = () => {
    const [transactionStatus, setTransactionStatus] = useState("거래 진행 중");

    const seller = {
        name: "홍길동",
        phone: "010-1234-5678",
        location: "서울 강남구",
    };

    const buyer = {
        name: "김철수",
        phone: "010-9876-5432",
        location: "부산 해운대구",
    };

    const vehicle = {
        brand: "현대",
        model: "아반떼",
        subModel: "1.6 가솔린",
        year: "2020",
        price: "1,200만원",
        carNumber: "12가 3456",
    };

    const handleComplete = () => {
        setTransactionStatus("거래 완료");
    };

    return (
        <div className="transaction-page">
            <div className="transaction-container">
                <h1 className="transaction-title">차량 거래 정보</h1>

                <div className="transaction-status">
                    <span className="status-label">거래 상태:</span>
                    <span className={`status-value ${transactionStatus === "거래 완료" ? "completed" : ""}`}>
                        {transactionStatus}
                    </span>
                </div>

                <div className="summary-box">
                    <p><strong>{vehicle.year} {vehicle.brand} {vehicle.model} ({vehicle.subModel})</strong></p>
                    <p>차량번호: {vehicle.carNumber} | 거래금액: {vehicle.price}</p>
                </div>

                <div className="transaction-section">
                    <h2 className="section-title">판매자 정보</h2>
                    <div className="info-grid">
                        <div><strong>이름:</strong> {seller.name}</div>
                        <div><strong>전화번호:</strong> {seller.phone}</div>
                        <div><strong>지역:</strong> {seller.location}</div>
                    </div>
                </div>

                <div className="transaction-section">
                    <h2 className="section-title">구매자 정보</h2>
                    <div className="info-grid">
                        <div><strong>이름:</strong> {buyer.name}</div>
                        <div><strong>전화번호:</strong> {buyer.phone}</div>
                        <div><strong>지역:</strong> {buyer.location}</div>
                    </div>
                </div>

                <div className="transaction-section">
                    <h2 className="section-title">차량 정보</h2>
                    <div className="info-grid">
                        <div><strong>제조사:</strong> {vehicle.brand}</div>
                        <div><strong>모델:</strong> {vehicle.model}</div>
                        <div><strong>세부모델:</strong> {vehicle.subModel}</div>
                        <div><strong>연식:</strong> {vehicle.year}</div>
                        <div><strong>차대번호:</strong> {vehicle.carNumber}</div>
                        <div><strong>가격:</strong> {vehicle.price}</div>
                    </div>
                </div>

                <div className="transaction-actions">
                    <button className="action-button">전자 계약서 보기</button>
                    <button className="action-button complete" onClick={handleComplete}>
                        거래 완료 처리
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;