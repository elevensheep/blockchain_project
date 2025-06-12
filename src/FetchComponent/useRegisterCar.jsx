// hooks/useRegisterCar.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useRegisterCar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const navigae = useNavigate();

    const registerCar = async (token, formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8001/api/car/register', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('차량 등록 실패');
            }

            const data = await response.json();

            setResult(data);
            navigae('/mypage');
            return data;
        } catch (err) {
            setError(err.message || '알 수 없는 오류');
        } finally {
            setLoading(false);
        }
    };

    return { registerCar, loading, error, result };
};

export default useRegisterCar;
