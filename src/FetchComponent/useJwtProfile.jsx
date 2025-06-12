import React, { useState } from 'react';

const useJwtProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const JwtProfile = async (token) => {
        setLoading(true);
        setError(null);
        
        try {
            const res = await fetch("http://localhost:8001/api/users/profile", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error(`프로필 조회 실패: ${res.status}`);
            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError(err.message || "알 수 없는 오류");
        } finally {
            setLoading(false);
        }
    }
    return ({ JwtProfile, loading, error, result });
};

export default useJwtProfile;