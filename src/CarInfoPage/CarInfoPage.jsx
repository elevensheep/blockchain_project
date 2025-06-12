import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../Style/CarInfoPage.css";
import CarRepairModal from "../CarRepairModal/CarRepairModal";
import useJwtProfile from "../FetchComponent/useJwtProfile"; // 사용자 프로필 훅

const CarInfoPage = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [carData, setCarData] = useState(null);
    const [current, setCurrent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const startX = useRef(0);
    const endX = useRef(0);

    const { JwtProfile, result: profile, loading: profileLoading } = useJwtProfile();

    // 차량 데이터 요청
    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/api/car/details/${carId}`);
                setCarData(res.data);
            } catch (err) {
                console.error("🚨 차량 상세 정보 요청 실패:", err);
            }
        };

        if (carId) fetchCarData();
    }, [carId]);

    // 로그인한 사용자 프로필 요청
    useEffect(() => {
        const token = sessionStorage.getItem("login_token");
        if (token) JwtProfile(token);
    }, []);

    const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
    const handleTouchMove = (e) => (endX.current = e.touches[0].clientX);
    const handleTouchEnd = () => {
        const diff = startX.current - endX.current;
        if (diff > 50) handleNext();
        if (diff < -50) handlePrev();
    };

    const handlePrev = () => setCurrent((p) => (p === 0 ? carData.images.length - 1 : p - 1));
    const handleNext = () => setCurrent((p) => (p === carData.images.length - 1 ? 0 : p + 1));

    const handleTransaction = async () => {
        try {
            const buyerId = profile?._id;
            const buyerPhone = profile?.phone_number;
            const sellerId = carData?.seller_id;
            const price = carData?.price;
            const sellerPhone = carData?.seller_phone
            const carNumber = carData?.car_number;
            console.log("🔍 profile._id:", profile?._id);

            console.log("🔍 carData.seller_id:", carData?.seller_id);
            console.log("🔍 carData.price:", carData?.price);
            console.log("🔍 carId:", carId);
            console.log("🔍 sellerPhone:", sellerPhone);
            console.log("🔍 buyerPhone:", buyerPhone);

            if (!buyerId || !sellerId || !price || !carId) {
                alert("❌ 필수 정보가 누락되었습니다.");
                return;
            }



            const res = await axios.post("http://localhost:8001/api/transaction/create", {
                car_id: carNumber,
                buyer_id: buyerId,
                buyer_phone: buyerPhone,
                seller_id: sellerId,
                seller_phone: sellerPhone,
                price,
            });

            const transactionId = res.data.transaction._id;
            navigate(`/transaction/${transactionId}`);
        } catch (err) {
            console.error("🚨 거래 생성 실패:", err);
            alert("거래 생성에 실패했습니다.");
        }
    };

    if (!carData || profileLoading) return <div>로딩 중...</div>;

    const { car_model, price, location, is_NFT, description, images = [] } = carData;

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
                    {images.map((imgUrl, index) => (
                        <div
                            key={index}
                            className={`car-slide ${current === index ? 'active' : ''}`}
                            style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                            <img src={`http://localhost:8001/uploads/${imgUrl}`} alt={`car-${index}`} className="car-img" />
                        </div>
                    ))}
                </div>

                <button className="car-slider-arrow right" onClick={handleNext}>
                    <FiChevronRight />
                </button>
            </div>

            <div className="car-info-section">
                <h2 className="car-section-title">🚗 차량 기본 정보</h2>
                <div className="car-info-grid">
                    <div>차명 / 모델명: {car_model}</div>
                    <div>가격: {price} 원</div>
                    <div>판매장소: {location}</div>
                    <div>NFT 여부: {is_NFT ? '✅' : '❌'}</div>
                    <div>설명: {description}</div>
                </div>
            </div>

            <div className="car-info">
                <button className="transaction-button" onClick={handleTransaction}>
                    차량 거래하기
                </button>
            </div>

            <CarRepairModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CarInfoPage;
