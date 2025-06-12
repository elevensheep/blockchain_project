import React, { useState } from 'react';

const useOAuthMyCar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const OAuthMyCar = async (token) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:8001/oauth/mycarlist", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(`차량 목록 오류 응답: ${res.status}`);
        
        setResult(data);
    } catch (err) {
        setError(err.message);
        return null;
    } finally {
        setLoading(false);
    }
}


return ({ OAuthMyCar, loading, error, result });
};

export default useOAuthMyCar;