// hooks/useDeleteCar.js
import { useState } from "react";

const useDeleteCar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteCar = async (carId, token) => {
        if (!token) return false;

        const confirmDelete = window.confirm("정말로 이 차량을 삭제하시겠습니까?");
        if (!confirmDelete) return false;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:8001/api/car/delete/${carId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("차량 삭제 실패");

            return true; // ✅ 성공 여부 반환
        } catch (err) {
            console.error("차량 삭제 오류:", err);
            setError(err.message || "알 수 없는 오류");
            alert("차량 삭제 실패");
            return false; // ❌ 실패도 명확히 반환
        } finally {
            setLoading(false);
        }
    };

    return { deleteCar, loading, error };
};

export default useDeleteCar;
