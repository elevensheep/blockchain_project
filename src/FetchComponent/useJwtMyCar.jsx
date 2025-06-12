// FetchComponent/useJwtMyCar.js
import { useState } from "react";

const useJwtMyCar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const JwtMyCar = async (token) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:8001/api/car/mycars", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(`차량 목록 오류 응답: ${res.status}`);

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { JwtMyCar, result, loading, error };
};

export default useJwtMyCar;
