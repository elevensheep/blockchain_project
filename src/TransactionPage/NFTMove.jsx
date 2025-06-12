import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NFTMove = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { carId, buyerId } = location.state || {};

    useEffect(() => {
        const transferNFT = async () => {
            try {
                const res = await axios.post('http://localhost:8001/api/nft/transfer', {
                    tokenId: carId,
                    buyerId: buyerId,
                });
                console.log("✅ 전송 결과:", res.data.message);
                navigate('/mypage');
            } catch (err) {
                console.error("❌ 체인코드 호출 실패:", err);
            }
        };

        if (carId && buyerId) {
            transferNFT();
        }
    }, [carId, buyerId, navigate]);

    return <div>🚚 NFT 소유자 변경 처리 중...</div>;
};

export default NFTMove;
