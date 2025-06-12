import { useState } from "react";

/**
 * useNFTStatus 훅
 * - tokenId(carId) 배열을 받아 각 차량에 대한 NFT 존재 여부를 조회
 * - 상태맵(nftStatusMap)을 반환
 */
const useNFTStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nftStatusMap, setNftStatusMap] = useState({});

    const fetchNFTStatuses = async (tokenIds = []) => {
        setLoading(true);
        setError(null);
        const map = {};

        try {
            for (const tokenId of tokenIds) {
                const res = await fetch(`http://localhost:8001/api/nft/status/${tokenId}`);

                const json = await res.json();

                if (res.ok && json.success && json.data) {
                    map[tokenId] = json.data;
                } else {
                    map[tokenId] = null;
                }
            }

            setNftStatusMap(map);
        } catch (err) {
            console.error("❌ NFT 상태 조회 오류:", err);
            setError(err.message || "NFT 상태 조회 실패");
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchNFTStatuses,
        nftStatusMap,
        loading,
        error,
    };
};

export default useNFTStatus;
