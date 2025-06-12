import "../Style/TransactionPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TransactionPage = () => {
    const { transactionId } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const jwtToken = sessionStorage.getItem("login_token");
    const oauthToken = sessionStorage.getItem("access_token");
    const token = jwtToken || oauthToken;
    const isOAuth = !!oauthToken;

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/api/transaction/${transactionId}`);
                setTransaction(res.data.transaction);
            } catch (err) {
                console.error("🚨 거래 정보 불러오기 실패:", err);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    isOAuth
                        ? "http://localhost:8001/oauth/profile"
                        : "http://localhost:8001/api/users/profile",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const id = isOAuth ? res.data.id : res.data._id;
                setUserId(id);
            } catch (err) {
                console.error("🚨 사용자 정보 불러오기 실패:", err);
            }
        };

        if (token) {
            fetchUser();
        }

        fetchTransaction();
    }, [transactionId, jwtToken, oauthToken]);

    const handleApprove = async () => {
        try {
            const res = await axios.post(`http://localhost:8001/api/transaction/approve`, {
                transactionId,
                userId,
            });

            setTransaction(res.data.transaction);
            alert("✅ 승인 완료");

            if (!oauthToken) {
                navigate('/nftmove', {
                    state: {
                        carId: car_id,
                        buyerId: buyer_id,
                    },
                });
            } else {
                navigate('/mypage');
            }

        } catch (err) {
            console.error("🚨 승인 실패:", err);
            alert("❌ 승인에 실패했습니다.");
        }
    };

    if (!transaction || !userId) return <div>로딩 중...</div>;

    if (userId !== transaction.seller_id && userId !== transaction.buyer_id) {
        return <div>⛔ 거래 당사자만 접근할 수 있습니다.</div>;
    }

    const {
        buyer_id,
        buyer_phone,
        seller_id,
        seller_phone,
        price,
        car_id,
        buyer_approved,
        seller_approved,
        status,
    } = transaction;

    const isBuyer = userId === buyer_id;
    const isSeller = userId === seller_id;
    const hasApproved = (isBuyer && buyer_approved) || (isSeller && seller_approved);

    return (
        <div className="transaction-page">
            <div className="transaction-container">
                <h1 className="transaction-title">차량 거래 정보</h1>

                <div className="transaction-status">
                    <span className="status-label">거래 상태:</span>
                    <span className={`status-value ${status === "completed" ? "completed" : ""}`}>
                        {status === "completed" ? "거래 완료" : "대기 중"}
                    </span>
                </div>

                <div className="summary-box">
                    <p><strong>차량 ID:</strong> {car_id}</p>
                    <p>거래금액: {price}원</p>
                </div>

                <div className="transaction-section">
                    <h2 className="section-title">판매자</h2>
                    <div className="info-grid">
                        <div><strong>ID:</strong> {seller_id}</div>
                        <div><strong>전화번호:</strong> {seller_phone}</div>
                    </div>
                </div>

                <div className="transaction-section">
                    <h2 className="section-title">구매자</h2>
                    <div className="info-grid">
                        <div><strong>ID:</strong> {buyer_id}</div>
                        <div><strong>전화번호:</strong> {buyer_phone}</div>
                    </div>
                </div>

                <div className="transaction-actions">
                    <button
                        className="action-button complete"
                        onClick={handleApprove}
                        disabled={hasApproved || status === "completed"}
                    >
                        {hasApproved ? "승인 완료됨" : "거래 승인하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;
