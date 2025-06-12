import React, { useState } from 'react';

const useAddNFT = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const AddNFT = async ({ tokenId, owner, metadata, price }) => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                tokenId,
                owner,
                metadata,
                price: parseInt(price)
            };

            console.log("📦 NFT 등록 요청:", payload); // ✅ 로그 찍기

            const res = await fetch("http://localhost:8001/api/nft/mintNFT", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "NFT 발행 실패");
            setResult(data);
            return data;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { AddNFT, loading, error, result };
};

export default useAddNFT;
